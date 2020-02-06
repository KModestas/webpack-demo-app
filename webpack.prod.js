// path comes with node - dont need to install it
const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	output: {
		// which file to bundle your code in
		filename: '[name].[contentHash].bundle.js',
		// tells webpack while folder to bundle your code in
		// dirname is a variable that coreespondes to your machine e.g. users/modestas/development etc
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: './src/template.html',
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
					MiniCssExtractPlugin.loader, //3. Extract css into files
					'css-loader', //2. Turns css into commonjs
					'sass-loader' //1. Turns sass into css
				]
			}
		]
	}
})
