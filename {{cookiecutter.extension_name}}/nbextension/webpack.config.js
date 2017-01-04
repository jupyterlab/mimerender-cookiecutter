var version = require('./package.json').version;

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var loaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            // presets: ['latest', 'stage-0', 'react']
            presets: [
                require.resolve('babel-preset-latest'), 
                require.resolve('babel-preset-stage-0'), 
                require.resolve('babel-preset-react')
            ]
        }
    }, {
        test: /\.json$/,
        loader: 'json-loader'
    }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }, {
        test: /\.html$/,
        loader: 'file-loader'
    }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader'
    }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
];


module.exports = [
    // Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    {
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: '../{{cookiecutter.extension_name}}/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders,
        },
        externals: [
            'nbextensions/{{cookiecutter.extension_name}}/index',
            'jquery'
        ]
    },
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    {
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../{{cookiecutter.extension_name}}/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders,
        },
        resolve: {
            root: [path.resolve('.'), path.resolve('../component')],      
            fallback: path.resolve('node_modules')
        },
        resolveLoader: {
            root: [path.resolve('node_modules')]
        }
    },
    // Embeddable {{cookiecutter.extension_name}} bundle
    //
    // This bundle is generally almost identical to the notebook bundle
    // containing the custom widget views and models.
    //
    // The only difference is in the configuration of the webpack public path
    // for the static assets.
    //
    // It will be automatically distributed by unpkg to work with the static
    // widget embedder.
    //
    // The target bundle is always `lib/index.js`, which is the path required
    // by the custom widget embedder.
    {
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: './embed/',
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/{{cookiecutter.extension_name}}@' + version + '/lib/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders,
        }
    }
];
