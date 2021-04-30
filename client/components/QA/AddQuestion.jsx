import React from 'react';
import axios from 'axios';

class AddQuestion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      question: '',
      questionError: '',
      nickname: '',
      nicknameError: '',
      email: '',
      emailError: '',
      submit: false
    }

    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleQuestion (event) {
    this.setState({
      question: event.target.value
    })
  }

  handleName (event) {
    this.setState({
      nickname: event.target.value
    })
  }

  handleEmail (event) {
    this.setState({
      email: event.target.value
    })
  }

  validate () {
    let message = 'You must enter the following';
    if (this.state.question.length < 1) {
      this.setState({
        questionError: message
      })
      return false;
    }
    if (this.state.nickname.length < 1) {
      this.setState({
        nicknameError: message
      })
      return false;
    }
    if (!this.state.email.includes('@') || !this.state.email) {
      this.setState({
        emailError: message
      })
      return false;
    }

    return true
  }

  handleSubmit (e) {
    e.preventDefault();

    var isValid = this.validate();
    if (isValid) {
      axios.post('/qa/questions', {
        body: this.state.question,
        name: this.state.nickname,
        email: this.state.email,
        product_id: this.props.id
      })
        .then(data => {
          console.log('Successfully sent post request')
          this.setState({
            question: '',
            nickname: '',
            email: '',
            submit: true
          })
          this.props.update(data.data)
        })
        .catch((err) => {
          console.log('Failed to send post request' + err)
        })
    }
  }

  render () {
    return (
      <form className='questionform' onSubmit={(e) => this.handleSubmit(e)}>
        {this.state.submit ? <div className='innerForm-submitted'>
          <div className='close' onClick={() => this.props.close(false)}>+</div>
          <div className='form-title'>Your Question has been submitted !</div>
          <div className='mini-title'>Thanks for visiting!</div>
          <img className='form-img-submitted' src='./../../../assets/Catwalk.svg' alt='catwalk logo'></img>
          </div>
        : <div className='innerForm'>
        <div className='close' onClick={() => this.props.close(false)}>+</div>
        <div className='form-title'>Ask Your Question</div>
        <div className='mini-title'>About the {this.props.name}</div>
        <label htmlFor='question' >Your Question*
        <div className='error'>{this.state.questionError}</div>
        <textarea className='textbox' type='text' value={this.state.question} id='question' placeholder='What is your question?' maxLength="1000" onChange={this.handleQuestion}></textarea>
        </label>
        <br></br>
        <label>Nickname*
        <div className='error'>{this.state.nicknameError}</div>
        <input value={this.state.nickname} placeholder='Example: jackson11!' maxLength="60"  onChange={this.handleName}></input>
        <span>“For privacy reasons, do not use your full name or email address”</span>
        </label>
        <label>Email*
        <div className='error'>{this.state.emailError}</div>
        <input type='email' value={this.state.email} maxLength="60"  onChange={this.handleEmail}></input>
        <span>“For authentication reasons, you will not be emailed”</span>
        </label>

        <input className='submit' type="submit" ></input>
        </div>}

      </form>
    )
  }
}

export default AddQuestion;