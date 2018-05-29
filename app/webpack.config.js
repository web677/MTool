var path = require('path')
var fs = require('fs')

module.exports = {
    name: "mtiny",
    entry: "./src/entry.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'src/assets/dist'),
        publicPath: "./",
        filename: "app.js"
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
