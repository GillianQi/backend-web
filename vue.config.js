const webpack = require('webpack');


module.exports = {
  publicPath: '/backend-web',
  // 去掉文件名中的 hash
  filenameHashing: false,

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },

  configureWebpack: {
    plugins: [
      // new MyAwesomeWebpackPlugin()
    ]
  },

  devServer: {
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://172.20.10.3:8081/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/api'
        }
      },
      '/user': {
        target: 'http://172.20.10.3:8081/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        }
      },
      '/companyInfo': {
        target: 'http://172.20.10.3:8081/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/companyInfo': '/companyInfo'
        }
      }
    }
    
  }
};