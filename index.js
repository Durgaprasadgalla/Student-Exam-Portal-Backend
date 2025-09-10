// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";  // ✅ Import cors
// import authRoutes from "./routes/auth.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // ✅ Allow frontend requests
// app.use(express.json());

// // Auth routes
// app.use("/api/auth", authRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // backend/index.js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";

// // Import routes
// import authRoutes from "./routes/auth.js";
// import examRoutes from "./routes/exam.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors()); // allow frontend requests
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/exam", examRoutes);

// // Test route
// app.get("/api", (req, res) => {
//   res.send("API is working");
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import examRoutes from "./routes/exam.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/exam", examRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
