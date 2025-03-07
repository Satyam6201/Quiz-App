import React from "react";
import "../styles/Score.css";

function Score({ score, total, restartQuiz }) {
  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {total}</p>
      <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

export default Score;
