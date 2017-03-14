const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});

const config = {

    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /(\.scss$|\.sass$)/,
                use: extractSass.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        extractSass
    ],
    devServer: {
        contentBase: path.join(__dirname, 'wwwroot'),
        compress: true,
        port: 5000
    }

}

module.exports = config;