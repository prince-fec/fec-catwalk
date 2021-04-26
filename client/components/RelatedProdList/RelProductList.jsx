import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import RelProductCard from './RelProductCard.jsx';
import MyOutfitCard from './MyOutfitCard.jsx';
import css from './Related_Outfit.css';

class RelProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rel_products: [],
      outfit_products: []
    }
  }

  arrowHandler(direction, list_type, left, right) {
    var view = $("." + list_type);
    var sliderLimit = parseInt($('.list-content').css('width'));
    // var sliderLimit = -500;
    sliderLimit = sliderLimit - (sliderLimit * 2);
    var move = sliderLimit * -.15;
    move = move.toString();
    var currentPosition = parseInt(view.css("left"));
    if (direction === 'right') {
      // DO NOT DELETE PLS
      // if (currentPosition === sliderLimit) {
      //   $('.' + right).css('display', 'none');
      //   $('.' + left).css('display', 'block');
      // }
      if (currentPosition >= sliderLimit / 3) {
        view.stop(false, true).animate({ left: "-=" + move }, { duration: 400 });
      }
    } else {
      console.log('Slider: ', sliderLimit);
      // DO NOT DELETE PLS
      // if (currentPosition === 0) {
      //   $('.' + left).css('display', 'none');
      //   $('.' + right).css('display', 'block');
      // }
      if (currentPosition < 0) {
        view.stop(false, true).animate({ left: "+=" + move }, { duration: 400 });
      }
    }
  }

  handleRelatedProductUpdates(id) {
    axios.get(`/products/${id}/related`)
      .then((response) => {
        // console.log(response.data);
        $('.related-list').animate({ left: '0' }, { duration: 400 });
        this.setState({
          rel_products: response.data
        })
      })
  }

  handleOutfitProductUpdates(list) {
    console.log(list);
    $('.outfit-list').animate({ left: '0' }, { duration: 400 });
    this.setState({
      outfit_products: list
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.handleRelatedProductUpdates(this.props.productId);
      axios.get(`/products/outfits`)
        .then((response) => {
          this.handleOutfitProductUpdates(response.data);
        })
    }
  }
  componentDidMount() {
    this.setState({
      rel_products: []
    })
  }
  render() {

    return (
      <>
        <div className='view'>
          <h2>Related Products</h2>
          <img className='list-arrows related-arrows__left hvr-backward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" onClick={(e) => {
            this.arrowHandler('left', 'related-list', 'related-arrows__left', 'related-arrows__right');
          }} />
          <div className='list related-list'>
            <div className='list-content'>
              {
                this.state.rel_products.map((product, i) => {
                  return <RelProductCard key={i} product={product} toggleComparison={this.props.toggleComparison} changePage={this.props.changePage} />;
                })
              }
            </div>
          </div>
          <img className='list-arrows related-arrows__right hvr-forward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" onClick={(e) => {
            this.arrowHandler('right', 'related-list', 'related-arrows__left', 'related-arrows__right');
          }} />
        </div>
        <div className='view'>
          <h2>My Outfits</h2>
          <img className='list-arrows outfit-arrows__left hvr-backward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" onClick={(e) => {
            this.arrowHandler('left', 'outfit-list', 'outfit-arrows__left', 'outfit-arrows__right');
          }} />
          <div className='list outfit-list'>
            <div className='list-content'>

              <div className='card outfit-card hvr-float'>
                <div className='outfit-add' onClick={(e) => {
                  axios.post(`/products/${this.props.productId}/outfits`)
                    .then((response) => {
                      this.handleOutfitProductUpdates(response.data);
                    })
                }}>
                  <img src="https://img.icons8.com/carbon-copy/100/000000/plus-2-math.png" className='outfit-add-img' />
                  <h4 className='outfit-add-desc'>Add To Outfits</h4>
                </div>
              </div>
              {
                this.state.outfit_products.map((product, i) => {
                  return <MyOutfitCard key={i} product={product} />;
                })
              }
            </div>
          </div>
          <img className='list-arrows outfit-arrows__right hvr-forward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" onClick={(e) => {
            this.arrowHandler('right', 'outfit-list', 'outfit-arrows__left', 'outfit-arrows__right');
          }} />
        </div>
      </>
    )
  }
}



export default RelProductList;