const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode:MODE,
  entry:['@babel/polyfill',path.join(__dirname, 'src', 'index.js')],
  output:{
    path:path.join(__dirname, 'dist'),
    filename:'bundle.[hash].js',
  },
  optimization:{
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'colors_and_fonts.pug'),
      filename:'colors_and_fonts.html',
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.pug'),
      filename:'index.html',
      minify: false
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename:'style.[hash].css',
    }),
  ],
  devServer:{
    historyApiFallback: true,
    static: './',
    open: true,
    compress: true,
    hot:true,
    port: 3000,
  },
  module:{
    rules:[
      {test:/\.pug$/i, use:[{loader: 'html-loader'}, {loader:'pug-html-loader'}]},
      {test: /\.css$/i, use:[{loader: MiniCssExtractPlugin.loader}, {loader:'css-loader'}]},
      {test:/\.scss$/i, use: [{loader: MiniCssExtractPlugin.loader}, {loader:'css-loader'}, {loader:'sass-loader'}]},
      {test:/\.m?js$/i, exclude: /node_modules/, use: [{loader:'babel-loader', options: {presets: ['@babel/preset-env']}}]},
      {test:/\.(jpg|jpeg|svg|png|gif)$/i, type:'asset/resource', generator: {filename: 'assets/img/[hash][ext][query]'}},
      {test: /\.(woff|woff2|eot|ttf|otf)$/i,type: 'asset/resource',generator: {filename: 'assets/fonts/[hash][ext][query]'}}
    ]
  }
}