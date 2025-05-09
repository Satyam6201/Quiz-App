import React from "react";
import "../styles/Progress.css";

function Progress({ currentIndex, total }) {
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  const getProgressMessage = () => {
    if (progressPercentage < 40) return "Keep going!";
    if (progressPercentage < 80) return "You're doing great!";
    return "Almost there!";
  };

  return (
    <div className="progress-container">
      <p className="progress-text">
        🚀 Question {currentIndex + 1} of {total}
      </p>
      <div className="progress-bar" title={getProgressMessage()}>
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="fill-glow"></span>
        </div>
      </div>
      <p className="progress-percentage">{progressPercentage.toFixed(0)}%</p>
    </div>
  );
}

export default Progress;
