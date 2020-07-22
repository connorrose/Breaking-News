const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: [
      {
        context: ['/api', '/search'],
        target: 'http://localhost:3000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
