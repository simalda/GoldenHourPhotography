const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const isEnvDevelopment = "development";
const isEnvProduction = "production";
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.*[\\\/]static[\\\/].*/,
        loader: "file-loader",
        options: {
          outputPath: 'static',
          name: '[name].[ext]',
        }
      },
    ],
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
