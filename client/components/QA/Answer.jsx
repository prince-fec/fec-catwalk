import React from 'react';
import Ans from './Ans.jsx'

const Answer = (props) => (

  <div className='answer-ctn'>
    {props.answer.map((ans, index) => (
      <Ans ans={ans} key={index}  questionId={props.questionId} updateAns={props.updateAns}/>
    ))}
  </div>
)



export default Answer;