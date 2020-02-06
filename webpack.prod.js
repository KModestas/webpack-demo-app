// path comes with node - dont need to install it
const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// this plugin comes automatically
const TerserPlugin = require('terser-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	output: {
		// which file to bundle your code in
		// content hash generates a new file name every time your file changes so that your browser doesnt cache the file and load outdated unchanged code
		filename: '[name].[contentHash].bundle.js',
		// tells webpack while folder to bundle your code in
		// dirname is a variable that coreespondes to your machine e.g. users/modestas/development etc
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			// need to add this plugin back (minifies js) in which is used by default but overridden if you add args to minimizer
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: './src/template.html',
				// pass in extra paramteres to minify your html
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					//  use MiniCssExtractPlugin instead of style loader in production
					MiniCssExtractPlugin.loader, //3. Extract css into files
					'css-loader', //2. Turns css into commonjs
					'sass-loader' //1. Turns sass into css
				]
			}
		]
	}
})
