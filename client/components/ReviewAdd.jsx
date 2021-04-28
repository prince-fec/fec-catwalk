import React from 'react';
import axios from 'axios';
import Rating from 'react-star-ratings';
import Modal from 'react-modal';

import Review from './Review.jsx';
import App from './App.jsx';
import css from './Review.css';


class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      summary: '',
      recommend: null,
      body: '',
      name: '',
      email: '',
      characteristics: {},
      helpfulness: null,
      show: false,
    }

    this.handleRecommend = this.handleRecommend.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
    this.handleComfort = this.handleComfort.bind(this);
    this.handleQuality = this.handleQuality.bind(this);
    this.handleLength = this.handleLength.bind(this);
    this.handleFit = this.handleFit.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        productId: prevProps.data
      })
      this.fetchMeta();
    }
  }

  fetchMeta() {
    axios.get(`/reviews/meta/${this.props.data}`)
      .then((response) => {
        this.setState({
          characteristics: response.data.characteristics
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRecommend(value) {
    this.setState({
      recommend: value
    })
  }

  handleSize(value) {
    this.setState({
      size: value
    })
  }

  handleWidth(value) {
    this.setState({
      width: value
    });
  }

  handleComfort(value) {
    this.setState({
      comfort: value
    })
  }

  handleQuality(value) {
    this.setState({
      quality: value
    })
  }

  handleLength(value) {
    this.setState({
      length: value
    })
  }

  handleFit(value) {
    this.setState({
      fit: value
    })
  }

  handleSummary(e) {
    this.setState({
      summary: e.target.value
    })
  }

  handleBody(e) {
    this.setState({
      body: e.target.value
    })
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleNickname(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleRating(value) {
    this.setState({
      rating: value
    })
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true
    })
  }


  render() {
    const ratingLabels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    };
    return (
      <div id='write-review'>
        <button className='buttons' onClick={this.handleShow}>
          Write Review
        </button>
        {
          this.state.show ?
            <div id='review-form-whole'>
              <form id='write-form'>
                <h2 id='review-form-top'>Write Your Review</h2>
                <button id='close-button' onClick={this.handleClose}>Close</button>
                <div id='review-radio'>
                  <Rating name="Rating" rating={this.state.rating} totalStars={5}
                    starHoverColor="black" value={this.state.rating}
                    starRatedColor="black" changeRating={(rating) => this.handleRating(rating)} />
                  <div>
                    <div> Do you recommend this product?</div>
                    <label>
                      <input name="Recommend" type="radio" onChange={() => this.handleRecommend(true)} />
                      <span>Yes</span>
                    </label>
                    <label>
                      <input name="Recommend" type="radio" onChange={() => this.handleRecommend(false)} />
                      <span>No</span>
                    </label>
                  </div>
                  {
                    this.state.characteristics.Size ?
                      <div id='rate-size'>
                        <div>Size</div>
                        <label>
                          <input name="Size" type="radio" onChange={() => this.handleSize(1)} />
                          <span>A size too small</span>
                        </label>
                        <label>
                          <input name="Size" type="radio" onChange={() => this.handleSize(2)} />
                          <span>½ a size too small</span>
                        </label>
                        <label>
                          <input name="Size" type="radio" onChange={() => this.handleSize(3)} />
                          <span>Perfect</span>
                        </label>
                        <label>
                          <input name="Size" type="radio" onChange={() => this.handleSize(4)} />
                          <span>½ a size too big</span>
                        </label>
                        <label>
                          <input name="Size" type="radio" onChange={() => this.handleSize(5)} />
                          <span>A size too big</span>
                        </label>
                      </div>
                      : null
                  }
                  {
                    this.state.characteristics.Width ?
                      <div id='rate-width'>
                        <label>
                          <div>Width</div>
                          <input name="Width" type="radio" onChange={() => this.handleWidth(1)} />
                          <span>Too narrow</span>
                        </label>
                        <label>
                          <input name="Width" type="radio" onChange={() => this.handleWidth(2)} />
                          <span>Slightly Narrow</span>
                        </label>
                        <label>
                          <input name="Width" type="radio" onChange={() => this.handleWidth(3)} />
                          <span>Perfect</span>
                        </label>
                        <label>
                          <input name="Width" type="radio" onChange={() => this.handleWidth(4)} />
                          <span>Slightly wide</span>
                        </label>
                        <label>
                          <input name="Width" type="radio" onChange={() => this.handleWidth(5)} />
                          <span>Too wide</span>
                        </label>
                      </div>
                      : null
                  }
                  {
                    this.state.characteristics.Comfort ?
                      <div id='rate-comfort'>
                        <label>
                          <div>Comfort</div>
                          <input name="Comfort" type="radio" onChange={() => this.handleComfort(1)} />
                          <span>Uncomfortable</span>
                        </label>
                        <label>
                          <input name="Comfort" type="radio" onChange={() => this.handleComfort(2)} />
                          <span>Slightly Uncomfortable</span>
                        </label>
                        <label>
                          <input name="Comfort" type="radio" onChange={() => this.handleComfort(3)} />
                          <span>Ok</span>
                        </label>
                        <label>
                          <input name="Comfort" type="radio" onChange={() => this.handleComfort(4)} />
                          <span>Comfortable</span>
                        </label>
                        <label>
                          <input name="Comfort" type="radio" onChange={() => this.handleComfort(5)} />
                          <span>Perfect</span>
                        </label>
                      </div>
                      : null
                  }
                  {
                    this.state.characteristics.Quality ?
                      <div id='rate-quality'>
                        <label>
                          <div>Quality</div>
                          <input name="Quality" type="radio" onChange={() => this.handleQuality(1)} />
                          <span>Poor</span>
                        </label>
                        <label>
                          <input name="Quality" type="radio" onChange={() => this.handleQuality(2)} />
                          <span>Below average</span>
                        </label>
                        <label>
                          <input name="Quality" type="radio" onChange={() => this.handleQuality(3)} />
                          <span>What I expected</span>
                        </label>
                        <label>
                          <input name="Quality" type="radio" onChange={() => this.handleQuality(4)} />
                          <span>Pretty great</span>
                        </label>
                        <label>
                          <input name="Quality" type="radio" onChange={() => this.handleQuality(5)} />
                          <span>Perfect</span>
                        </label>
                      </div>
                      : null
                  }
                  {
                    this.state.characteristics.Length ?
                      <div id='rate-length'>
                        <label>
                          <div>Length</div>
                          <input name="Length" type="radio" onChange={() => this.handleLength(1)} />
                          <span>Runs Short</span>
                        </label>
                        <label>
                          <input name="Length" type="radio" onChange={() => this.handleLength(2)} />
                          <span>Runs slightly short</span>
                        </label>
                        <label>
                          <input name="Length" type="radio" onChange={() => this.handleLength(3)} />
                          <span>Perfect</span>
                        </label>
                        <label>
                          <input name="Length" type="radio" onChange={() => this.handleLength(4)} />
                          <span>Runs slightly long</span>
                        </label>
                        <label>
                          <input name="Length" type="radio" onChange={() => this.handleLength(5)} />
                          <span>Runs long</span>
                        </label>
                      </div>
                      : null
                  }
                  {
                    this.state.characteristics.Fit ?
                      <div id='rate-fit'>
                        <label>
                          <div>Fit</div>
                          <input name="Fit" type="radio" onChange={() => this.handleFit(1)} />
                          <span>Runs tight</span>
                        </label>
                        <label>
                          <input name="Fit" type="radio" onChange={() => this.handleFit(2)} />
                          <span>Runs slightly tight</span>
                        </label>
                        <label>
                          <input name="Fit" type="radio" onChange={() => this.handleFit(3)} />
                          <span>Perfect</span>
                        </label>
                        <label>
                          <input name="Fit" type="radio" onChange={() => this.handleFit(4)} />
                          <span>Runs slightly long</span>
                        </label>
                        <label>
                          <input name="Fit" type="radio" onChange={() => this.handleFit(5)} />
                          <span>Runs long</span>
                        </label>
                      </div>
                      : null
                  }
                </div>
                <div id='review-input'>
                  <input value={this.state.email} onChange={this.handleEmail}
                    placeholder="Example: jackson11@email.com"></input>

                  <input onChange={this.handleNickname}
                    value={this.state.name} placeholder="Example: jackson11!"></input>

                  <textarea onChange={this.handleSummary} maxLength="60"
                    placeholder="Example: Best purchase ever!?"
                    value={this.state.summary}></textarea>

                  <textarea onChange={this.handleBody} value={this.state.body}
                    minLength="50" maxLength="1000"
                    placeholder="Why did you like the product or not?"></textarea>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div> : null
        }
      </div>
    )
  }
}

export default AddReview;