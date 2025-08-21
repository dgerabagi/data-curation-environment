const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const baseConfig = {
    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
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
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};

/** @type {import('webpack').Configuration} */
const extensionConfig = {
    ...baseConfig,
    target: 'node',
    entry: {
        extension: './src/extension.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode',
    },
};

/** @type {import('webpack').Configuration} */
const webviewConfig = {
    ...baseConfig,
    target: 'web',
    entry: {
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
        parallelCopilotView: './src/client/views/parallel-copilot.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};


module.exports = [extensionConfig, webviewConfig];