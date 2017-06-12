// Node Modules
const path = require('path');

// Webpack
var webpack = require('webpack');

// Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Noob Combo',
      template: './src/index.pug',
      hash:true,
      excludeChunks: ['contact']
/*      minify: {
        collapseWhitespace: false
      }*/
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash:true,
      filename: 'contact.html',
      template: './src/contact.ejs',
      chunks: ['contact']
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}