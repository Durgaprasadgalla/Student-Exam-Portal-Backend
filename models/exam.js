import express from "express";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET all questions (without answer key)
router.get("/questions", verifyToken, async (req, res) => {
  try {
    const questions = await Question.find({}, { question: 1, options: 1 });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// POST submit exam

router.post('/submit', verifyToken, async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    const userId = req.user.id;
    let score = 0;

    for (let ans of answers) {
      const q = await Question.findById(ans.questionId);
      if (q && q.answer === ans.selectedOption) score++;
    }

    const result = await Result.create({ user: userId, answers, score, taken: true });
    res.json({ message: 'Exam submitted successfully', result });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: 'Failed to submit exam' });
  }
});




// ✅ Get exam status
router.get("/status", auth, async (req, res) => {
  try {
    const existing = await Result.findOne({ user: req.user.id });
    res.json({ taken: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch status" });
  }
});

// ✅ Get exam result
router.get("/result", auth, async (req, res) => {
  try {
    const result = await Result.findOne({ user: req.user.id }).populate("user");
    if (!result) return res.status(404).json({ message: "No result found" });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch result" });
  }
});






// GET exam status
router.get("/status", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const existing = await Result.findOne({ user: userId });
    res.json({ taken: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch status" });
  }
});

// GET exam result with question details
// GET exam result with review data
router.get("/result", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Result.findOne({ user: userId });

    if (!result) {
      return res.status(404).json({ message: "No result found" });
    }

    // Build review array with full question details
    const review = await Promise.all(
      result.answers.map(async (ans) => {
        const q = await Question.findById(ans.questionId).lean();
        return {
          question: q?.question || "Question not found",
          correct: q?.options?.[q?.answer] || "N/A", // Get correct answer text
          selected:
            ans.selectedOption !== null
              ? q?.options?.[ans.selectedOption] || "N/A"
              : "Not answered",
        };
      })
    );

    res.json({
      score: result.score,
      totalQuestions: result.answers.length,
      review,
    });
  } catch (err) {
    console.error("Failed to fetch result:", err);
    res.status(500).json({ message: "Failed to fetch result" });
  }
});

export default router;
