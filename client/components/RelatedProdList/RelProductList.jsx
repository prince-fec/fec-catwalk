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
    this.handleOutfitDelete = this.handleOutfitDelete.bind(this);
  }

  arrowHandler(direction, list_type, left, right) {
    var view = $("." + list_type);
    var sliderLimit = parseInt($('.list-content').css('width'));
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
        $('.related-list').animate({ left: '0' }, { duration: 400 });
        this.setState({
          rel_products: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleOutfitProductUpdates(list) {
    $('.outfit-list').animate({ left: '0' }, { duration: 400 });
    this.setState({
      outfit_products: list
    })
  }

  handleOutfitDelete(id) {
    axios.delete(`/products/${id}/outfits`)
      .then((response) => {
        this.handleOutfitProductUpdates(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDuplication(array) {
    var duplications = {};
    return array.filter((item, i) => {
      if (!duplications[item.id]) {
        duplications[item.id] = 1;
        return true;
      } else {
        return false;
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    prevState = JSON.stringify(prevState);
    var currentState = JSON.stringify(this.state);
    if (prevProps.productId !== this.props.productId) {
      this.handleRelatedProductUpdates(this.props.productId);
      axios.get(`/products/outfits`)
        .then((response) => {
          this.handleOutfitProductUpdates(response.data);
        }).catch((err) => {
          console.log(err);
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
          <img className='list-arrows related-arrows__left hvr-backward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" alt="left arrow" onClick={(e) => {
            this.arrowHandler('left', 'related-list', 'related-arrows__left', 'related-arrows__right');
          }} />
          <div className='list related-list'>
            <div className='list-content'>
              {
                this.handleDuplication(this.state.rel_products).map((product, i) => {
                  return <RelProductCard key={product.name} product={product} toggleComparison={this.props.toggleComparison} changePage={this.props.changePage} />;
                })
              }
            </div>
          </div>
          <img className='list-arrows related-arrows__right hvr-forward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" alt="right arrow" onClick={(e) => {
            this.arrowHandler('right', 'related-list', 'related-arrows__left', 'related-arrows__right');
          }} />
        </div>
        <div className='view'>
          <h2>My Outfits</h2>
          <img className='list-arrows outfit-arrows__left hvr-backward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" alt="left arrow" onClick={(e) => {
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
                    .catch((err) => {
                      console.log(err);
                    });
                }}>
                  <img src="https://img.icons8.com/carbon-copy/100/000000/plus-2-math.png" className='outfit-add-img' alt='add to outfit' />
                  <h4 className='outfit-add-desc'>Add To Outfits</h4>
                </div>
              </div>
              {
                this.state.outfit_products.map((product, i) => {
                  return <MyOutfitCard key={i} product={product} outfitDelete={this.handleOutfitDelete} />;
                })
              }
            </div>
          </div>
          <img className='list-arrows outfit-arrows__right hvr-forward' src="https://img.icons8.com/pastel-glyph/64/000000/forward.png" alt="right arrow" onClick={(e) => {
            this.arrowHandler('right', 'outfit-list', 'outfit-arrows__left', 'outfit-arrows__right');
          }} />
        </div>
      </>
    )
  }
}

export default RelProductList;