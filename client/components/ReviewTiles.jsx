import React from 'react';
import axios from 'axios';
import Rating from 'react-star-ratings';
import Moment from 'moment';

import App from './App.jsx';
import Review from './Review.jsx';
import ReviewsList from './ReviewsList.jsx';
import ReviewAdd from './ReviewAdd.jsx';
import css from './Review.css';


class ReviewTiles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      numberShown: 2,
      write: false,
      imgError: false,
      src: ''
    }
    this.handleClick = this.handleClick.bind(this);
    // this.onError = this.onError.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data[1].product !== prevProps.data[1].product) {
      this.fetchSortedReviews();
    }
    if (this.props.data[0] !== prevProps.data[0]) {
      this.fetchSortedReviews();
    }
  }

  fetchSortedReviews () {
    axios.get(`/reviews/${this.props.data[1].product}/${this.props.data[0]}`)
      .then((response) => {
        this.setState({
          reviews: response.data.results
        })
        // console.log(this.state.reviews)
      })
  }

  handleClick () {
    this.setState ((prevState)=> {
      return {
        numberShown: prevState.numberShown + 2
      }
    })
  }

  // onError () {
  //   if (!this.state.imgError) {
  //     this.setState ({
  //       src: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
  //       imgError: true
  //     })
  //   }
  // }

  render() {
    var reviews = this.state.reviews.slice(0, this.state.numberShown);
    var allShown = false;
    if (reviews.length >= this.state.reviews.length) {
      allShown = true;
    }
    return (
      <div id='reviews'>
        {reviews.map((review) => {
          return (
            <div className= 'reviewTile' key={review.review_id}>
              <p className='review-rating'><Rating rating={review.rating} numberOfStars={5}
              starRatedColor='black' starDimension="20px"/></p>
              <p className='review-name-date'>{review.reviewer_name},  {Moment(review.date).format('ll') || Moment.locale()}</p>
              <p className='review-sum'>{review.summary}</p>
              <p className='review-body'>{review.body}</p>
              {
                review.recommend?
                  <p className='review-recommend'>I recommend this product</p> : null
              }
              {
                review.response?
                  <p className='review-response'>Response: {review.response}</p> : null
              }
              {
                review.photos[0] ?
                  review.photos.map((img, idx) => {
                    return (
                      <img id= 'review-thumbnail'
                      src={'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'}
                      ></img>
                    )
                  })
                  :null
              }
              <p className='review-helpfulness'>Helpful? Yes{'('}{review.helpfulness}{')'}</p>
            </div>
          );
        })}
        <div class='buttons'>
        {
          !allShown?
            <button className='buttons' onClick={this.handleClick}>
            Show More
            </button> : null
        }
        <ReviewAdd data={this.props.data[1].product}/>
      </div>
      </div>
    )
  }
}


export default ReviewTiles;