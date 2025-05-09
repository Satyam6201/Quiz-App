import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "../styles/Score.css";

function Score({ score, total, restartQuiz }) {
  const [message, setMessage] = useState("");
  const [quote, setQuote] = useState("");
  const [timer, setTimer] = useState(10); // Auto-restart timer in seconds
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    if (percentage >= 70) {
      setMessage("🎉 Great Job!");
      setQuote("Success is the sum of small efforts repeated day in and day out.");
    } else if (percentage >= 40) {
      setMessage("😊 Keep Practicing!");
      setQuote("Practice makes perfect. Keep trying!");
    } else {
      setMessage("😢 Better Luck Next Time!");
      setQuote("Don't give up. Every mistake is progress.");
    }
  }, [percentage]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      restartQuiz(); // Auto-restart the quiz after 5 seconds
    }
  }, [timer]);

  return (
    <div className="score-container">
      {percentage >= 70 && <Confetti />}
      <h2>🎯 Quiz Completed!</h2>
      <p className="score-text">
        Your Score: <span className="score-number">{score}</span> / {total}
      </p>
      <div className="progress-bar-wrapper">
        <div className="progress-bar-outer">
          <div className="progress-bar-inner" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="score-percentage">{percentage}%</p>
      </div>
      <p className="score-message">{message}</p>
      <p className="score-quote">“{quote}”</p>
      <button className="restart-btn" onClick={restartQuiz}>🔄 Restart Quiz</button>
      <p className="timer-text">{timer > 0 ? `Auto Restarting in ${timer}s` : "Restarting..."}</p>
    </div>
  );
}

export default Score;
