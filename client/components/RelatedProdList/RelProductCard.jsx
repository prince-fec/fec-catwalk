import React from 'react';
import axios from 'axios';
import noScroll from './window_functions.js';

class RelProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleList: [],
      currentStyle: {},
      styleAvg: 0,
      remainingSeconds: 10,
      pending: false,
      error: null
    }
  }
  // var defaultStyle =
  handleUpdate(id) {
    axios.get(`/product/${id}/styles`)
      .then((response) => {
        this.setState({
          styleList: response.data,
          currentStyle: response.data.results[0],
          thumbnailImg: response.data.results[0].photos[0].url
        })
        return;
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`/reviews/${id}`)
      .then((response) => {
        var avg = 0;
        if (response.data.results.length === 0) {
          return 0;
        } else {
          var counter = 0;
          response.data.results.forEach((review) => {
            avg += review.rating;
            counter++;
          })
          return avg = avg / counter;
        }
      })
      .then((result) => {
        this.setState({
          styleAvg: result
        })
      })
      .catch((err) => { console.log(err) });
  }

  componentDidUpdate(prevProps) {

    // console.log(prevProps.product.id);
    if (prevProps.product.id !== this.props.product.id) {
      this.handleUpdate(this.props.product.id);
    }
  }

  componentDidMount() {
    axios.get(`/product/${this.props.product.id}/styles`)
      .then((response) => {

        this.setState({
          styleList: response.data.results,
          currentStyle: response.data.results[0],
          thumbnailImg: response.data.results[0].photos[0].url
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    var { name, category, default_price } = this.props.product;
    var { sale_price } = this.state.currentStyle;

    // price display
    default_price = '$' + default_price.split('.').slice(0, 1).join('');
    if (sale_price) {
      sale_price = '$' + sale_price.split('.').slice(0, 1).join('')
    }

    var saleElement = <p className='related-card-info-default-sale'>{this.state.currentStyle.sale_price}</p>
    var defPriceElement = <p className='related-card-info-default-price'>{default_price}</p>

    // Display conditions
    var price = !this.state.currentStyle.sale_price ? defPriceElement : saleElement;
    var thumb = this.state.thumbnailImg ? <img src={this.state.thumbnailImg} alt={this.state.currentStyle.name} className='related-card-visual-thumbnail' /> : <img className='related-card-visual-thumbnail' src={`https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081`} alt={this.state.currentStyle.name} />;

    var roundedAvg = this.state.styleAvg - Math.floor(this.state.styleAvg)
    var review = this.state.styleAvg === 0 ? <h4 className='card-review'>No Reviews</h4> : <h4 className='card-review'>Review: {Math.round(this.state.styleAvg)}/5</h4>

    return (
      <div className='card hvr-float'>
        <div className='related-card-visual' onClick={(e) => {
          // DONT REMOVE THIS
          // var y_axis = window.scrollY;
          // console.log(noScroll.module());
          // window.addEventListener('scroll', noScroll.module());
          this.props.toggleComparison(this.props.product, this.state.currentStyle);
        }}>
          <img className='related-card-visual-star-default' src="https://img.icons8.com/windows/32/000000/star--v1.png" alt="compare products" />
          {thumb}
        </div>
        <div className='related-card-info'>
          <h4 className='related-card-info-category'>{category}</h4>
          <h3 className='related-card-info-name' onClick={(e) => {
            window.scrollTo(0, 0);
            this.props.changePage([this.props.product]);
          }}>{name}</h3>
          {price}
          {review}
        </div>
      </div>
    )
  }
}

export default RelProductCard;