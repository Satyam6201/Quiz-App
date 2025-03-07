const quizService = {
  getQuestions: async () => {
    try {
      console.log("Fetching questions..."); 
      const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched Questions:", data.results); 
      
      return data.results || []; 
    } catch (error) {
      console.error("Error fetching questions:", error);
      return []; 
    }
  },
};

export default quizService;
