import React from 'react';
import moment from 'moment';
import axios from 'axios'

class Ans extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      report: 'Report',
      clickedHelpful: false
    }

    this.handleAnswerHelpful = this.handleAnswerHelpful.bind(this);
    this.handleAnswerReport = this.handleAnswerReport.bind(this);
  }

  handleAnswerHelpful(answerid) {
    if (this.state.clickedHelpful === false) {
      axios.put(`/qa/answers/${answerid}/helpful`, { question_id: this.props.questionId })
        .then((data) => {
          this.props.updateAns(data.data.results);
          this.setState({
            clickedHelpful: true
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleAnswerReport(answerid) {
    if (this.state.report === 'Report') {
      axios.put(`/qa/answers/${answerid}/report`)
        .then(success => {
          this.setState({
            report: 'Reported'
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const divClassName = this.props.ans.answerer_name === 'seller' ? 'seller' : 'normal'
    return (
      <div className='ans'>
        <div className='answer'>{this.props.ans.body}</div>
        {/* {this.props.ans.photos.length > 0 ? <img></img> : null} */}
        <div className='ans-info'>
          <div className='ans-sec'> by <div id={divClassName}>{this.props.ans.answerer_name}</div>, {moment(this.props.ans.date, "YYYY-MM-DD").format('LL')}</div>
          <div>Helpful? <span onClick={() => this.handleAnswerHelpful(this.props.ans.answer_id)}>Yes</span>({this.props.ans.helpfulness})</div>
          <div onClick={() => this.handleAnswerReport(this.props.ans.answer_id)}>{this.state.report}</div>
        </div>
      </div>
    )
  }
}

export default Ans;