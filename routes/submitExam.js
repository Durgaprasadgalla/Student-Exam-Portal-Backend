// routes/exam.js
import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/submit", auth, async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: selectedIndex }
    const questions = await Question.find();
    let score = 0;
    let review = [];

    questions.forEach(q => {
      const selected = answers[q._id] !== undefined ? q.options[answers[q._id]] : "Not answered";
      const correct = q.options[q.answer];
      if (selected === correct) score++;
      review.push({
        question: q.question,
        correct,
        selected
      });
    });

    // Optional: Save result in DB
    await Result.create({
      user: req.user.id,
      score,
      review
    });

    res.json({ score, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit exam" });
  }
});

export default router;
