'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8000/"',
  IMAGE_URL: '"https://dev.ttlove.net/"',  //上传路径
})
