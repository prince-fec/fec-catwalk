import React from 'react';
import axios from 'axios';

import QA from './QA/QA.jsx'
import Review from './Review.jsx'
//
import Overview from './Overview/Overview.jsx';
import RelProductList from './RelatedProdList/RelProductList.jsx';
import Navbar from './Navbar/Navbar.jsx'
// eslint-disable-next-line no-unused-vars

import Comparison_Model from './RelatedProdList/Comparison_Model.jsx';
// import css from './App_Style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: [],
      comparisonToggle: false,
      reviewCount: 0,
      averageScore: 0,
      cart: [],
      numItemsInCart: 0,
      theme_status: 'dark'
    }
    this.productStateChange = this.productStateChange.bind(this);
    this.comparisonToggle = this.comparisonToggle.bind(this);
    this.getScore = this.getScore.bind(this);
    this.fetchCart = this.fetchCart.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
  }

  createThemeSelector() {
    const LightTheme = React.lazy(() => import('./Light_Theme.jsx'))
    const DarkTheme = React.lazy(() => import('./Dark_Theme.jsx'))

    const CHOSEN_THEME = this.state.theme_status;
    const Theme = CHOSEN_THEME === 'light' ? <LightTheme /> : <DarkTheme />;


    const ThemeSelector = () => {
      return (
        <>
          <React.Suspense fallback={<></>}>
            {Theme}
          </React.Suspense>
        </>
      )
    }

    return ThemeSelector;
  }

  switchTheme() {
    var theme = this.state.theme_status === 'light' ? 'dark' : 'light';
    this.setState({
      theme_status: theme
    })
  }
  getScore(count, score) {
    this.setState({
      reviewCount: count,
      averageScore: score
    })
  }


  productStateChange(data) {
    this.setState({
      currentProduct: data[0]
    })
    this.fetchCart()
  }

  componentDidMount() {
    axios.get('/products')
      .then((response) => {
        this.productStateChange(response.data)
      });
    this.fetchCart()
  }

  fetchCart() {
    axios.get('/cart')
      .then((response) => {
        // console.log(response.data)
        this.setState({
          cart: response.data,
          numItemsInCart: response.data.length
        })
      })
  }

  comparisonToggle(relatedProduct) {
    // console.log(this.state.currentProduct);
    var status = !this.state.comparisonToggle ? <Comparison_Model toggleComparison={this.comparisonToggle} displayedProduct={this.state.currentProduct} relatedProduct={relatedProduct} /> : false;

    this.setState({
      comparisonToggle: status
    })
  }

  render() {
    var comparison = this.state.comparisonToggle ? this.state.comparisonToggle : <div></div>;

    var lightDarkBtn = this.state.theme_status === 'light' ? <button className='theme_control' onClick={this.switchTheme}>Light Mode</button> : <button className='theme_control' onClick={this.switchTheme}>Dark Mode</button>;
    var ThemeSelector = this.createThemeSelector();

    return (
      <main>
        <ThemeSelector />
        {comparison}
        <section aria-label="navbar">
          <Navbar numItemsInCart={this.state.numItemsInCart} themeButton={lightDarkBtn} id='navbar' />
        </section>
        <div className="product-page-viewer">
          <section aria-label="overview">
            <Overview productScore={this.state.averageScore} numReviews={this.state.reviewCount} getCart={this.fetchCart} id='overview' product={this.state.currentProduct} />
          </section>
          <section aria-label="related-products" id="lists">
            <RelProductList id="related-products" productId={this.state.currentProduct.id} toggleComparison={this.comparisonToggle} changePage={this.productStateChange} />
          </section>
          <section aria-label="questions and ratings">
            <QA id='qa' productId={this.state.currentProduct.id} name={this.state.currentProduct.name} />
            <Review id='review' item={this.state.currentProduct.id} getScore={this.getScore} />
          </section>
        </div>

      </main>
    )
  }
}

export default App;