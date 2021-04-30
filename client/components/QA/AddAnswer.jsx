import React from 'react';
import axios from 'axios';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: '',
      answerError: '',
      nickname: '',
      nicknameError: '',
      email: '',
      emailError: '',
      photos: [],
      url: [],
      max: false,
      submit: 'Submit your Answer',
      submitted: false
    }
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNickName = this.handleNickName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleThumbnail = this.handleThumbnail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAnswer(event) {
    this.setState({
      answer: event.target.value
    })
  }

  handleNickName(event) {
    this.setState({
      nickname: event.target.value
    })
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePhotos(event) {
    var array = this.state.photos;
    if (event.target.files.length + this.state.photos.length > 5) {
      alert('Only 5 images allowed')
    } else if (event.target.files.length + this.state.photos.length === 5) {
      this.setState({
        max: true
      }, this.handleThumbnail(event.target.files))
    } else {
      this.handleThumbnail(event.target.files)
    }
  }

  validate() {
    let message = 'You must enter the following';
    if (this.state.answer.length < 1) {
      this.setState({
        answerError: message
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

  handleThumbnail(files) {
    for (var i = 0; i < files.length; i++) {
      var photo = document.createElement("img");
      photo.src = URL.createObjectURL(files[i]);
      var photoArr = this.state.photos
      photoArr.push(files[i])
      var urlpic = this.state.url;
      urlpic.push(photo.src)
      this.setState({
        url: urlpic,
        photos: photoArr
      })
      photo.className = 'form-img';
      var forDiv = document.getElementById('thumbnail');
      forDiv.appendChild(photo);
    }
  }

  handleSubmit() {
    var isValid = this.validate();

    if (isValid) {
      axios.post(`/qa/questions/${this.props.questionId}/answers`, {
        body: this.state.answer,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.url,
        questionId: this.props.questionId

      })
        .then((data) => {
          this.setState({
            submit: 'Answer Submitted!',
            answer: '',
            nickname: '',
            email: '',
            max: true,
            submitted: true
          })
          this.props.update(data.data)
        })
        .catch((err) => {
          console.log(err);
          console.log('Failed')
        })
    }
    event.preventDefault();
  }

  render() {
    return (
      <form className='answerform' onSubmit={(e) => this.handleSubmit(e)}>
        {this.state.submitted ? <div className='innerForm-submitted'>
          <div className='close' onClick={() => this.props.close(false)}>+</div>
          <div className='form-title'>Your Answer has been submitted !</div>
          <div className='mini-title'>Thanks for visiting!</div>
          <img className='form-img-submitted' src='./../../../assets/Catwalk.svg' alt='catwalk logo'></img>
          </div> :  <div className='innerForma'>
        <div className='close' onClick={() => this.props.close(false)}>+</div>
        <div className='form-title'>{this.state.submit}</div>
        <div className='mini-title'>{this.props.name} : {this.props.question}</div>
        <label>Answer*
          <div className='error'>{this.state.answerError}</div>
            <textarea type='text' value={this.state.answer} onChange={this.handleAnswer} placeholder='add answer here...'></textarea>
          </label>
          <label>nickname*
          <div className='error'>{this.state.nicknameError}</div>
            <input type='text' value={this.state.nickname} onChange={this.handleNickName}></input>
          </label>
          <label>Email*
          <div className='error'>{this.state.emailError}</div>
            <input type='email' value={this.state.email} onChange={this.handleEmail}></input>
          </label>
          <label>Add image*
        {this.state.max ? null : <input className='file-btn' type='file' multiple onChange={this.handlePhotos}></input>}
          </label>
          <div id='thumbnail'>
          </div>
          <input className='submit' type='submit'></input>
        </div>}

      </form >
    )
  }
}

export default AddAnswer