import React from "react";
import "../styles/Progress.css";

function Progress({ currentIndex, total }) {
  const cycleSize = 10;
  const currentCycleIndex = currentIndex % cycleSize;
  const currentCycleTotal = Math.min(cycleSize, total - Math.floor(currentIndex / cycleSize) * cycleSize);
  const progressPercentage = ((currentCycleIndex + 1) / currentCycleTotal) * 100;

  const getProgressMessage = () => {
    if (progressPercentage < 40) return "Keep going!";
    if (progressPercentage < 80) return "You're doing great!";
    return "Almost there!";
  };

  return (
    <div className="progress-container">
      <p className="progress-text">
        🚀 Question {currentCycleIndex + 1} of {currentCycleTotal}
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
