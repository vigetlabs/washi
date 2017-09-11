module.exports = {
  devtool: 'sourcemap',
  entry: './washi.js',
  output: {
    filename: 'washi.js',
    sourceMapFileName: 'washi.map',
    path: './dist',
    libraryTarget: 'var',
    library: 'Washi'
  },
  externals: {
    washi: 'Washi'
  },
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
