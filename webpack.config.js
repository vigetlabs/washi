const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'sourcemap',
  entry: './washi.js',
  output: {
    filename: 'washi.js',
    path: path.resolve('dist'),
    libraryTarget: 'umd',
    library: 'Washi'
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
