const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const resolvePaths = (...args) => {
    return path.resolve(__dirname, 'src', ...args);
};

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const providePlugin = new webpack.ProvidePlugin({
    "React": "react",
});

const envConfigFile = process.env.NODE_ENV || 'default';
const appConfig = __dirname + '/src/config/appConfig.js';
const envConfig = __dirname + '/src/config/environments/' + envConfigFile + '.js';
const endpoints = __dirname + '/src/config/endpoints/index.js';
// const httpServices = __dirname + '/src/helpers/redux/services/http.js';

module.exports = {
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed',
                            includePaths: [
                                path.join(__dirname, 'src')
                            ]
                        }
                    }
                ],
            },
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src/'),
            'node_modules'
        ],
        alias: {
            appConfig,
            envConfig,
            endpoints,
            // httpServices,
            actions: resolvePaths('actions'),
            translations: resolvePaths('i18n/translationsKeyMapping'),
        },
        extensions: ['.js', '.jsx']
    },
    plugins: [
        htmlPlugin,
        providePlugin
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 8080,
        // host: '{your-ip}' // add here your IPv4 address for local testing from another device
    },
};