const {resolve} = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: absolutePath('./src/index'),
  output: {
    filename: "[name].[contenthash].js",
    path: absolutePath('./dist'),
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: absolutePath('./src/index.html'),
      scriptLoading: "defer",
      inject: "head"
    }),
  ]
};

function absolutePath(relative) {
  return resolve(__dirname, relative);
}

