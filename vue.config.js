module.exports = {
  outputDir: 'nuonuo',
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack:{
    externals: {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'axios': 'axios',
      // 'element': 'element-ui',
    },
  },
}