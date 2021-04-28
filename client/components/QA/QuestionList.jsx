import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = (props) => (
  <div className='list-ctn'>
    {props.questions.map((question, index)=> (
     <QuestionEntry question={question} key={question.question_id} name={props.name} productId={props.productId} update={props.update}/>
    )
    )}
  </div>
)



export default QuestionList;