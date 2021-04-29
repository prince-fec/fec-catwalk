import React, {useState, useEffect, useCallback, useRef} from 'react';
import QuestionEntry from './QuestionEntry.jsx';

function QuestionList(props)  {
  const loader = useRef(null);
  const loadMore = useCallback((entries)=> {

    const target = entries[0];
    if (target.isIntersecting && props.questions.length < props.data.length) {
      props.handleMoreQuestions();
    }
  },[props.questions])

  useEffect(() => {
    if (props.isLoading) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
      }

      const observer = new IntersectionObserver(loadMore, options);

      if (loader && loader.current) {
        observer.observe(loader.current);
      }

      return () => observer.unobserve(loader.current);
    }

  },[loader, loadMore, props.isLoading])





  return (
  <div className='list-ctn'>
    {props.questions.map((question, index)=> (
    <QuestionEntry question={question} key={question.question_id} name={props.name} productId={props.productId} update={props.update}/>
    )
    )}
    <div ref={loader}></div>
  </div>
)


    }



export default QuestionList;