"use strict";

const webpack = require('webpack');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/datetime.js",
        library: "datetime",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ["", ".webpack.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts" }
        ]
    }
};