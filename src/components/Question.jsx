import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import { useState } from "react"
import questions from "../questions";


export default function Question({ 
    index,
    onSelect,
    onSkipAnswer
}) {

   const [answer, setAnswer] = useState({
      selectedAnswer: '',
      isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
       setAnswer({
         selectedAnswer: answer,
         isCorrect: null
       });

       setTimeout(() => {
         setAnswer({
            selectedAnswer: answer,
            isCorrect: questions[index].answers[0] === answer
         })
       }, 1000);

       setTimeout(() => {
         onSelect(answer)
       }, 2000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }
    
    return <>
      <div id="question">
        <QuestionTimer
          key={timer}
          timeout={timer} 
          onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
          mode={answerState}
          />
         <h2>{questions[index].text}</h2>

            <Answers
             answers={questions[index].answers}
             selectedAnswer={answer.selectedAnswer}
             answerState={answerState}
             onSelect={handleSelectAnswer}
             />
      
       </div>
    </>
}