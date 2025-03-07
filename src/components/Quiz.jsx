import React, { useState } from "react";
import Question from "./Question";
import Score from "./Score";
import Progress from "./Progress";
import "../styles/Quiz.css";

function Quiz({ questions, restartQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prevScore) => prevScore + 1);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 500);
  };

  return (
    <div>
      <Progress currentIndex={currentIndex} total={questions.length} />
      {currentIndex < questions.length ? (
        <Question data={questions[currentIndex]} onAnswer={handleAnswer} />
      ) : (
        <Score score={score} total={questions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
}

export default Quiz;
