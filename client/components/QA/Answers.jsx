import React from 'react'
import axios from 'axios';
import Answer from './Answer.jsx'

class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      i: 2,
      load: 'LOAD MORE ANSWERS'
    }

    this.getAnswers = this.getAnswers.bind(this);
    this.handleMoreQuestions = this.handleMoreQuestions.bind(this);
    this.updateAns = this.updateAns.bind(this);
  }

  getAnswers() {
    axios.get(`/qa/answers/${this.props.questionId}/answers`)
      .then(response => {
        this.setState({
          answers: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAnswers();
  }

  handleMoreQuestions() {
    if (this.state.load === 'LOAD MORE ANSWERS') {
      this.setState({
        i: this.state.answers.length,
        load: 'COLLAPSE ANSWERS'

      })
    }

    if (this.state.load === 'COLLAPSE ANSWERS') {
      this.setState({
        i: 2,
        load: 'LOAD MORE ANSWERS'
      })
    }
  }

  updateAns(ans) {
    this.setState({
      answers: ans
    })
  }

  render() {
    return (
      <div className='test'>

        <Answer answer={this.state.answers.slice(0, this.state.i)} questionId={this.props.questionId} updateAns={this.updateAns} />
        {this.state.answers.length > 2 ? <div className='load-ans' onClick={this.handleMoreQuestions}>{this.state.load}</div> : null}
      </div>

    )
  }
}

export default Answers