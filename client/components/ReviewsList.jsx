import React from 'react';
import axios from 'axios';
import ReviewTiles from './ReviewTiles.jsx';
import Review from './Review.jsx';
import css from './Review.css';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      sort: 'relevant',
      count: null
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data[0] !== prevProps.data[0]) {
      this.setState({
        reviews: this.props.data,
        count: this.props.count
      })
    }
  }

  onChange (e) {
    this.setState ({
      sort: e.target.value
    })
  }


  render() {
    return (
      <div id='review-container'>
      <div className='review-list'> {this.state.count} reviews, sort by
        <select onChange={this.onChange} className='drop-down'>
          <option value='relevant'>relevance</option>
          <option value='helpful'>helpfulness</option>
          <option value='newest'>new to old</option>
        </select>
        <ReviewTiles data={[this.state.sort, this.props.data]} count={this.props.count} product={this.props}/>
      </div>
      </div>
    )
  }
}


export default ReviewsList;