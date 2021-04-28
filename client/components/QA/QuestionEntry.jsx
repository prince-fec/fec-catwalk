import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx'
import Answer from './Answer.jsx'

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedHelpful: false,
      clickedForm: false,
      answers: [],
      i: 2,
      load: 'LOAD MORE ANSWERS'
    }
    this.getAnswers = this.getAnswers.bind(this);
    this.handleMoreQuestions = this.handleMoreQuestions.bind(this);
    this.updateAns = this.updateAns.bind(this);

    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleClickForm = this.handleClickForm.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  getAnswers() {
    axios.get(`/qa/answers/${this.props.question.question_id}/answers`)
      .then(response => {
        this.setState({
          answers: response.data
        })
      })
  }

  componentDidMount() {
    this.getAnswers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.question.question_id !== prevProps.question.question_id) {
      this.getAnswers();
    }

  }

  handleReport() {
    axios.put(`/qa/questions/${this.props.question.question_id}/report`)
      .then(() => {
        console.log('Reported')
      })
  }

  handleHelpful() {
    if (this.state.clickedHelpful === false) {
      axios.put(`/qa/questions/${this.props.question.question_id}/helpful`, { product_id: this.props.productId })
        .then((data) => {
          this.props.update(data.data)
          this.setState({
            clickedHelpful: true
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleClickForm(boolean) {
    this.setState({
      clickedForm: boolean
    })
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
      <div>
        <div className='question'>Q:{'  ' + this.props.question.question_body}</div>
        <div className='questionLink'>
          <div className='link-helpful'>helpful? <span onClick={this.handleHelpful}>Yes</span>({this.props.question.question_helpfulness}) </div>
          <div className='link-answe' onClick={() => this.handleClickForm(true)}> Add Answer</div>
        </div>

        {this.state.clickedForm ? <AddAnswer question={this.props.question.question_body} questionId={this.props.question.question_id} name={this.props.name} close={this.handleClickForm} update={this.updateAns} /> : null}
        <div className='ans-section'>
          <div className='A'>A:</div>
          <div className='test'>
            {!this.state.answers.length ? <div className='no-ans'>No Answer for this Question. Try submitting an Answer!</div> : <Answer answer={this.state.answers.slice(0, this.state.i)} questionId={this.props.question.question_id} updateAns={this.updateAns} />}

            {this.state.answers.length > 2 ? <div className='load-ans' onClick={this.handleMoreQuestions}>{this.state.load}</div> : null}
          </div>
        </div>
      </div>
    )

  }
}

export default QuestionEntry