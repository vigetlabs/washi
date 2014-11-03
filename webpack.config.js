module.exports = {

  debug: true,
  devtool: 'sourcemap',

  entry: {
    washi: './washi.js'
  },

  output: {
    filename: '[name].js',
    sourceMapFileName: '[name].map',
    path: './dist',
    libraryTarget: 'var',
    library: 'Washi'
  },

  externals: {
    'washi': 'Washi'
  }

};
