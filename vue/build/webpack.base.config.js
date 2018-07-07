const path = require('path')

const utils = require('./utils')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        './vue/src/main.js',
        './js/jquery-ui-1.10.4.custom.min.js',
        './js/jquery.hoverIntent.js',
        './js/bootstrap/dropdown.js',
        './js/phantomjs-shims.js',
        './js/console-polyfill.js',
    ],
    output: {
        path: __dirname + '/js/',
        filename: 'deps.js',
        publicPath: '/js/'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }, 
          { 
            test: /\.css$/, 
            loader: 'style-loader!css-loader' 
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
    },
}
