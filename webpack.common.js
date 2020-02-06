const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		main: './src/index.js',
		vendor: './src/vendor.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				// whenever you encounter an img ending with... use file loader and add those images to your [dist] folder
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						// imgs will be stored in an imgs directroy within your dist folder
						outputPath: 'imgs'
					}
				}
			}
		]
	}
}
