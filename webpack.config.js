if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    ]
  }
};
