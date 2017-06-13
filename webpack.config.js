// Node Modules
const path = require('path');

// Webpack
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Production vs. Development
const isProd = process.env.NODE_ENV === 'production'; //true or false

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];

const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: path.resolve(__dirname, "dist")
})

const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

// Directories
const distDir = path.join(__dirname, "dist");

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: cssConfig
     },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        use: [
          'file-loader?name=[name].[ext]&outputPath=img/&publicPath=./',
          'image-webpack-loader'
          ]
      },
      { test: /\.(woff2?)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },
      // Bootstrap 3
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' }
    ]
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Noob Combo',
      template: './src/index.html',
      hash: true,
      excludeChunks: ['contact']
/*      minify: {
        collapseWhitespace: false
      }*/
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash: true,
      filename: 'contact.html',
      template: './src/contact.html',
      chunks: ['contact']
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ]
}