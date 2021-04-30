/* eslint-disable react/prop-types */
import React from 'react';
import Thumbnail from './Thumbnail.jsx';
// eslint-disable-next-line no-unused-vars
import css from './Overview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import CursorZoom from 'react-cursor-zoom';

{/* <CursorZoom className='image-container__main-image' onClick={(e) => handleMainImageClick(e)} alt={product.name} image={{src: `${styles[currentStyle].photos[currentThumbnail].thumbnail_url}`, width: 400, height: 300}} zoomImage={{
        src: `${styles[currentStyle].photos[currentThumbnail].url}`,
        width: 1600,
        height: 1200
    }} /> */}

const ImageDisplay = ({ thumbnails, thumbnailsShown, styles, currentStyle, currentThumbnail, handleThumbnailClick, onArrowDownClick, onArrowLeftClick, onArrowRightClick, onArrowUpClick, product, handleMainImageClick, extendedView }) => {

  const placeholder = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'
  // styles[currentStyle]  && console.log(styles[currentStyle].photos)
  const addDefault = (ev) => {
    // console.log(ev)
    ev.target.src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'
  }
  const imageContainerClass = extendedView ? 'extended-image-container' : 'image-container';
  const leftRightIconClass = extendedView ? 'leftRightIcon-extended' : 'leftRightIcon'

  return (
    <div className={imageContainerClass}>
      {
        styles[currentStyle] ?
          <img className='image-container__main-image' onError={addDefault} onClick={(e) => handleMainImageClick(e)} alt={product.name} src={styles[currentStyle].photos[currentThumbnail].url || placeholder} />
          :
          <img alt='placeholder image' src={placeholder}
          />
      }
      <div className='image-container__thumbnail-container'>
        {
          thumbnailsShown[0] > 0 ?
            <FontAwesomeIcon className='image-container__arrow' onClick={() => onArrowUpClick()} icon={faArrowUp} /> :
            <div></div>
        }
        {
          thumbnails.slice(thumbnailsShown[0], thumbnailsShown[1]).map((thumb, idx) => {
            return <Thumbnail placeholder={placeholder} thumbnailIndex={idx} product={product} currentThumbnail={currentThumbnail} thumbnailClick={handleThumbnailClick} thumb={thumb} key={idx} />
          })
        }
        {
          thumbnailsShown[1] < thumbnails.length ?
            <FontAwesomeIcon className='image-container__arrow' onClick={() => onArrowDownClick()} icon={faArrowDown} /> :
            <div></div>
        }
      </div>
      <div className={leftRightIconClass}>
        {
          currentThumbnail > 0 ? <FontAwesomeIcon onClick={() => onArrowLeftClick()} className='leftArrow' icon={faAngleLeft} /> : <div></div>
        }

        {
          currentThumbnail < thumbnails.length - 1 ? <FontAwesomeIcon onClick={() => onArrowRightClick()} className='rightArrow' icon={faAngleRight} /> : <div></div>
        }

      </div>
    </div>
  )
}

export default ImageDisplay;