import React from "react";
import "../styles/Question.css";
import "../styles/Button.css";

function Question({ data, onAnswer }) {
  const shuffledAnswers = [...data.incorrect_answers, data.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: data.question }}></h2>
      {shuffledAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswer(answer === data.correct_answer)}
          dangerouslySetInnerHTML={{ __html: answer }}
        ></button>
      ))}
    </div>
  );
}

export default Question;
