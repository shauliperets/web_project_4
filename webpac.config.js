const path = require("path"); // connect path to webpack config

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/scripts/index.js",
  },
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"], // ensure the Webpack glue code is ES5 compatible too
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // specifies a folder from where to serve the application and its contents
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080 (you can use another port)
    open: true, // site will open automatically in the browser after executing npm run dev
  },
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
    ],
  },
};
