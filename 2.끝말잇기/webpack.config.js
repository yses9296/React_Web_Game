const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', 
    devtool: 'eval', //hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['> 5% in KR','last 2 chrome versions'], 
                                //지원하고자 하는 브라우저만 설정, browserslist 참고
                            },
                            debug: true,
                        }],
                        '@babel/preset-react'
                    ],
                    plugins: [], //plugin들의 모음이 preset
                }
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}