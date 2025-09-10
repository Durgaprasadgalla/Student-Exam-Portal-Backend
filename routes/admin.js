// import express from "express";
// import User from "../models/User.js";
// import Result from "../models/Result.js";
// import Question from "../models/Question.js";

// const router = express.Router();

// const ADMIN_USERNAME = "admin@123";
// const ADMIN_PASSWORD = "Admin@123";

// // Admin login route (no JWT, just hardcoded check)
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
// // Get all questions
//   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//     return res.json({ success: true, message: "Admin login successful" });
//   } else {
//     return res.status(401).json({ success: false, message: "Invalid credentials" });
//   }
// });

// // DEMO: Allow any request with a token
// function adminCheck(req, res, next) {
// // Add a question
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "No token" });
//   return next();
// }

// // Get all users
// router.get("/users", adminCheck, async (req, res) => {
//   const users = await User.find({}, "username");
//   console.log("[ADMIN USERS]", users);
//   res.json(users);
// });

// // Get all results
// // Update a question
// router.get("/results", adminCheck, async (req, res) => {
//   const results = await Result.find().populate("user", "username");
//   console.log("[ADMIN RESULTS]", results);
//   res.json(results);
// });

// // Delete user and their results
// router.delete("/users/:id", adminCheck, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     await User.findByIdAndDelete(userId);
//     await Result.deleteMany({ user: userId });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to delete user." });
// // Delete a question
//   }
// });

// export default router;


import express from "express";
import User from "../models/User.js";
import Result from "../models/Result.js";
import Question from "../models/Question.js";

const router = express.Router();

const ADMIN_USERNAME = "admin@123";
const ADMIN_PASSWORD = "Admin@123";

// Admin login route (no JWT, just hardcoded check)
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Admin login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Middleware to check token (for demo, just checks presence)
function adminCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  return next();
}

//
// -------- USERS --------
//

// Get all users
router.get("/users", adminCheck, async (req, res) => {
  const users = await User.find({}, "username");
  res.json(users);
});

// Delete user and their results
router.delete("/users/:id", adminCheck, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    await Result.deleteMany({ user: userId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete user." });
  }
});

// API: Get user stats
router.get("/users-stats", async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    const total = users.length;

    // Assuming your user schema has a field `submitted` (true/false)
    const submitted = users.filter((u) => u.submitted === true).length;
    const notSubmitted = total - submitted;

    res.json({ total, submitted, notSubmitted });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//
// -------- RESULTS --------
//

// Get all results
router.get("/results", adminCheck, async (req, res) => {
  const results = await Result.find().populate("user", "username");
  res.json(results);
});

//
// -------- QUESTIONS --------
//

// Get all questions
router.get("/questions", adminCheck, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch questions" });
  }
});

// Add a question
router.post("/questions", adminCheck, async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const newQuestion = new Question({ question, options, answer });
    await newQuestion.save();
    res.json({ success: true, question: newQuestion });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add question" });
  }
});

// Update a question
router.put("/questions/:id", adminCheck, async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options, answer },
      { new: true }
    );
    res.json({ success: true, question: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update question" });
  }
});

// Delete a question
router.delete("/questions/:id", adminCheck, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete question" });
  }
});

export default router;
