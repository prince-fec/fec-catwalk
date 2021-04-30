import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import noScroll from './window_functions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

var Comparison_Model = (props) => {
  var currentInfo;
  const [displayInfo, changeDisplay] = useState({});

  useEffect(() => {
    axios.get(`/products/:${props.displayedProduct.id}/info`)
      .then((response) => {
        fetchproduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  var fetchproduct = (data) => {
    changeDisplay(data);
  }



  if (Object.keys(displayInfo).length) {
    return (
      <div className="comparison-viewer" onClick={(e) => {
        // var noScroll = () => {
        //   window.scrollTo(0, 0);
        // }

        // DONT REMOVE THIS JUST YET
        // window.removeEventListener('scroll', noScroll.module());

        props.toggleComparison();
      }}>
        <div className="comparison-data">
          <h4 className="comparison-title">COMPARING</h4>
          <table className="comparison-table">
            <tbody>
              <tr className="comparison-table-names">
                <td className="comparison-table-display-product">{displayInfo.name}</td>
                <td></td>
                <td className="comparison-table-related-product">{props.relatedProduct.name}</td>
              </tr>
            </tbody>
          </table>

          <table className="comparison-info">
            <tbody>
              <tr className="comparison-info-table">
                <td className="comparison-info-display-product">{'$' + displayInfo.default_price.split('.').slice(0, 1).join('')}</td>
                <td className="comparison-info-feature">Price</td>
                <td className="comparison-info-related-product">{'$' + props.relatedProduct.default_price.split('.').slice(0, 1).join('')}</td>
              </tr>
              <tr className="comparison-info-table">
                <td className="comparison-info-display-product">{displayInfo.category}</td>
                <td className="comparison-info-feature">Category</td>
                <td className="comparison-info-related-product">{props.relatedProduct.category}</td>
              </tr>
              <tr className="comparison-info-table">
                <td className="comparison-info-display-product">{displayInfo.features[0].value}
                  <FontAwesomeIcon icon={faCheckSquare} />
                </td>
                <td className="comparison-info-feature">Material</td>
                <td className="comparison-info-related-product">{props.relatedProduct.features[0].value}</td>
              </tr>
              <tr className="comparison-info-table">
                <td className="comparison-info-display-product">{displayInfo.features[0].value}</td>
                <td className="comparison-info-feature">Cut</td>
                <td className="comparison-info-related-product">{props.relatedProduct.features[1].value || '---'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  };
  return null;
}

export default Comparison_Model;