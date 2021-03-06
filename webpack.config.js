require('dotenv/config');

const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server/public');
const serverPublicImagesPath = path.join(serverPublicPath, 'images');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: serverPublicPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    publicPath: '/',
    contentBase: serverPublicPath,
    watchContentBase: true,
    watchOptions: {
      ignored: serverPublicImagesPath
    },
    stats: 'minimal',
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new EnvironmentPlugin(['GEOCODE', 'APP_ID', 'API_TOKEN'])
  ]
};
