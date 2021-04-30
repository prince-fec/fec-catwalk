import React from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import css from './Review.css';
import withClick from './HOC/WithClick.js';


class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      count: null,
      updated: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    prevState = JSON.stringify(prevState);
    var currentState = JSON.stringify(this.state);
    if (currentState === prevState) {
      if (!this.state.updated) {
        this.setState({
          productId: prevProps.item,
          updated: true
        });
        this.fetchReviews();
      }
    }
  }

  fetchReviews () {
    axios.get(`/reviews/${this.props.item}/relevant/1000`)
      .then((response) => {
        this.setState({
          reviews: response.data.results,
          count: response.data.results.length
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }

  render() {
    return (
      <div className='review'>
        <ReviewSummary data={this.props.item} getScore={this.props.getScore} />
        <div id='review-line-two'>
          <ReviewsList data={this.state.reviews} count={this.state.count} product={this.props.item}/>
        </div>
      </div>
    )
  }
}

export default withClick(Review);