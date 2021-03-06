const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const dev = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Kobz',
    filename: 'index.html',
    template: path.resolve('public', 'index.html'),
  }),
  new MiniCssExtractPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      path.resolve('public', 'favicons'),
      path.resolve('public', 'site.webmanifest'),
    ],
  })
];

if (dev) {
  plugins.push(new ESLintPlugin({
    context: path.resolve('src'),
  }));
}
module.exports = {
  context: path.resolve('src'),
  entry: {
    main: {
      import: path.resolve('src', 'index.jsx'),
    },
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    clean: true,
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      'src/core': path.resolve('src', 'core'),
      'src/components': path.resolve('src', 'components'),
      'src/modules': path.resolve('src', 'modules'),
      'src/assets': path.resolve('src', 'assets'),
      'src/constants': path.resolve('src', 'constants'),
      'src/utils': path.resolve('src', 'utils'),
      'src/hooks': path.resolve('src', 'hooks'),
    },
    extensions: ['.jsx', '.js', '.json']
  },
  devtool: 'source-map',
  target: 'web',
  devServer: {
    port: 8888,
    static: path.resolve('dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(glb|gltf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins,
};
