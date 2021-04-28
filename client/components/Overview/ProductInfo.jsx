/* eslint-disable react/prop-types */
import React from 'react';
import Rating from 'react-star-ratings';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      size: '',
      totalQuantity: '',
      selectedQuantity: 0,
      currentSku: '',
      isDisabled: true,
      forgotSize: false,
      numberOfItemsInStock: 0
    }


    this.sizeSelect = React.createRef();
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStyle !== this.props.currentStyle) {
      this.setState({
        quantity: this.props.styles[this.props.currentStyle].skus.quantity,
        size: '',
        selectedQuantity: '-',
        totalQuantity: 0,
      })

    }
  }

  handleSizeChange(e) {
    const { styles, currentStyle } = this.props;
    let cur;
    if (e.target.value === '') {
      cur = Object.entries(styles[currentStyle].skus).filter(([, entry]) => {
        return entry.size === ''
      })
      this.setState({
        // isDisabled: true,
        size: 'Select Size',
      })
    } else {
      cur = Object.entries(styles[currentStyle].skus).filter(([, entry]) => {
        return entry.size === e.target.value
      })
      const currentSku = cur[0][0];
      this.setState({
        size: e.target.value,
        totalQuantity: cur[0][1].quantity,
        selectedQuantity: 1,
        currentSku: currentSku,
        isDisabled: false,
        forgotSize: false
      })
    }
  }

  clickEvent(e) {
    e.preventDefault()
    const { currentSku, selectedQuantity } = this.state
    this.sizeSelect.current.focus()
    // this.sizeSelect.current.keydown()
    if (this.state.size && this.state.size !== 'Select Size') {
      this.props.handleAddToCart(e, currentSku, selectedQuantity)
    } else {
      this.setState({
        forgotSize: true
      })
    }
  }

  handleQuantityChange(e) {
    this.setState({
      selectedQuantity: e.target.value,
    })

    if (e.target.value) {
      this.setState({
        isDisabled: false
      })
    }
    if (!e.target.value) {
      this.setState({
        isDisabled: true
      })
    }
  }

  render() {
    const { product, styles, currentStyle, handleStyleClick, isExtendedView, numReviews} = this.props;
    const { name, default_price, category } = this.props.product
    const { isDisabled, totalQuantity } = this.state;
    const buttonClass = isDisabled ? 'checkout-input' : 'hvr-back-pulse checkout-input'
    const forgotSize = this.state.forgotSize ? 'forgotSize' : 'hidden-button'
    const productInformationClass = isExtendedView ? 'prod-info-extended' : 'product-information';
    let count = 0;
    const styleDropdown = styles[currentStyle] && Object.entries(styles[currentStyle].skus).filter(([, entry]) => entry.size !== 0).map(([key, entry]) => {
      count+=entry.quantity
      return <option key={key} value={entry.size}>{entry.size}</option>
    })
    return product && styles[currentStyle] ?
    (
      <div className={productInformationClass}>
        {/* Social Media buttons */}
        <div className='product-information__social-buttons'>
          <h5>SHARE</h5>
          <a
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Hello%20world">
            <i> </i>
             Tweet
          </a>
          <a
          className="facebook-share-button"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">
            <i> </i>
             Post
          </a>
          <a
          className="pinterest-share-button"
          href="https://www.pinterest.com/pin/create/button/">
             Pinterest
          </a>
          {/* Product information */}
        </div>
        <h5>Read all <a style={{color: 'grey'}} href='#review-container'>{numReviews || 0}</a> reviews</h5>
        <Rating rating={this.props.averageScore} numberOfStars={5}
        starSpacing="3px" starDimension="15px" starRatedColor='black'/>
        <h5>{category}</h5>
        <h3>{name}</h3>
        {/* Conditionally rendering prices based on whether or not there is a sale */}
        <div>
          {
          styles[currentStyle].sale_price ?
          <div id='product-information__prices'>
            <p id='old-price'>{styles[currentStyle].original_price}</p>
            <p>{styles[currentStyle].sale_price}</p>
          </div>
          :
          styles[currentStyle].original_price || default_price
          }
        </div>
        {/* Current style */}
        <h5>STYLE &gt; {styles[currentStyle].name || 'Loading...'}</h5>
        {/* Rendering the styles that are available for each product */}
        <div className='styles-container'>
          {
            styles.map((style, idx) => {
              return(
                <div className='styles-container__style' key={style.style_id}>

                  <div className='checkmark'>{
                    currentStyle === idx ? <>&#10003;</> : <></>
                  }</div>
                  {
                    style.photos[0].thumbnail_url ?
                    <>
                    <img className='styles__photo hvr-glow' alt='' onClick={() => handleStyleClick(idx)} src={style.photos[0].thumbnail_url}></img>
                    <h5 onClick={() => handleStyleClick(idx)} >{style.name}</h5>
                    </>
                    :
                    <div className='styles__photo hvr-glow' onClick={() => handleStyleClick(idx)}>
                      <h5 onClick={() => handleStyleClick(idx)} >{style.name}</h5>
                    </div>
                  }

                </div>

              )
              // <img className='styles__photo' key={style.style_id} alt={style.name} src={style.photos[0].thumbnail_url} />
            })
          }
        </div>
        <div className='checkout-buttons'>
        <form onSubmit={(e) => this.clickEvent(e)}>
              <h6 className={forgotSize}>Please Select a Size</h6>
          <div className='input-container'>
            <select className='checkout-input hvr-glow' ref={this.sizeSelect} value={this.state.size} onChange={(e) => this.handleSizeChange(e)}>
              {count ? <option value=''>Select Size</option> : <option value=''>OUT OF STOCK</option>}
              {
                styleDropdown
              }
            </select>
            <select className='checkout-input hvr-glow' value={this.state.selectedQuantity} onChange={e => this.handleQuantityChange(e)}>
              <option value=''>-</option>
              {
                this.state.totalQuantity ? [...Array(this.state.totalQuantity - 1)].map((el, idx) => {
                  return <option key={idx}>{idx + 1}</option>
                })
                : <option>No Results</option>
              }
            </select>
            {totalQuantity ? <button onClick={this.clickEvent} className={buttonClass} type="submit" value="Add to Cart">Add To Cart</button> : <button className={buttonClass} style={{visibility: 'hidden'}}></button> }
          </div>
        </form>
        </div>
      </div>
    )
    :
    (
      <div>loading products</div>
    )
  }
}

export default ProductInfo;