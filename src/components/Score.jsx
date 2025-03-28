import React, { useEffect, useState } from "react";
import "../styles/Score.css";

function Score({ score, total, restartQuiz }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (score / total >= 0.7) {
      setMessage("🎉 Great Job! 🎉");
    } else if (score / total >= 0.4) {
      setMessage("😊 Not Bad! Keep Practicing! 😊");
    } else {
      setMessage("😢 Better Luck Next Time! 😢");
    }
  }, [score, total]);

  return (
    <div className="score-container">
      <h2>Quiz Completed!</h2>
      <p className="score-text">
        Your Score: <span className="score-number">{score}</span> / {total}
      </p>
      <p className="score-message">{message}</p>
      <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

export default Score;
