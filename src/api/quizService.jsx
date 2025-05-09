const quizService = {
  getQuestions: async (amount = 10, difficulty = "medium", category = "9", type = "multiple", startIndex = 0) => {
    try {
      console.log(`Fetching ${amount} questions (Difficulty: ${difficulty}, Category: ${category})...`); 

      const cachedQuestions = localStorage.getItem("quizQuestions");
      if (cachedQuestions && startIndex === 0) {
        console.log("Using cached questions...");
        return JSON.parse(cachedQuestions);
      }

      const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}&offset=${startIndex}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OpenTDB HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Questions from OpenTDB:", data.results); 

      if (data.results.length === 0) {
        console.warn("No questions found, trying alternate API...");
        return await quizService.getBackupQuestions(amount, difficulty, startIndex);
      }

      localStorage.setItem("quizQuestions", JSON.stringify(data.results)); 
      return quizService.shuffleOptions(data.results);
      
    } catch (error) {
      console.error("Error fetching from OpenTDB:", error);
      return await quizService.getBackupQuestions(amount, difficulty, startIndex);
    }
  },

  getBackupQuestions: async (amount, difficulty, startIndex) => {
    try {
      console.log("Fetching backup questions from QuizAPI...");
      const API_KEY = "YOUR_API_KEY"; 

      const response = await fetch(`https://quizapi.io/api/v1/questions?limit=${amount}&difficulty=${difficulty}&apiKey=${API_KEY}&offset=${startIndex}`);
      
      if (!response.ok) {
        throw new Error(`QuizAPI HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Questions from QuizAPI:", data); 

      return quizService.formatBackupQuestions(data);
      
    } catch (error) {
      console.error("Error fetching from QuizAPI:", error);
      return [];
    }
  },

  formatBackupQuestions: (questions) => {
    return questions.map(q => ({
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: Object.values(q.answers).filter(ans => ans !== q.correct_answer && ans !== null),
      all_answers: quizService.shuffleOptions([
        q.correct_answer,
        ...Object.values(q.answers).filter(ans => ans !== q.correct_answer && ans !== null)
      ]),
    }));
  },

  shuffleOptions: (questions) => {
    return questions.map(q => ({
      ...q,
      all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    }));
  },

  // Add a function to trigger question change after 10 questions
  getNextSetOfQuestions: async (currentQuestions, amount = 10, difficulty = "medium", category = "9", type = "multiple") => {
    const currentIndex = currentQuestions.length;
    const nextIndex = currentIndex + amount;
    const newQuestions = await quizService.getQuestions(amount, difficulty, category, type, nextIndex);
    
    return newQuestions;
  },
  
  // A function to handle quiz flow with time
  handleQuizFlow: async (currentQuestions, totalQuestions, difficulty, category, type) => {
    let nextQuestions = currentQuestions;
    
    if (currentQuestions.length === 10) {
      nextQuestions = await quizService.getNextSetOfQuestions(currentQuestions, 10, difficulty, category, type);
    }
    
    if (nextQuestions.length < totalQuestions) {
      return nextQuestions;
    }

    return nextQuestions;
  },

  // Add more advanced API options (e.g., from different quiz services)
  getAdvancedQuestions: async (amount = 10, difficulty = "medium", category = "9", type = "multiple") => {
    try {
      const newApiUrl = `https://some-advanced-quiz-api.com/questions?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;
      const response = await fetch(newApiUrl);
      
      if (!response.ok) {
        throw new Error(`Advanced Quiz API error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Advanced Questions:", data);

      return quizService.shuffleOptions(data.results);
      
    } catch (error) {
      console.error("Error fetching from Advanced API:", error);
      return [];
    }
  },
};

export default quizService;
