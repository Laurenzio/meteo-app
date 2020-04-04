const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "mian.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [HtmlWebpackPlugin()],
  module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
  ]
}
};
