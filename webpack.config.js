const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];