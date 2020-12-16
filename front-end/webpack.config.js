const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
// const isEnvDevelopment = "development";
// const isEnvProduction = "production";
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
  },
  devtool: "cheap-module-source-map",
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
        use: ["style-loader", "css-loader", "sass-loader"],
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
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
