var buildExtension = require('@jupyterlab/extension-builder').buildExtension;
var path = require('path');

buildExtension({
  name: '{{cookiecutter.extension_name}}',
  entry: './src/plugin.js',
  outputDir: '../{{cookiecutter.extension_name}}/static',
  useDefaultLoaders: false,
  config: {
    module: {
      loaders: [
        { test: /\.html$/, loader: 'file-loader' },
        { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.js$/,
          exclude: /node_modules/, 
          loader: 'babel-loader',
          query: {
            presets: [
              require.resolve('babel-preset-latest'), 
              require.resolve('babel-preset-stage-0'), 
              require.resolve('babel-preset-react')
            ]
          }
        }
      ]
    },
    resolve: {
      root: [path.resolve('.'), path.resolve('../component')],      
      fallback: path.resolve('node_modules')
    },
    resolveLoader: {
      root: [path.resolve('node_modules')]
    }
  }
});
