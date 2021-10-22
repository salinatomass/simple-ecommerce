const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  name: "express-server",
  entry: "./src/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules$/, /client$/],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
