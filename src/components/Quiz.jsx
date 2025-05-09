import React, { useState, useEffect } from "react";
import Question from "./Question";
import Score from "./Score";
import Progress from "./Progress";
import "../styles/Quiz.css";

function Quiz({ questions, restartQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); 
  const [quizOver, setQuizOver] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= 10) {
      setQuizOver(true);
      return;
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(15);
    }, 500);
  };

  useEffect(() => {
    if (timeLeft === 0 || quizOver) {
      nextQuestion();
    }

    const timer = setInterval(() => {
      if (!quizOver) setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizOver]);

  return (
    <div className="quiz-container">
      <Progress currentIndex={currentIndex} total={questions.length} />
      <div className="timer">⏳ {timeLeft}s</div>

      {currentIndex < questions.length && !quizOver ? (
        <Question data={questions[currentIndex]} onAnswer={handleAnswer} />
      ) : (
        <Score score={score} total={questions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
}

export default Quiz;
