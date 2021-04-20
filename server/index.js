const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const requests = require('../axios-prefilter.js');

const port = 3000;

app.use(express.static(path.join(__dirname, '..')));

// app.use('/', (req, res) => {
//   res.render('index.html')
// })

app.get('/products', (req, res) => {
  // res.sendStatus(200);
  axios.get(requests.products)
    .then((response) => {
      res.send(response.data)
    });
})

app.get('/product/:productId/styles', (req, res) => {
  //styles
  axios.get(`${requests.products}/${req.params.productId}/styles`)
    .then((response) => {
      res.json(response.data)
    })
})

app.get('/qa/questions/:product_id/:count', (req, res)=> {
  //questions
  axios.get(`${requests.questions}?product_id=${req.params.product_id}&count=${req.params.count}`)
    .then((response) => {
      var sorted = response.data.results.sort(function(a, b){
        return b.question_helpfulness - a.question_helpfulness
      })
      res.json(sorted)
    })
    .catch((err) => {
      console.log('Error with Questions get request' + err)
      res.end()
    })
})

app.get('/qa/answers/:question_id/answers', (req, res) => {
  //answers
  axios.get(`${requests.questions}/${req.params.question_id}/answers`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err)=> {
      console.log('Error with Answers get request' + err)
      res.end();
    })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`${requests.questions}/${req.params.question_id}/helpful`)
    .then((response) => {
      console.log('success')
      res.end()
    })
    .catch((err) => {
      console.log('error')
      res.end(err)
    })
})
app.get('/products/:product_id/related', (req, res) => {

  console.log(req.params);
  // res.sendStatus(200);
  axios.get(`${requests.products}/${req.params.product_id}/related`)
    .then((data) => {
      var arr = [];
      console.log(data.data);
      data.data.forEach((id) => {
        axios.get(`${requests.products}/${id}/styles`)
          .then((response) => {
            arr.push(response.data);
            if (arr.length === data.data.length) {
              res.json(arr);
            }
          })
      })
    })
    .catch((err) => {
      console.log(err);
    })

})

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});