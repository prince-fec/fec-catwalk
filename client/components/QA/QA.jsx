import React from 'react';
import axios from 'axios';
import css from './questions.css'
import QuestionBar from './QuestionBar.jsx'
import QuestionEntry from './QuestionEntry.jsx'
import QuestionList from './QuestionList.jsx'
import Answer from './Answer.jsx'
import AddQuestion from './AddQuestion.jsx'
import AddAnswer from './AddAnswer.jsx'
import Ans from './Ans.jsx'
import withClick from './../HOC/WithClick.js';




class QA extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      data: [],
      useData: [],
      amount: 2,
      clicked: false,
      more: true
    }
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleMoreQuestions = this.handleMoreQuestions.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleQuestions () {
    axios.get(`/qa/questions/${this.props.productId}/100`)
      .then(response => {
        this.setState({
          data: response.data,
          useData: response.data
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId){
      this.handleQuestions();
    }
  }

  handleMoreQuestions() {
    var add = this.state.amount
    if (this.state.amount >= this.state.data.length){
      this.setState({
        more: false
      })
    } else if (this.state.amount + 1 === this.state.data.length){
      this.setState({
        amount: add + 2,
        more: false
      })
    } else {
      this.setState({
        amount: add + 2
      })
    }

  }

  handleClicked (boolean) {
    this.setState({
      clicked: boolean
    })
  }

  handleUpdate (data) {
    this.setState({
      data: data
    })
  }



  render() {
   return (
    <div className='QA-ctn'>
    <span className='main-heading'>QUESTIONS &#38; ANSWERS</span>
    <br></br>
    <QuestionBar questions={this.state.useData} update={this.handleUpdate}/>
    <br></br>
    {this.state.data.length > 0 ? <QuestionList name={this.props.name} productId={this.props.productId} questions={this.state.data.slice(0,this.state.amount)} update={this.handleUpdate}/> : null}
    <div className='button'>
    {this.state.data.length > 2 && this.state.more ? <button className='button1' onClick={this.handleMoreQuestions}>MORE ANSWERED QUESTIONS</button> : null}
    <button className='button2' onClick={() => this.handleClicked(true)}>ADD A QUESTION</button>
    </div>
    {this.state.clicked ? <AddQuestion name={this.props.name} id={this.props.productId} close={this.handleClicked}/> : null}
  </div>
   )
  }
}

export default withClick(QA);