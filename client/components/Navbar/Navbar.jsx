import React from 'react';
import withClick from './../HOC/WithClick.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line no-unused-vars
import css from './Navbar.css'

// eslint-disable-next-line react/prop-types
const Navbar = ({ numItemsInCart, themeButton }) => (
  <div className='navbar-container'>
    <img alt='catwalk logo' src='./../../../assets/Catwalk.svg'></img>
    {themeButton}
    <div>
      <div id='cart-container'>
        <FontAwesomeIcon id='bag-icon' icon={faShoppingBag} />
        <div id='num-items'>{numItemsInCart}</div>
      </div>
    </div>
  </div>
)

export default withClick(Navbar);