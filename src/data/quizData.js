const quizData = [
  {
    id: 1,
    title: "Basic HTML Quiz",
    description: "Test your knowledge of HTML fundamentals",
    questions: [
      {
        id: 1,
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Machine Learning",
          "Hyperlink and Text Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        id: 2,
        text: "Which HTML element is used for creating a paragraph?",
        options: ["<p>", "<paragraph>", "<para>", "<text>"],
        correctAnswer: "<p>"
      },
      {
        id: 3,
        text: "Which HTML attribute is used to define inline styles?",
        options: ["class", "styles", "style", "font"],
        correctAnswer: "style"
      }
    ]
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    description: "Check your CSS knowledge",
    questions: [
      {
        id: 1,
        text: "What does CSS stand for?",
        options: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        id: 2,
        text: "Which property is used to change the background color?",
        options: ["bgcolor", "color", "background-color", "background"],
        correctAnswer: "background-color"
      },
      {
        id: 3,
        text: "How do you select an element with id 'demo'?",
        options: [".demo", "#demo", "*demo", "demo"],
        correctAnswer: "#demo"
      }
    ]
  }
];

export default quizData;