var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

config.entry.unshift('webpack-dev-server/client?http://localhost:34561', "webpack/hot/dev-server")
config.plugins.push(new webpack.HotModuleReplacementPlugin())

var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
})
app.listen(34561)
