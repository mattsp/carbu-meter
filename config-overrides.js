const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')

module.exports = function override(config, env) {
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      })
    }
    return plugin
  })
  if (env === 'production') {
    config.plugins.push(
      new HtmlCriticalWebpackPlugin({
        base: 'build',
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        },
      })
    )
  }
  return config
}
