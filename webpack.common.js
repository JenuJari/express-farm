const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['babel-polyfill', './front_end/index.jsx']
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/javascripts/')
    },

    plugins: [
        new ExtractTextPlugin('./../../public/stylesheets/[name].css'),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                loader: ExtractTextPlugin.extract({ use: 'css-loader?minimize=true', fallback: 'style-loader' })
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader?minimize=true', 'sass-loader'])
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    stats: {
        colors: true
    }
};
