const webpack = require("webpack");

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const plugins = [];
if (!devMode) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]-[hash:base64:8]",
              },
            },
          },
          "sass-loader",
        ],
        include: /\.module\.(s[ac]ss|css)$/,
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /\.module\.(s[ac]ss|css)$/,
      },
      {
        test: /.*[\\/]static[\\/].*/,
        loader: "file-loader",
        options: {
          outputPath: "static",
          name: "[name].[ext]",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.EnvironmentPlugin({
      BACKENDURL: "http://localhost:5000",
    }),
  ],
};
