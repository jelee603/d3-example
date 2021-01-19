var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    devServer: {
        port: 3000,
    },
};