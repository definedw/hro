const DEBUG = process.env.NODE.ENV !== 'production' ? true : false
const TerserPlugin = require('terser-webpack-plugin')
const Compression = require('compression-webpack-plugin')

module.exports = {
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    disableHostCheck: false,
    https: false,
    open: true, //配置自动启动浏览器
    proxy: {
      '^/api': {
        target: 'http://xizhoujiedao.cn/',
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  css: {
    sourceMap: true
  },
  lintOnSave: false,
  productionSourceMap: false, // 打包时不生成map文件
  runtimeCompiler: true,
  chainWebpack: config => {
    config.plugins.delete('preload')
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
  },
  configureWebpack: config => {
    if (!DEBUG) {

      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: '/[\\/]node_modules[\\/]',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
        ]
      }
      Object.assign(config, { optimization })
      config.plugins.push(
        new Compression({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), // 匹配文件扩展名
          threshold: 5120, // 对超过5k的数据进行压缩
          minRatio: 0.8,
          cache: true, // 是否需要缓存
          deleteOriginalAssets: false // true删除源文件(不建议);false不删除源文件
        })
      )
    } else {
      // dev related config
    }
  }
}
