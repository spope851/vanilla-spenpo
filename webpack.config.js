const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (_env, argv) => {
  const isProduction = argv.mode !== 'development';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // In production, use MiniCssExtractPlugin
            // In development, you might use 'style-loader' instead
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
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
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css' // Output CSS file name
      })
    ],
    // Development server configuration
    devServer: {
      // In development, serve from source
      static: path.join(__dirname, 'src'),
      // In production, serve from dist
      ...(isProduction && { 
        static: path.join(__dirname, 'dist') 
      }),
      hot: true,
      open: true
    },
  }
}

