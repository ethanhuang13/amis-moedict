const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const src = path.resolve(__dirname, 'src');
var webpack = require('webpack');
var entries = [];
var loaders = [];
var plugins = [];
if (/production/.test(process.env.NODE_ENV)) {
    plugins = [ 
        // new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];
}
else {
    entries = [ 'webpack-dev-server/client?http://localhost:8888' ];
    loaders = [ 
        // { 
        //     loader: 'react-hot-loader', 
        //     exclude: /node_modules/ 
        // } 
    ]
    plugins = [ 
        new VueLoaderPlugin(),
        // new webpack.HotModuleReplacementPlugin() 
    ];
}

module.exports = {
    mode: 'development',
    entry: entries.concat([
        './vue/src/main.js',
        './js/jquery-ui-1.10.4.custom.min.js',
        './js/jquery.hoverIntent.js',
        './js/bootstrap/dropdown.js',
        './js/phantomjs-shims.js',
        './js/console-polyfill.js',
    ]),
    output: {
        path: __dirname + '/js/',
        filename: 'deps.js',
        publicPath: '/js/'
    },
    plugins: plugins,
    module: {
        rules: loaders.concat([
            // { 
            //     // babel-loader, will use the settings in .babelrc
            //     test: /\.jsx?$/, 
            //     loader: 'babel-loader', 
            //     exclude: /node_modules/
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { 
                // babel-loader, will use the settings in .babelrc
                test: /\.js?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/
            },
            {        
                test: /\.css$/,        
                use:[          
                    'vue-style-loader',          
                    'css-loader',        
                ]     
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader", 
                    "css-loader", 
                    "sass-loader"
                ]
            },

            { 
                test: /\.json$/, 
                loader: 'json-loader' 
            }
        ])
    },
}
