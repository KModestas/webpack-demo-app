const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	// development mode prevents your code from being minified
	mode: 'development',
	// makes bundled webpack code easier to udnerstand - no eval()
	// devtool: 'none',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader', //3. Inject styles into DOM
					'css-loader', //2. Turns css into commonjs
					'sass-loader' //1. Turns sass into css
				]
			}
		]
	}
})
