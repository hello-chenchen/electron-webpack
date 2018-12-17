const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devtool: 'inline-source-map',
  node: {
    __dirname: false
  },
  stats: {//solve bug https://github.com/jantimon/html-webpack-plugin/issues/895
    children: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};

module.exports = [
  Object.assign(
    {
      target: 'electron-main',
      entry: { main: './src/main.js' },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({template: './public/index.html', filename: 'index.html'})
      ]
    },
    commonConfig),
  Object.assign(
    {
      target: 'electron-renderer',
      entry: {
        index: './src/ui/index.jsx',
        MainWindows: './src/ui/MainWindows.jsx'
      }
    },
    commonConfig)
];