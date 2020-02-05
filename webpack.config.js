const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  name: 'deployment',
  mode: process.env.NODE_ENV,
  entry: './src/server.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false,
    usedExports: true
  },
  plugins: [
    new NodemonPlugin(),
    new FilterWarningsPlugin({
      exclude: [
        /mongodb/,
        /mysql/,
        /mysql2/,
        /oracledb/,
        /pg/,
        /pg-native/,
        /pg-query-stream/,
        /react-native-sqlite-storage/,
        /redis/,
        /sqlite3/,
        /sql.js/,
        /typeorm-aurora-data-api-driver/
      ]
    })
  ],
  externals: [nodeExternals()]
};
