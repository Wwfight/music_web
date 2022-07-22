
'use strict'
const path = require('path')

let resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music/' : '/',
  outputDir: 'D:\\music'
}
