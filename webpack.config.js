const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        main: path.resolve(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][hash].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                use: ["file-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Quotes - React R v6",
            template: path.resolve(__dirname, "src/template.html")
        }),
        new webpack.ProvidePlugin({
            React: "react"
        })
    ]
};

module.exports = (env, args) => {
    switch (args.mode) {
        case "production":
            config.mode = "production";
            break;
        default:
            config.mode = "development";
            config.devtool = "inline-source-map";
            config.devServer = {
                contentBase: path.resolve(__dirname, "dist"),
                hot: true,
                historyApiFallback: true
            };
    }
    return config;
};
