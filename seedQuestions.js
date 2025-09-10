// seedQuestions.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const seedQuestions = async () => {
  await Question.insertMany([
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: 0
    },
    {
      question: "Which programming language runs in the browser?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: 1
    },
    {
      question: "HTML stands for?",
      options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Markdown Language", "Hyper Tool Multi Language"],
      answer: 1
    },
    {
      question: "CSS is used for?",
      options: ["Structure", "Styling", "Behavior", "Database"],
      answer: 1
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Facebook", "Microsoft", "Apple"],
      answer: 1
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "/* */", "#", "<!-- -->"],
      answer: 0
    },
    {
      question: "Which method is used to parse JSON in JavaScript?",
      options: ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"],
      answer: 1
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h1>", "<h6>", "<head>", "<heading>"],
      answer: 0
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "Flask", "Angular", "Laravel"],
      answer: 2
    },
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
      answer: 1
    },
    {
      question: "Which symbol is used for ID selector in CSS?",
      options: ["#", ".", "*", "$"],
      answer: 0
    },
    {
      question: "Which HTTP method is used to create a resource?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: 1
    },
    {
      question: "Which operator is used for strict equality in JavaScript?",
      options: ["==", "===", "=", "!="],
      answer: 1
    },
    {
      question: "Which command is used to initialize a git repository?",
      options: ["git init", "git start", "git create", "git new"],
      answer: 0
    },
    {
      question: "Which method adds an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0
    },
    {
      question: "Which symbol is used for class selector in CSS?",
      options: ["#", ".", "*", "$"],
      answer: 1
    },
    {
      question: "Which HTML attribute specifies an image's URL?",
      options: ["src", "href", "link", "url"],
      answer: 0
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      answer: 3
    },
    {
      question: "Which of these is used to make a website responsive?",
      options: ["Bootstrap", "Python", "Node.js", "MySQL"],
      answer: 0
    },
    {
      question: "Which property is used to change text color in CSS?",
      options: ["color", "text-color", "font-color", "background-color"],
      answer: 0
    },
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<hyperlink>"],
      answer: 1
    },
    {
      question: "Which method removes the last element from an array in JavaScript?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      answer: 0
    },
    {
      question: "Which backend framework uses Python?",
      options: ["Django", "React", "Angular", "Vue"],
      answer: 0
    },
    {
      question: "Which of the following is a frontend library?",
      options: ["React", "Django", "Flask", "Laravel"],
      answer: 0
    },
    {
      question: "Which HTML element is used for the largest section heading?",
      options: ["<h1>", "<h2>", "<h3>", "<h6>"],
      answer: 0
    },
    {
      question: "Which tag is used to display a paragraph in HTML?",
      options: ["<p>", "<para>", "<paragraph>", "<text>"],
      answer: 0
    },
    {
      question: "Which CSS property changes the background color?",
      options: ["color", "background", "background-color", "bgcolor"],
      answer: 2
    },
    {
      question: "Which JavaScript function is used to write to the console?",
      options: ["console.write()", "console.log()", "print()", "log()"],
      answer: 1
    },
    {
      question: "Which HTTP status code means OK?",
      options: ["200", "404", "500", "301"],
      answer: 0
    },
    {
      question: "Which JavaScript method converts a string to an integer?",
      options: ["parseInt()", "Number()", "toInteger()", "int()"],
      answer: 0
    },
    {
      question: "Which HTML element is used to define a table row?",
      options: ["<td>", "<tr>", "<table>", "<th>"],
      answer: 1
    }
  ]);

  console.log("30 Questions inserted!");
  mongoose.connection.close();
};

seedQuestions();
