/*
 * @Author: Neo Huang
 * @Date: 2022-02-18 15:44:49
 * @LastEditTime: 2022-02-20 18:45:01
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /vueSampleDemo/webpack.config.js
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {
    DefinePlugin
} = require('webpack');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: './js/bondul.js'
    },
    devServer: {
        host: 'localhost',
        // port: 3000,
        // compress: true //是否开启压缩,
        proxy: {
            '/api': {
                target: "https://github.com",
                pathRewrite: {
                    '^/api': ''
                },
                secure: false, //默认情况下不接受转发到https的服务器上，如果希望支持可以设置为false
                changeOrigin: true //标致是否更新代理后请求的headers中的host地址
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, //配置处理.css文件的第三方处理规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: true, //是否兼容Vue2的options API？
            __VUE_PROD_DEVTOOLS__: true //是否使用Vue开发辅助插件Devtools？
        }),
        new htmlWebpackPlugin({
            template: './src/public/index.html',
            filename: 'index.html',
            title: '环信简易接口测试用例'
        }),
        new VueLoaderPlugin()
    ]
}