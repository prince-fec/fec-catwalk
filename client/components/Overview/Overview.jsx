/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line no-unused-vars
// import css from './Overview.css'
import ImageDisplay from './ImageDisplay.jsx'
import ProductInfo from './ProductInfo.jsx'

import axios from 'axios';

class Overview extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      thumbnails: [],
      thumbnailsShown: [0, 7],
      styles: [],
      currentStyle: 0,
      currentThumbnail: 0,
      product: [],
      sku: '',
      extendedView: false
    }
    this.onArrowDownClick = this.onArrowDownClick.bind(this);
    this.onArrowUpClick = this.onArrowUpClick.bind(this);
    this.fetchThumbnails = this.fetchThumbnails.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.onArrowLeftClick = this.onArrowLeftClick.bind(this);
    this.onArrowRightClick = this.onArrowRightClick.bind(this);
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.handleMainImageClick = this.handleMainImageClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

// Arrow function account for only 14 icons - will need to adjust the logic for more item
  onArrowDownClick() {
    if (this.state.thumbnailsShown[1] < this.state.thumbnails.length) {
      const diff = this.state.thumbnails.length - this.state.thumbnailsShown[1];
      this.setState({
        thumbnailsShown: [this.state.thumbnailsShown[0] + 1, this.state.thumbnailsShown[1] + 1],
      })
    }
  }

  onArrowUpClick() {
    const diff = this.state.thumbnails.length - this.state.thumbnailsShown[0];
    if (this.state.thumbnailsShown[0] > 0) {
      this.setState({
        thumbnailsShown: [this.state.thumbnailsShown[0] - 1, this.state.thumbnailsShown[1] - 1],
      })
    }
  }

  onArrowLeftClick() {
    const { currentThumbnail } = this.state;
    const prevThumbnail = currentThumbnail - 1;
    if (currentThumbnail > 0) {
      this.setState({
        currentThumbnail: prevThumbnail
      })
    }
  }

  onArrowRightClick() {
    const { currentThumbnail, thumbnails } = this.state;
    const nextThumbnail = currentThumbnail + 1;
    if (currentThumbnail < thumbnails.length - 1) {
      this.setState({
        currentThumbnail: nextThumbnail
      })
    }
  }

  handleStyleClick(styleId) {
    // console.log(this.state.styles[styleId])
    this.setState({
      currentStyle: styleId,
      thumbnails: this.state.styles[styleId].photos
    })
  }

  handleThumbnailClick(id) {
    console.log(id)
    this.setState({
      currentThumbnail: id
    })
  }

  handleMainImageClick() {
    this.setState({
      extendedView: !this.state.extendedView
    }, () => console.log(this.state.extendedView))
  }

  fetchThumbnails() {
    axios.get(`/product/${this.props.product.id}/styles`)
      .then(response => {
        console.log(response.data.results)
        this.setState({
          styles: response.data.results,
          thumbnails: response.data.results[this.state.currentStyle].photos,
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.fetchThumbnails();
      this.setState({
        thumbnailsShown: [0, 7],
        currentStyle: 0,
        currentThumbnail: 0,
        extendedView: false
      })
    }
  }

  handleAddToCart(e, sku, quantity) {
    e.preventDefault();
    console.log(sku, quantity)
    axios.post('/cart', {sku}).then(() => {
      this.props.getCart()
    })
  }

  render() {
    const { thumbnails, thumbnailsShown, styles, currentStyle, currentThumbnail, extendedView } = this.state;
    const { product, productScore, numReviews } = this.props
    const { handleThumbnailClick, onArrowDownClick, onArrowLeftClick, onArrowRightClick, onArrowUpClick, handleStyleClick, handleAddToCart, handleMainImageClick } = this;
    const overviewProps = { thumbnails, thumbnailsShown, styles, currentStyle, currentThumbnail, handleThumbnailClick, onArrowDownClick, onArrowLeftClick, onArrowRightClick, onArrowUpClick, product, handleMainImageClick, extendedView }

    return product ?
    (
      <div className='overview-container'>
        <ImageDisplay {...overviewProps} />
        <ProductInfo averageScore={productScore} numReviews={numReviews} isExtendedView={extendedView} product={product} styles={styles} currentStyle={currentStyle} handleStyleClick={handleStyleClick} handleAddToCart={handleAddToCart}/>
        <div className='description-container'>
          <h4>{product.slogan}</h4>
          <h5>{product.description}</h5>
        </div>
      </div>
    )
    :
    (
    <div>
      <span>Sorry no products selected</span>
    </div>
    )
  }
}

export default Overview;