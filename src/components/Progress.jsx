import React from "react";
import "../styles/Progress.css";

function Progress({ currentIndex, total }) {
  return (
    <div className="progress-container">
      <p>Question {currentIndex + 1} of {total}</p>
      <progress value={currentIndex + 1} max={total}></progress>
    </div>
  );
}

export default Progress;
