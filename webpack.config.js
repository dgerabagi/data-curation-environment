const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import('webpack').Configuration} */
const baseConfig = {
    mode: 'none',
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
    module: {
        ...baseConfig.module,
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.ttf$/,
				type: 'asset/resource'
			}
        ]
    },
    resolve: {
        ...baseConfig.resolve,
        fallback: {
            "path": require.resolve("path-browserify")
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new MonacoWebpackPlugin({
            languages: ['markdown', 'typescript', 'javascript', 'scss', 'css', 'json', 'html', 'xml'],
            filename: '[name].worker.js'
        }),
        new CopyPlugin({
            patterns: [
                { from: "public", to: "public" },
                { from: "node_modules/@wooorm/starry-night/style/both.css", to: "starry-night.css" },
                // C164 Fix: Copy static artifacts needed by the backend into the dist folder.
                { from: "src/Artifacts", to: "Artifacts" }
            ],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};

module.exports = [extensionConfig, webviewConfig];