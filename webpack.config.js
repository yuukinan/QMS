var webpack = require('webpack')
var path    = require('path')
var ETP     = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ETP.extract('style-loader', 'css-loader')
      },
      {
        test: /\.styl$/,
        // loader: ETP.extract('css-loader', 'stylus-loader')
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.html$/,
        loader: 'ejs-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.styl', '.html']
  },

  plugins: [
    new ETP('[name].css'),
  ]
}