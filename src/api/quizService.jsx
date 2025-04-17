const quizService = {
  getQuestions: async (amount = 10, difficulty = "medium", category = "9", type = "multiple") => {
    try {
      console.log(`Fetching ${amount} questions (Difficulty: ${difficulty}, Category: ${category})...`); 

      const cachedQuestions = localStorage.getItem("quizQuestions");
      if (cachedQuestions) {
        console.log("Using cached questions...");
        return JSON.parse(cachedQuestions);
      }

      const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OpenTDB HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Questions from OpenTDB:", data.results); 

      if (data.results.length === 0) {
        console.warn("No questions found, trying alternate API...");
        return await quizService.getBackupQuestions(amount, difficulty);
      }

      localStorage.setItem("quizQuestions", JSON.stringify(data.results)); 
      return quizService.shuffleOptions(data.results);
      
    } catch (error) {
      console.error("Error fetching from OpenTDB:", error);
      return await quizService.getBackupQuestions(amount, difficulty);
    }
  },

  getBackupQuestions: async (amount, difficulty) => {
    try {
      console.log("Fetching backup questions from QuizAPI...");
      const API_KEY = "YOUR_API_KEY"; 

      const response = await fetch(`https://quizapi.io/api/v1/questions?limit=${amount}&difficulty=${difficulty}&apiKey=${API_KEY}`);
      
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
  }
};

export default quizService;
