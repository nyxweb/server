const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  name: 'deployment',
  target: 'node',
  entry: './src/app.ts',
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /client/]
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [new nodemonPlugin()],
  externals: [nodeExternals()]
};
