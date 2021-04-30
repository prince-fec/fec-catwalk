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

  }

  highlightText (text, body) {
    var result = [];
    var remainingText = body.slice();
    var index = remainingText.toLowerCase().indexOf(text.toLowerCase());

    while (index !== -1) {
      result.push(remainingText.slice(0, index))
      remainingText = remainingText.slice(index);
      result.push(remainingText.slice(0, text.length));
      remainingText = remainingText.slice(text.length);
      index = remainingText.toLowerCase().indexOf(text.toLowerCase());
    }
    result.push(remainingText);
    return result;

  }




  handleSearch (event) {

    if (event.target.value.length > 3) {

      var filtered = this.props.questions.filter((question)=> {
         return question.question_body.toLowerCase().includes(event.target.value.toLowerCase())
      })
      var highlightFilter = JSON.parse(JSON.stringify(filtered.slice()));
      highlightFilter = highlightFilter.map((question, index) => {
        const questionBody = this.highlightText(event.target.value, question.question_body);
        question.question_body = questionBody.map((line, index) => {
          if (index % 2 === 0) {
            return line;
          }
          return <span key={index} id="highlight">{line}</span>;
        });
        return question;
      })
      this.props.update(highlightFilter)

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