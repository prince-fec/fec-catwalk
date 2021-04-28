const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const requests = require('../axios-prefilter.js');
const bodyParser = require('body-parser');
app.use(bodyParser())
const helperfunction = require('./helperfunction.js');


const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));
app.use(bodyParser.urlencoded({ extended: true }));

const tempOutfitList = [];

app.get('/products', (req, res) => {
  // res.sendStatus(200);
  axios.get(requests.products)
    .then((response) => {
      res.send(response.data)
      console.log(response.data)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/product/:productId/styles', (req, res) => {
  //styles
  axios.get(`${requests.products}/${req.params.productId}/styles`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/qa/questions/:product_id/:count', (req, res) => {
  //questions
  axios.get(`${requests.questions}?product_id=${req.params.product_id}&count=${req.params.count}`)
    .then((response) => {
      var sorted = response.data.results.sort(function (a, b) {
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
      res.json(helperfunction.sortAnswer(response.data.results));
    })
    .catch((err) => {
      console.log('Error with Answers get request' + err)
      res.end();
    })
})
app.get('/reviews/:product_Id', (req, res) => {
  axios.get(`${requests.reviews}/?product_id=${req.params.product_Id}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/reviews/meta/:product_id', (req, res) => {
  axios.get(`${requests.reviews}/meta/?product_id=${req.params.product_id}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})


app.get('/reviews/:product_Id/:sort', (req, res) => {
  axios.get(`${requests.reviews}/?product_id=${req.params.product_Id}&sort=${req.params.sort}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})


app.post('reviews/:product_Id', (req, res) => {
  axios.post(`${requests.reviews}/?product_id=${req.params.product_Id}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      // console.log(err)
    })
})

// console.log(req.params);

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  //helpful-question
  axios.put(`${requests.questions}/${req.params.question_id}/helpful`)
    .then(() => {
      axios.get(`${requests.questions}?product_id=${req.body.product_id}&count=100`)
        .then((response) => {
          var sorted = response.data.results.sort(function (a, b) {
            return b.question_helpfulness - a.question_helpfulness
          })
          res.json(sorted)
        })
        .catch((err) => {
          console.log('Error with Questions get request' + err)
          res.end()
        })
    })
    .catch((err) => {
      console.log('error')
      res.end(err)
    })
})
app.get('/products/:product_id/related', (req, res) => {
  // res.sendStatus(200);
  axios.get(`${requests.products}/${req.params.product_id}/related`)
    .then((data) => {
      var arr = [];
      data.data.forEach((id) => {
        axios.get(`${requests.products}/${id}`)
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

app.post('/qa/questions', (req, res) => {
  //post question form
  axios.post(`${requests.questions}`, req.body)
    .then(success => {
      console.log('sucessfully sent post')
      res.end();
    })
    .catch(err => {
      console.log('error with post request' + err)
      res.end()
    })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  //post answer form
  axios.post(`${requests.questions}/${req.params.question_id}/answers`, req.body)
    .then(success => {
      console.log('successful sent answer')
      res.end();
    })
    .catch(err => {
      console.log('error sending answer' + err)
      res.end();
    })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  //helpful-answers
  axios.put(`${requests.answers}/${req.params.answer_id}/helpful`)
    .then(() => {
      axios.get(`${requests.questions}/${req.body.question_id}/answers`)
        .then((response) => {
          res.json(response.data)
        })
        .catch((err) => {
          console.log('Error with Answers get request' + err)
          res.end();
        })
    })
    .catch(err => {
      console.log('error updating answer helpfulness')
      res.end();
    })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  axois.put(`${requests.questions}/${req.params.question_id}/report`)
    .then(success => {
      console.log('successfully reported question')
      res.end();
    })
    .catch(err => {
      console.log('error in reporting question')
      res.end();
    })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`${requests.answers}/${req.params.answer_id}/report`)
    .then(success => {
      console.log('successfully reported answer')
      res.end();
    })
    .catch(err => {
      console.log('error in reporting answer')
      res.end();
    })
})

app.get('/products/:product_id/info', (req, res) => {
  // console.log('ID', req.params);
  var id = req.params.product_id.split(':').join('');
  axios.get(`${requests.products}/${id}`)
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/cart', (req, res) => {
  axios.get(requests.cart)
    .then(response => {
      res.json(response.data)
    })
})

app.post('/cart', (req, res) => {
  const sku = { sku_id: req.body.sku }
  axios.post(requests.cart, sku)
    .then(response => {
      res.json(response.data)
    })
})

app.post('/products/:product/outfits', (req, res) => {

  // console.log(req.params);
  var outfitNum = parseInt(req.params.product);
  var arr = [];
  if (!tempOutfitList.includes(outfitNum)) {
    tempOutfitList.push(outfitNum);
  }
  tempOutfitList.forEach((id) => {
    axios.get(`${requests.products}/${id}`)
      .then((response) => {
        arr.push(response.data);
        if (arr.length === tempOutfitList.length) {
          res.json(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // res.sendStatus(200);
  })
})

app.get('/products/outfits', (req, res) => {
  var arr = [];
  tempOutfitList.forEach((id) => {
    axios.get(`${requests.products}/${id}`)
      .then((response) => {
        arr.push(response.data);
        if (arr.length === tempOutfitList.length) {
          res.json(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // res.sendStatus(200);
  })
  // res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Server listening at localhost: ${port}!`);
})
