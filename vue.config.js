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
      // https://admin.jxbanchen.com/
      '/api': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/api'
        }
      },
      '/user': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        }
      },
      '/companyInfo': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/companyInfo': '/companyInfo'
        }
      },
      '/worker': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/worker': '/worker'
        }
      },
      '/salaryInfo': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/salaryInfo': '/salaryInfo'
        }
      },
      '/common': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/common': '/common'
        },
      },
      '/invoiceMainPO': {
        target: 'https://admin.jxbanchen.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/invoiceMainPO': '/invoiceMainPO'
        },
      }
    }
  }
};