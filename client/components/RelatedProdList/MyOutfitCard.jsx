import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOutfitCard = (props) => {
  var { name, category, default_price, id } = props.product;
  var price = '$' + default_price.split('.').slice(0, 1).join('');
  // const { outfitDelete } = props;
  console.log(props);
  const [outfitList, loadOutfit] = useState([]);
  useEffect(() => {
    axios.get(`/product/${id}/styles`)
      .then((response) => {
        handleOutfit(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  var handleOutfit = (data) => {
    loadOutfit(data);
  }
  if (outfitList.length !== 0) {
    var default_url = outfitList.results[0].photos[0].thumbnail_url;
  } else {
    var default_url = undefined;
  }

  var thumb = <img src={default_url} className='related-card-visual-thumbnail' /> || <img alt="Image not found" className='related-card-visual-thumbnail' />
  return (
    <div className='card hvr-float'>
      <div className='related-card-visual'>
        <img src="https://img.icons8.com/fluent-systems-regular/48/000000/delete-forever.png" className='related-card-visual-star-default' alt="remove from list" onClick={(e) => {
          props.outfitDelete(id);
        }} />
        {thumb}
      </div>
      <div className='related-card-info'>
        <h4 className='related-card-info-category'>{category}</h4>
        <h3 className='related-card-info-name'>{name}</h3>
        {price}
        <img />
      </div>
    </div>
  )
}

export default MyOutfitCard;