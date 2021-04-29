import React from 'react';
import axios from 'axios';
import Rating from 'react-star-ratings';


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
      allow: true,
      clicked: false,
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
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        productId: this.props.data
      })
      this.fetchMeta();
    }
  }

  fetchMeta() {
    axios.get(`/reviews/meta/${this.props.data}`)
      .then((response) => {
        this.setState({
          characteristics: response.data.characteristics,
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

  handleSize (value) {
    this.setState ({
      Size: value
    });
  }

  handleWidth (value) {
    this.setState ({
      Width: value
    });
  }

  handleComfort (value) {
    this.setState ({
      Comfort: value
    })
  }

  handleQuality (value) {
    this.setState ({
      Quality: value
    })
  }

  handleLength (value) {
    this.setState ({
      Length: value
    })
  }

  handleFit (value) {
    this.setState ({
      Fit: value
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

  handleSubmit (e) {
    if(this.state.body.length < 50) {
      this.setState({
        allow: false
      })
      alert('missing components')
    }
    const characteristics = {};
    for (var key in this.state.characteristics) {
      console.log(this.state.key, key)
      characteristics[this.state.characteristics[key].id] = this.state[key]
    }
    if (this.state.allow) {
      axios.post(`/reviews`, {
        product_id: Number(this.props.data),
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.name,
        email: this.state.email,
        photos: [],
        characteristics: characteristics,
      })
      this.handleClose();
    }
      e.preventDefault();

  }


  render() {
    return (
      <div id='write-review'>
        <button id='write' className='buttons' onClick={this.handleShow}>
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
                starRatedColor="black" changeRating={(rating) => this.handleRating(rating)}/>
                {
                  this.state.rating === 1?
                    <div id='rating-description'>Poor</div>
                  :null
                }
                {
                  this.state.rating === 2?
                  <div id='rating-description'>Fair</div>
                  :null
                }
                {
                  this.state.rating === 3?
                  <div id='rating-description'>Average</div>
                  :null
                }
                {
                  this.state.rating === 4?
                  <div id='rating-description'>Good</div>
                  :null
                }
                {
                  this.state.rating === 5?
                  <div id='rating-description'>Great</div>
                  :null
                }
                <div>
                  <div> Do you recommend this product?*</div>
                  <label>
                    <input name="Recommend" type="radio" onChange = {() =>  this.handleRecommend(true)}/>
                    <span>Yes</span>
                  </label>
                  <label>
                    <input name="Recommend" type="radio" onChange = {() =>  this.handleRecommend(false)}/>
                    <span>No</span>
                  </label>
                </div>
                {
                  this.state.characteristics.Size?
                    <div id='rate-size'>
                    <div>Size*</div>
                    <label>
                      <input name="Size" type="radio" onChange = {() =>  this.handleSize(1)}/>
                      <span>A size too small</span>
                    </label>
                    <label>
                      <input name="Size" type="radio" onChange = {() =>  this.handleSize(2)}/>
                      <span>½ a size too small</span>
                    </label>
                    <label>
                      <input name="Recommend" type="radio" onChange={() => this.handleRecommend(true)} />
                      <span>Yes</span>
                    </label>
                    <label>
                      <input name="Recommend" type="radio" onChange={() => this.handleRecommend(false)} />
                      <span>No</span>
                    </label>
                  </div>
                  :null
                }
                {
                  this.state.characteristics.Width?
                    <div id='rate-width'>
                      <label>
                        <div>Width*</div>
                        <input name="Width" type="radio" onChange = {() =>  this.handleWidth(1)}/>
                        <span>Too narrow</span>
                      </label>
                      <label>
                        <input name="Width" type="radio" onChange = {() =>  this.handleWidth(2)}/>
                        <span>Slightly Narrow</span>
                      </label>
                      <label>
                        <input name="Width" type="radio" onChange = {() =>  this.handleWidth(3)}/>
                        <span>Perfect</span>
                      </label>
                      <label>
                        <input name="Width" type="radio" onChange = {() =>  this.handleWidth(4)}/>
                        <span>Slightly wide</span>
                      </label>
                      <label>
                        <input name="Width" type="radio" onChange = {() =>  this.handleWidth(5)}/>
                        <span>Too wide</span>
                      </label>
                    </div>
                    :null
                }
                {
                  this.state.characteristics.Comfort?
                    <div id='rate-comfort'>
                      <label>
                        <div>Comfort*</div>
                        <input name="Comfort" type="radio" onChange = {() =>  this.handleComfort(1)}/>
                        <span>Uncomfortable</span>
                      </label>
                      <label>
                        <input name="Comfort" type="radio" onChange = {() =>  this.handleComfort(2)}/>
                        <span>Slightly Uncomfortable</span>
                      </label>
                      <label>
                        <input name="Comfort" type="radio" onChange = {() =>  this.handleComfort(3)}/>
                        <span>Ok</span>
                      </label>
                      <label>
                        <input name="Comfort" type="radio" onChange = {() =>  this.handleComfort(4)}/>
                        <span>Comfortable</span>
                      </label>
                      <label>
                        <input name="Comfort" type="radio" onChange = {() =>  this.handleComfort(5)}/>
                        <span>Perfect</span>
                      </label>
                    </div>
                  :null
                }
                {
                  this.state.characteristics.Quality?
                    <div id='rate-quality'>
                    <label>
                      <div>Quality*</div>
                      <input name="Quality" type="radio" onChange = {() =>  this.handleQuality(1)}/>
                      <span>Poor</span>
                    </label>
                    <label>
                      <input name="Quality" type="radio" onChange = {() =>  this.handleQuality(2)}/>
                      <span>Below average</span>
                    </label>
                    <label>
                      <input name="Quality" type="radio" onChange = {() =>  this.handleQuality(3)}/>
                      <span>What I expected</span>
                    </label>
                    <label>
                      <input name="Quality" type="radio" onChange = {() =>  this.handleQuality(4)}/>
                      <span>Pretty great</span>
                    </label>
                    <label>
                      <input name="Quality" type="radio" onChange = {() =>  this.handleQuality(5)}/>
                      <span>Perfect</span>
                    </label>
                    </div>
                  :null
                }
                {
                  this.state.characteristics.Length?
                    <div id='rate-length'>
                    <label>
                      <div>Length*</div>
                      <input name="Length" type="radio" onChange = {() =>  this.handleLength(1)}/>
                      <span>Runs Short</span>
                    </label>
                    <label>
                      <input name="Length" type="radio" onChange = {() =>  this.handleLength(2)}/>
                      <span>Runs slightly short</span>
                    </label>
                    <label>
                      <input name="Length" type="radio" onChange = {() =>  this.handleLength(3)}/>
                      <span>Perfect</span>
                    </label>
                    <label>
                      <input name="Length" type="radio" onChange = {() =>  this.handleLength(4)}/>
                      <span>Runs slightly long</span>
                    </label>
                    <label>
                      <input name="Length" type="radio" onChange = {() =>  this.handleLength(5)}/>
                      <span>Runs long</span>
                    </label>
                    </div>
                  :null
                }
                {
                  this.state.characteristics.Fit?
                    <div id='rate-fit'>
                    <label>
                      <div>Fit*</div>
                      <input name="Fit" type="radio" onChange = {() =>  this.handleFit(1)}/>
                      <span>Runs tight</span>
                    </label>
                    <label>
                      <input name="Fit" type="radio" onChange = {() =>  this.handleFit(2)}/>
                      <span>Runs slightly tight</span>
                    </label>
                    <label>
                      <input name="Fit" type="radio" onChange = {() =>  this.handleFit(3)}/>
                      <span>Perfect</span>
                    </label>
                    <label>
                      <input name="Fit" type="radio" onChange = {() =>  this.handleFit(4)}/>
                      <span>Runs slightly long</span>
                    </label>
                    <label>
                      <input name="Fit" type="radio" onChange = {() =>  this.handleFit(5)}/>
                      <span>Runs long</span>
                    </label>
                    </div>
                  :null
                }
                </div>
                <div id='review-input'>

                <div>Your Email*</div>
                <input id='email-field' value = {this.state.email}
                maxLength="60" onChange={this.handleEmail}
                placeholder="Example: jackson11@email.com"></input>
                <div id='email-reasons'>For authentication reasons, you will not be emailed</div>

                <div>Your Username*</div>
                <input id='username-field' onChange={this.handleNickname} maxLength="60"
                value = {this.state.name} placeholder="Example: jackson11!"></input>

                <div>Review Summary*</div>
                <textarea id='summary-field' onChange={this.handleSummary} maxLength="60"
                placeholder="Example: Best purchase ever!?"
                value = {this.state.summary}></textarea>

                <div>Review Body*</div>
                <textarea id='body-field' onChange={this.handleBody} value={this.state.body}
                minLength="50" maxLength="1000"
                placeholder="Why did you like the product or not?"></textarea>
                  {
                    this.state.body.length < 50?
                    <div id='word-count'>
                      Minimum required characters left: {50 - this.state.body.length}
                    </div>
                    :null
                  }
                  {
                    this.state.body.length > 49?
                    <div id='word-count'>
                      Minimum reached
                    </div>
                    :null
                  }
                   <button id='form-submit' type="submit" onClick={this.handleSubmit}>Submit</button>
                </div>
              </form>
            </div> : null
        }
      </div>
    )
  }
}

export default AddReview;