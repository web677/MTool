var path = require('path')
var fs = require('fs')

module.exports = {
    name: "mtiny",
    entry: {
        main: "./src/entry/main.js",
        tiny: "./src/entry/tiny.js",
        sites: "./src/entry/sites.js",
        mock: "./src/entry/mock.js"
    },
    mode: "production",
    output: {
        path: path.resolve(__dirname, './static'),
        publicPath: "./",
        filename: "[name].js"
    },
    externals: [
        function (context, request, callback) {
            if (/^[a-z\-0-9]+$/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ],
    target: 'electron-renderer',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
}
