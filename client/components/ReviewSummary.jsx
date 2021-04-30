import React from 'react';
import axios from 'axios';
import Rating from 'react-star-ratings';
// import Chart from 'Chart.js';
import Star from './RatingStar.jsx';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meta: [],
      productId: '',
      scoreCounts: {},
      characteristics: {},
      score: 0,
      scoresCount: 0

    }
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
        console.log(response)
        this.setState({
          meta: response.data,
          scoreCounts: response.data.ratings,
          characteristics: response.data.characteristics
        })
        this.props.getScore(this.state.scoresCount, this.state.score);
        var completeScore = this.state.scoreCounts;
        for (var i = 1; i < 6; i++) {
          if (this.state.scoreCounts[i] === undefined) {
            completeScore[i] = 0;
          } else {
            completeScore[i] = parseInt(completeScore[i])
          }
        }
        this.setState ({
          scoreCounts: completeScore
        })
      })
      .catch((err) => [
        console.log(err)
      ])
  }


  render() {
    var starScore = 0;
    var score = 0;
    var ratings = this.state.meta.ratings;
    var scoreCount = 0;
    for (var key in ratings) {
      score += (key * ratings[key]);
      scoreCount += parseInt(ratings[key]);
    }
    score /= scoreCount;
    if (!isNaN(score)) {
      this.state.score = score;
      this.state.scoresCount = scoreCount;
    }

    var recommendations = this.state.meta.recommended;
    var trueCount = 0;
    var recInPercentage = '';
    var recCount = 0;
    for (var key in recommendations) {
      if (key == 'true') {
        trueCount += parseInt(recommendations[key]);
      }
      recCount += parseInt(recommendations[key]);
    }
    trueCount *= 100 / recCount;


    const isSize = this.state.characteristics.Size;
    const isWidth = this.state.characteristics.Width;
    const isComfort = this.state.characteristics.Comfort;
    const isQuality = this.state.characteristics.Quality;
    const isLength = this.state.characteristics.Length;
    const isFit = this.state.characteristics.Fit;

    let size, width, comfort, quality, length, fit;

    if (isSize) {
      size = <div id='measurement'>
        Size
        <div id='measure-average'style={{"margin-left" : `${((isSize.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
          <div id='desc' style={{"margin-right" : `24px`}}>A size too small</div>
          <div id='desc' style={{"margin-right" : `38px`}}>Perfect</div>
          <div id='desc'>A size too big</div>
        </div>
      </div>
    }
    if (isWidth) {
      width = <div id='measurement'>
        Width
        <div id='measure-average'style={{"margin-left" : `${((isWidth.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
          <div id='desc' style={{"margin-right" : `51px`}}>Too narrow</div>
          <div id='desc' style={{"margin-right" : `65px`}}>Perfect</div>
          <div id='desc'>Too wide</div>
        </div>
      </div>
    }
    if (isComfort) {
      comfort = <div id='measurement'>
        Comfort
        <div id='measure-average'style={{"margin-left" : `${((isComfort.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
          <div id="desc" style={{"margin-right": "42px"}}>Uncomfortable</div>
          <div id="desc" style={{"margin-right": "87px"}}>Ok</div>
          <div id="desc" style={{"margin-right": "35px"}}>Perfect</div>
        </div>
      </div>
    }
    if (isQuality) {
      quality = <div id='measurement'>
        Quality
        <div id='measure-average'style={{"margin-left" : `${((isQuality.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
          <div id='desc' style={{"margin-right" : `63px`}}>Poor</div>
          <div id='desc' style={{"margin-right" : `20px`}}>What I expected</div>
          <div id='desc'>Pretty great</div>
        </div>
      </div>
    }
    if (isLength) {
      length = <div id='measurement'>
        Length
        <div id='measure-average'style={{"margin-left" : `${((isLength.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
          <div id='desc' style={{"margin-right" : `50px`}}>Runs short</div>
          <div id='desc' style={{"margin-right" : `57px`}}>Perfect</div>
          <div id='desc'>Runs long</div>
        </div>
      </div>
    }
    if (isFit) {
      fit = <div id='measurement'>
        Fit
        <div id='measure-average'style={{"margin-left" : `${((isFit.value/5)*270)}px`}}></div>
        <div id='measurement-bars'>
          <div id='bars'></div>
          <div id='bars'></div>
          <div id='bars'></div>
        </div>
        <div id='measurement-desc'>
        <div id='desc' style={{"margin-right" : `50px`}}>Runs tight</div>
          <div id='desc' style={{"margin-right" : `57px`}}>Perfect</div>
          <div id='desc'>Runs long</div>
        </div>
      </div>
    }
    // var score5 = (this.state.scoreCounts[5] || 0) / scoreCount;
    var score5 = ((this.state.scoreCounts[5] || 0) / scoreCount) || 0;

    var score4 = ((this.state.scoreCounts[4] || 0) / scoreCount) || 0;

    var score3 = ((this.state.scoreCounts[3] || 0) / scoreCount) || 0;
    var score2 = ((this.state.scoreCounts[2] || 0) / scoreCount) || 0;
    var score1 = ((this.state.scoreCounts[1] || 0) / scoreCount) || 0;

    return (
      <div id='review-container'>
        <div id='review-summary'>
        <h3>Ratings {'&'} Review</h3>
        <h1 id='average-score'><div id='average'>{score.toFixed(2)|| 0}</div>
        <div id='star-rating'><Star rating={score.toFixed(2)}/></div>
        </h1>
        <p id='recommendations'>{trueCount.toFixed(0)}% of reviews recommend this product</p>
        <div id='star-counts'>
          <div id='score-count'>
            <div id='score-category'>5 stars
            <div id='score-5-above'style={{"width" : `${parseInt(score5*300)}px`}}></div>
            <div id='score-below'></div>
            </div>
          </div>
          <div id='score-count'>
          <div id='score-category'>4 stars</div>
            <div id='score-4-above'style={{"width" : `${parseInt(score4*300)}px`}}></div>
            <div id='score-below'></div>
          </div>
          <div id='score-count'>
          <div id='score-category'>3 stars</div>
            <div id='score-3-above'style={{"width" : `${parseInt(score3*300)}px`}}></div>
            <div id='score-below'></div>
          </div>
          <div id='score-count'>
          <div id='score-category'>2 stars</div>
            <div id='score-2-above'style={{"width" : `${parseInt(score2*300)}px`}}></div>
            <div id='score-below'></div>
          </div>
          <div id='score-count'>
          <div id='score-category'>1 stars</div>
            <div id='score-1-above'style={{"width" : `${parseInt(score1*300)}px`}}></div>
            <div id='score-below'></div>
          </div>
        </div>
        <div id ='measurements'>
          <div>{size}</div>
          <div>{width}</div>
          <div>{comfort}</div>
          <div>{quality}</div>
          <div>{length}</div>
          <div>{fit}</div>
        </div>
        </div>
      </div>
    )
  }
}

export default ReviewSummary;
