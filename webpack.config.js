var path = require('path');
var rootPath = path.resolve(__dirname, './src/main/webapp/js');

module.exports = {

  entry: [
    './src/main/webapp/js/main'
  ],

  output: {
    
    filename:   'bundle.js',
    path:  rootPath,
    
  },
  devtool:'source-map',
  
  module: {
	  loaders: [
          {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
          {test: /\.css$/, loader: 'style-loader!css-loader'},
          {test: /\.jsx$/, loaders: ['jsx-loader?harmony', 'babel-loader'], exclude: /node_modules/},
          {test: /\.js$/, loaders: ['jsx-loader?harmony', 'babel-loader'], exclude: /node_modules/}
      ]
  },

  resolve: {
	  root: rootPath,
    extensions: ['', '.js', '.jsx']
  },

  
}