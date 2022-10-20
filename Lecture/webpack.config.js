const path = require('path'); //node 문법
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', //실 서비스는 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    //Goal: index.html에서의 ./dist/app/js 에 jsx 파일을 통함하려는 목적.
    entry: {
        app: ['./client']                    //jsx 파일 모두 불러오기. WordRelay.jsx 파일은 client.jsx안에서 이미 불려있으니 생략 가능
    },//입력

    module : {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [ '@babel/plugin-proposal-class-properties','react-refresh/babel'],
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),     //node 문법, 현재 폴더 위치 값 가져와서 dist 폴더,파일 위치 주소값 가져오기.
        filename: 'app.js',                     //jsx파일을 모아 한 곳에 모아둘 파일
        publicPath: '/dist/',
    },//출력
    devServer: {
        devMiddleware: {
            publicPath: '/dist/'
        },
        static: {
            directory: path.resolve(__dirname)
        },
        hot: true,
    },
}