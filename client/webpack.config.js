const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
		},
	module: {
		rules: [
			{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
		},
		]
	},
	devServer: {
			static: path.join(__dirname, 'public'),
			hot: true,
			port: 3000,
			// compress: true,
		},
	};
