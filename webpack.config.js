const path = require('path');

module.exports = {
  entry: './src/js/index.js', // Main file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // Change to 'production' for optimizations
  module: {
    rules: [
      {
        test: /\.css$/, // Process CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/, // Transpile JS
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};

