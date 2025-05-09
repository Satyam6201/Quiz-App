import React, { useState, useEffect } from "react";
import "../styles/Question.css";
import "../styles/Button.css";

function Question({ data, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const shuffled = [...data.incorrect_answers, data.correct_answer].sort(
      () => Math.random() - 0.5
    );
    setShuffledAnswers(shuffled);
    setSelectedAnswer(null); 
  }, [data]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; 

    setSelectedAnswer(answer);
    onAnswer(answer === data.correct_answer);
  };

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: data.question }} />
      <div className="answer-buttons">
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === data.correct_answer;
          const answerClass =
            selectedAnswer && isSelected
              ? isCorrect
                ? "correct"
                : "incorrect"
              : "";

          return (
            <button
              key={index}
              className={`answer-button ${answerClass}`}
              onClick={() => handleAnswerClick(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
              disabled={!!selectedAnswer}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
