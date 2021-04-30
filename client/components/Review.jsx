import React from 'react';
import App from './App.jsx';
import axios from 'axios';
import requests from '../../axios-prefilter';
import ReviewsList from './ReviewsList.jsx';
import ReviewAdd from './ReviewAdd.jsx';
import ReviewSummary from './ReviewSummary.jsx';
import css from './Review.css';


class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ productId: prevProps.item });
      this.fetchReviews();
    }
  }

  fetchReviews() {
    axios.get(`/reviews/${this.props.item}`)
      .then((response) => {
        this.setState({
          reviews: response.data
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
          <ReviewsList data={this.state.reviews} />
        </div>
      </div>
    )
  }
}

export default Review;