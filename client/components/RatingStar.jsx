import React from 'react';
import axios from 'axios';
import Rating from 'react-star-ratings';
import Moment from 'moment';
// import star from './star.png';



class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        rating: prevProps.rating
      })
      this.fetchMeta();
    }
  }


  render() {
    var score = this.props.rating;
    var stars = [];

    while(stars.length < 5) {
      if (score > 1) {
        stars.push(1);
      } else if (score > 0) {
        stars.push(score);
      } else {
        stars.push(0);
      }
      score = score - 1;
    }
    // <img src='./../../../assets/Catwalk.svg'></img>

    return (
      <div>
        {stars.map((item, i) => {
          return (
            <div className="single-star-container" key={i}>
              {
                (item === 0) ?
                  <img className="single-star-outline star" src="./../../../assets/star.png" alt="stars"></img>
                :null

              }
              {
                (item > 0.1 && item < 0.4) ?
                  <img className="single-star-outline star" src="./../../../assets/star1.png" alt="stars"></img>
                :null
              }
              {
                (item >= 0.4 && item < 0.6) ?
                  <img className="single-star-outline star" src="./../../../assets/star2.png" alt="stars"></img>
                :null
              }
              {
                (item >= 0.6 && item < 0.9) ?
                  <img className="single-star-outline star" src="./../../../assets/star3.png" alt="stars"></img>
                :null
              }
              {
                (item > 0.9) ?
                  <img className="single-star-outline star" src="./../../../assets/star-fill.png" alt="stars"></img>
                :null
              }
            </div>
          )
        })}
      </div>

      )
  }
}


export default StarRating;