import React, { useState } from "react";
import "../styles/Question.css";
import "../styles/Button.css";

function Question({ data, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const shuffledAnswers = [...data.incorrect_answers, data.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer === data.correct_answer);
  };

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
      <div className="answer-buttons">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === answer ? (answer === data.correct_answer ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Question;