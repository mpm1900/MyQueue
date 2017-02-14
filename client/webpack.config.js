var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        //'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.scss/,
            loader: 'style!css!sass'
        },
        {
            test: /\.css/,
            loader: 'style!css'
        }]
    },
    devServer: {
        port: 3000,
        contentBase: 'dist/'
    }
};