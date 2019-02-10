const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './api/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'production',
  module: {
    rules:[
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        },
      }
    ]
  }
};
