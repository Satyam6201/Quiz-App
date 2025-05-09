import React, { useState } from "react";
import "../styles/Question.css";
import "../styles/Button.css";

function Question({ data, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const shuffledAnswers = [...data.incorrect_answers, data.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer === data.correct_answer);
  };

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
      <div className="answer-buttons">
        {shuffledAnswers.map((answer, index) => {
          const isCorrect = answer === data.correct_answer;
          const isSelected = selectedAnswer === answer;

          let buttonClass = "answer-button";
          if (isAnswered) {
            if (isSelected && isCorrect) buttonClass += " correct";
            else if (isSelected && !isCorrect) buttonClass += " incorrect";
            else if (!isSelected && isCorrect) buttonClass += " highlight-correct";
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerClick(answer)}
              disabled={isAnswered}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></button>
          );
        })}
      </div>
      {isAnswered && (
        <div className="answer-message">
          {selectedAnswer === data.correct_answer ? "✅ Correct!" : "❌ Incorrect!"}
        </div>
      )}
    </div>
  );
}

export default Question;
