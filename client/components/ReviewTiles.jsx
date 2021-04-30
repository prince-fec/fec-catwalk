import React from 'react';
import axios from 'axios';
import Rating from './RatingStar.jsx';
import Moment from 'moment';
import ReviewAdd from './ReviewAdd.jsx';


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
    if (this.props.product.product !== prevProps.product.product) {
      this.fetchSortedReviews();
    }
    if (this.props.data[0] !== prevProps.data[0]) {
      this.fetchSortedReviews();
    }
  }

  fetchSortedReviews () {
    axios.get(`/reviews/${this.props.product.product}/${this.props.data[0]}/${this.props.count}`)
      .then((response) => {
        this.setState({
          reviews: response.data.results
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick() {
    this.setState((prevState) => {
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
              <div className='review-rating'><Rating rating={review.rating}/></div>
              <div className='review-name-date'>{review.reviewer_name}, {Moment(review.date).format('ll') || Moment.locale()}</div>
              <div className='review-sum'>{review.summary}</div>
              <div className='review-body'>{review.body}</div>
              {
                review.recommend?
                  <div className='review-recommend'>I recommend this product</div> : null
              }
              {
                review.response?
                  <div className='review-response'>Response: {review.response}</div> : null
              }
              {
                review.photos[0] ?
                  review.photos.map((img) => {
                    return (
                      <img id= 'review-thumbnail' key={img.id}
                      src={img.url}
                      // onError="this.src='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081';"
                      ></img>
                    )
                  })
                  : null
              }
              <div className='review-helpfulness'>Helpful? Yes{'('}{review.helpfulness}{')'}</div>
            </div>
          );
        })}
        <div className='buttons'>
        {
          !allShown?
            <button id ='show' className='buttons' onClick={this.handleClick}>
            Show More
            </button> : null
        }
        <ReviewAdd data={this.props.product.product}/>
      </div>
      </div>
    )
  }
}


export default ReviewTiles;