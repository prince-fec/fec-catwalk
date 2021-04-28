import React from 'react';

class QuestionBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: "",
      length: 0
    }
    this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearch (event) {

    if (event.target.value.length > 3) {

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