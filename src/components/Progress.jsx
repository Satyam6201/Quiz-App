import React from "react";
import "../styles/Progress.css";

function Progress({ currentIndex, total }) {
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  return (
    <div className="progress-container">
      <p className="progress-text">Question {currentIndex + 1} of {total}</p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-percentage">{progressPercentage.toFixed(0)}%</p>
    </div>
  );
}

export default Progress;
