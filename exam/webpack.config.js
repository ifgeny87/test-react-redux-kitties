const {join, resolve} = require('path')
const {createReadStream} = require('fs')

const webpack = require('webpack')

const HtmlPlugin = require('html-webpack-plugin')
const HtmlTemplatePlugin = require('html-webpack-template')

const sourcePath = join(__dirname, 'src')

module.exports = {
    context: __dirname,

    entry: './src/index.js',

    output: join(__dirname, 'public/bundle.js'),

    resolve: {
        modules: [
            resolve('./src/'),
            resolve('./node_modules'),
        ],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: sourcePath,
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [
                                join(sourcePath, 'styles')
                            ]
                        }
                    }]
            }
        ],
    },

    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: HtmlTemplatePlugin,
            inject: false,
            mobile: true,
            appMountId: 'app',
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
            },
        })
    ],

    devServer: {
        contentBase: './public/',
        hot: true,
        port: 9000,
        setup(app) {
            app.get('/api/tiles', function (req, res) {
                res.writeHead(200, {'Content-Type': 'application/json'})
                createReadStream(join(process.cwd(), 'api/tiles.json'), {encoding: 'utf-8'})
                    .pipe(res)
            })
        },
    },
}
