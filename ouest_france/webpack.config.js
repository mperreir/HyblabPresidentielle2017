const
    path              = require('path'),
    webpack           = require('webpack'),
    pkg               = require('./package.json'),
    dotenv            = require('dotenv'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

dotenv.config();

const DEBUG = process.env.DEBUG;

module.exports = {
    entry:  './public/js/app.js',
    output: {
        path:     path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
                options: {
                    plugins: [
                        'transform-runtime',
                        'transform-object-rest-spread',
                    ],
                    presets: ['es2015'],
                },
            },
            {
                test:    /\.scss$/,
                exclude: /node_modules\/(?!materialize-css)/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // The backup style loader
                    use:      [
                        'css-loader?sourceMap',
                        'postcss-loader',
                        'sass-loader?sourceMap',
                    ],
                }),
            },
            {
                test:    /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                use:     'file-loader?name=dist/fonts/[name].[ext]',
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, './js'),
            path.resolve(__dirname, './node_modules'),
        ],
        extensions: ['.js', '.jsx', '.json', '.css'],
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pkg.version),
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    target:  'web',
    devtool: DEBUG ? 'inline-source-map' : false,
};
