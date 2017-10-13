const router = require('express').Router();
const Api = require('../models/api');

const apiCallback = (res, result) => {
  let statusCode = result.error ? result.error.code : 200;
  res.status(statusCode).json(result);
}

// ---C
router.post('/users', (req, res) => {
  Api.post(req, (result) => apiCallback(res, result));
})

// ---R
router.get('/users/:id?', (req, res) => {
  Api.get(req, (result) => apiCallback(res, result));
})

// ---U
router.put('/users/:id', (req, res) => {
  Api.put(req, (result) => apiCallback(res, result));
})

// ---D
router.delete('/users/:id', (req, res) => {
  Api.delete(req, (result) => apiCallback(res, result));
})

module.exports = router