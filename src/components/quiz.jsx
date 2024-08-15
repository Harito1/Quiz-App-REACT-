import { useState, useCallback } from "react";
import questions from "../questions";
import Question from "./Question";
import Summary from "./Summary";

function Quiz() {

   const [userAnswers, setUserAnswers] = useState([]);

   const activeQuestionIndex = userAnswers.length;
   const quizIsComplete = activeQuestionIndex === questions.length

   const handleSelectAnswer = useCallback((selectedAnswer) => {
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer]
      });
  
   }, [])

   const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

   if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />
   }
  

    return <>
    <div id="quiz">
       <Question 
         key={activeQuestionIndex}
         index={activeQuestionIndex}
         onSkipAnswer={handleSkipAnswer}
         onSelect={handleSelectAnswer}
       />
    </div>
       
    </>
}

export default Quiz;