import React from 'react';

class QuestionBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: "",
      length: 0
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.highlightText = this.highlightText.bind(this);
    this.unHighLight = this.unHighLight.bind(this);
  }

  highlightText (text) {
    var questions = document.getElementsByClassName("question");
    var inputText = Array.prototype.slice.call(questions)

    inputText.map((body)=> {
      var question = body.innerHTML;
      var index = question.indexOf(text);
      if (index !== -1) {
        var insert = question.substring(0, index) + "<span id='highlight'>"+ question.substring(index,index+text.length) + "</span>" + question.substring(index + text.length);
        body.innerHTML = insert
        console.log(body)
        return body;
      }
    })

  }



  handleSearch (event) {

    if (event.target.value.length > 3) {
      // this.highlightText(event.target.value);
      var filtered = this.props.questions.filter((question)=> {
         return question.question_body.includes(event.target.value)
      })
      this.props.update(filtered)

    } else {
      this.props.reset();
    }

  }


  render () {
    return (

      <input className='searchBar' placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={this.handleSearch}>
      </input>


    )
  }
}

export default QuestionBar;