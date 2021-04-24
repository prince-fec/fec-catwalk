import React from 'react';
import QA from './QA.jsx'
import QuestionBar from './QuestionBar.jsx'
import Review from './Review.jsx'
//
import Overview from './Overview/Overview.jsx';
import RelProductList from './RelatedProdList/RelProductList.jsx';

import axios from 'axios';
import Comparison_Model from './RelatedProdList/Comparison_Model.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: [],
      comparisonToggle: false,
      reviewCount: 0,
      averageScore: 0
    }
    this.productStateChange = this.productStateChange.bind(this);
    this.comparisonToggle = this.comparisonToggle.bind(this);
    this.getScore = this.getScore.bind(this);
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
  }

  componentDidMount() {
    axios.get('/products')
      .then((response) => {
        this.productStateChange(response.data)
      });
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
    return (
      <main>
        {comparison}
        <div className="product-page-viewer">
          <section aria-label="overview">
            <Overview id='overview' product={this.state.currentProduct} />
          </section>
          <section aria-label="related-products">
            <RelProductList id="related-products" productId={this.state.currentProduct.id} toggleComparison={this.comparisonToggle} />
          </section>
          <section aria-label="questions and ratings">
            <QA id='qa' />
            <QuestionBar id="question-bar" />
            <Review item={this.state.currentProduct.id} getScore={this.getScore}/>
          </section>
        </div>
      </main>
    )
  }
}

export default App;