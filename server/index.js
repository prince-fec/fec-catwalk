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
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.get('/product/:productId/styles', (req, res) => {
  //styles
  axios.get(`${requests.products}/${req.params.productId}/styles`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {

      res.status(err.response.status);
      res.send(err.response.statusText);
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
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.get('/qa/answers/:question_id/answers', (req, res) => {
  //answers
  axios.get(`${requests.questions}/${req.params.question_id}/answers`)
    .then((response) => {
      res.json(helperfunction.sortAnswer(response.data.results));
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.get('/reviews/meta/:product_id', (req, res) => {
  axios.get(`${requests.reviews}/meta/?product_id=${req.params.product_id}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})


app.get('/reviews/:product_Id/:sort/:count', (req, res) => {
  axios.get(`${requests.reviews}/?product_id=${req.params.product_Id}&sort=${req.params.sort}&count=${1000}`)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})


app.post('/reviews', (req, res) => {
  axios.post(`${requests.reviews}`, req.body)
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})


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
          res.status(err.response.status);
          res.send(err.response.statusText);
        })
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
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
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.post('/qa/questions', (req, res) => {
  //post question form
  axios.post(`${requests.questions}`, req.body)
    .then(success => {
      axios.get(`${requests.questions}?product_id=${req.body.product_id}&count=100`)
        .then((response) => {
          var sorted = response.data.results.sort(function (a, b) {
            return b.question_helpfulness - a.question_helpfulness
          })
          res.json(sorted)
        })
        .catch((err) => {
          console.log('Error with Questions get request')
          res.end()
        })
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  //post answer form
  var obj = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }
  axios.post(`${requests.questions}/${req.params.question_id}/answers`, obj)
    .then(success => {
      axios.get(`${requests.questions}/${req.body.questionId}/answers`)
        .then((response) => {
          res.json(helperfunction.sortAnswer(response.data.results));
        })
        .catch((err) => {
          res.status(err.response.status);
          res.send(err.response.statusText);
        })
    })
    .catch(err => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  //helpful-answers
  axios.put(`${requests.answers}/${req.params.answer_id}/helpful`)
    .then((data) => {
      axios.get(`${requests.questions}/${req.body.question_id}/answers`)
        .then((response) => {
          res.json(response.data)
        })
        .catch((err) => {
          res.status(err.response.status);
          res.send(err.response.statusText);
        })
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`${requests.questions}/${req.params.question_id}/report`)
    .then(success => {
      console.log('successfully reported question')
      res.end();
    })
    .catch(err => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`${requests.answers}/${req.params.answer_id}/report`)
    .then(success => {
      console.log('successfully reported answer')
      res.end();
    })
    .catch(err => {
      res.status(err.response.status);
      res.send(err.response.statusText);
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
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.get('/cart', (req, res) => {
  axios.get(requests.cart)
    .then(response => {
      res.json(response.data)
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.post('/cart', (req, res) => {
  const sku = { sku_id: req.body.sku }
  axios.post(requests.cart, sku)
    .then(response => {
      res.json(response.data)
    })
    .catch((err) => {
      res.status(err.response.status);
      res.send(err.response.statusText);
    })
})

app.post('/products/:product/outfits', (req, res) => {
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
        res.status(err.response.status);
        res.send(err.response.statusText);
      })
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
        res.status(err.response.status);
        res.send(err.response.statusText);
      })

  })

})

app.delete('/products/:product/outfits', (req, res) => {
  var arr = [];
  var index = tempOutfitList.indexOf(parseInt(req.params.product));
  tempOutfitList.splice(index, 1);
  if (tempOutfitList.length !== 0) {
    axios.get(`${requests.products}/${id}`)
      .then((response) => {
        arr.push(response.data);
        if (arr.length === tempOutfitList.length) {
          res.json(arr);
        }
      })
      .catch((err) => {
        res.status(err.response.status);
        res.send(err.response.statusText);
      })
  } else {
    res.json(arr);
  }
})

app.listen(port, () => {
  console.log(`Server listening at localhost: ${port}!`);
})
