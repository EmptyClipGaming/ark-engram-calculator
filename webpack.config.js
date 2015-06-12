var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './assets/js/site.jsx',
  output: {
    path: __dirname + '/build/js',
    publicPath: '/js/',
    filename: 'site.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['babel', ReactStylePlugin.loader()] },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new ReactStylePlugin('../css/bundle.css')
  ]
};
