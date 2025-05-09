import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import quizService from "./api/quizService";
import "../src/styles/App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [quizKey, setQuizKey] = useState(0); 

  useEffect(() => {
    quizService.getQuestions().then((data) => {
      setQuestions(data || []); 
    });
  }, []);

  const restartQuiz = () => {
    setQuizKey((prevKey) => prevKey + 1); 
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        <Quiz key={quizKey} questions={questions} restartQuiz={restartQuiz} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
