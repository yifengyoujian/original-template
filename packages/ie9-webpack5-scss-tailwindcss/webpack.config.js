const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const { DefinePlugin } = require('webpack')

const resolve = (dir) => path.resolve(__dirname, dir)
const production = process.env.NODE_ENV === 'production'

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
    mode: production ? 'production' : 'development',
    entry: {
        index: resolve('src/js/index.js')
    },
    output: {
        publicPath: './',
        filename: 'js/[name][chunkhash:8].js',
        clean: true
    },
    resolve: {
        alias: {
            "@": resolve('src'),
            "@styles": resolve('src/styles'),
            "@images": resolve('src/assets/images'),
            "@fonts": resolve('src/assets/fonts'),
            "@components": resolve('src/components'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                // 匹配所有css sass scss less
                test: /\.(sa|sc|c)ss$/,
                use: [
                    production ?
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } :
                        "style-loader",
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                resolve('src/styles/global.scss'),
                            ]
                        }
                    },
                    ...[production ? 'thread-loader' : null].filter(Boolean),
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash:8][ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            template: resolve('src/views/index.html'),
            minify: false,
            inject: false
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name][chunkhash:8].css",
        }),

        ...[!production ? new WindiCSSWebpackPlugin() : null].filter(Boolean),

        new DefinePlugin({
            __dev__: process.env.NODE_ENV === 'development',
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        static: false
    },
    target: ['web', 'es5']
}