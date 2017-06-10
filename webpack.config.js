// Node Modules
const path = require('path');

// Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          filename: path.resolve(__dirname, "dist")
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Noob Combo',
      template: './src/index.ejs',
      hash:true,
/*      minify: {
        collapseWhitespace: false
      }
*/    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    })
  ]
}