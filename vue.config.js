const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const themeColor = require('./src/config/themeColor')
const { getLess } = require('@zougt/some-loader-utils');
const ThemeCssExtractWebpackPlugin = require('@zougt/theme-css-extract-webpack-plugin');
const pack = require("./package.json");

function resolve(dir) {
	return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'
const extract = process.env.NODE_ENV === 'production';
// const publicPath = "/";
const publicPath = `/dynamic-theme-demos/${pack.name}`;
const assetsDir = "assets";
const extractCssOutputDir = `${assetsDir}/css`;
const multipleScopeVars = [
	{
		// 必需
		scopeName: 'theme-default',
		path: path.resolve('src/theme/theme-default.less'),
		// varsContent参数等效于 path文件的内容
		// varsContent:`@primary-color:${defaultPrimaryColor};`
	},

	{
		scopeName: 'theme-red',
		path: path.resolve('src/theme/theme-red.less'),
	},
	{
		scopeName: 'theme-blue',
		path: path.resolve('src/theme/theme-blue.less'),
	},
	{
		scopeName: 'theme-green',
		path: path.resolve('src/theme/theme-green.less'),
	},
	{
		scopeName: 'theme-yellow',
		path: path.resolve('src/theme/theme-yellow.less'),
	},
	{
		scopeName: 'theme-purple',
		path: path.resolve('src/theme/theme-purple.less'),
	},
];
// vue.config.js
const vueConfig = {
	publicPath: isProd ? "./static/" : '/',
	configureWebpack: config => {

		// 开启分离js
		config.optimization = {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 1000 * 60,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
							return `npm.${packageName.replace('@', '')}`
						}
					}
				}
			}
		};

		if (isProd) {
			return {
				plugins: [
					new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
					new CompressionWebpackPlugin({
						algorithm: 'gzip',
						test: productionGzipExtensions,
						threshold: 20480, //大于10kb压缩
						minRatio: 0.8
					}),
					// new BundleAnalyzerPlugin() //打包分析插件 发布时请删除
				]
			}
		} else {
			return {
				plugins: [
					new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
					createThemeColorReplacerPlugin()
				]
			}
		}
	},

	chainWebpack: (config) => {

		config.plugin("define").tap((args) => {
			args[0]["env.themeConfig"] = {
				multipleScopeVars: JSON.stringify(multipleScopeVars),
				extract: JSON.stringify(extract),
				publicPath: JSON.stringify(publicPath),
				extractCssOutputDir: JSON.stringify(extractCssOutputDir),
			};
			return args;
		});
		config
			.plugin("ThemeCssExtractWebpackPlugin")
			.use(ThemeCssExtractWebpackPlugin, [
				{
					multipleScopeVars,
					extract: false,
					outputDir: extractCssOutputDir,
					// 【注意】includeStyleWithColors作用： css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
					includeStyleWithColors: [
						{
							color: ["#ffffff", '#fff'],
							// 排除掉样式属性，这里将非背景的白色提升权重
							excludeCssProps: ["background", "background-color"],
							// 此类颜色的是否跟随主题色梯度变化，默认false
							inGradient: true,
						},
						{
							color: ["transparent", "none"],
						},
					],
				},
			]);

		config.resolve.alias
			.set('@', resolve('src'))
			.set('./BaseMenu', path.resolve(__dirname, 'src/components/_util/BaseMenu.js'))

		// webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
		config.optimization.delete('splitChunks')

		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.oneOf('inline')
			.resourceQuery(/inline/)
			.use('vue-svg-icon-loader')
			.loader('vue-svg-icon-loader')
			.end()
			.end()
			.oneOf('external')
			.use('file-loader')
			.loader('file-loader')
			.options({
				name: 'assets/[name].[hash:8].[ext]'
			})
	},

	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					javascriptEnabled: true,
					// modifyVars: themeColor,
				},
				implementation: getLess({
					// getMultipleScopeVars优先于 sassOptions.multipleScopeVars
					getMultipleScopeVars: () => multipleScopeVars,
				}),
			}
		}
	},

	devServer: {
		port: 8000,
		hot: true
	},
	lintOnSave: false,
	// disable source map in production
	productionSourceMap: false,
	// babel-loader no-ignore node_modules/*
	transpileDependencies: []
}

if (process.env.VUE_APP_PREVIEW === 'true') {
	console.log('VUE_APP_PREVIEW', true)
}

module.exports = vueConfig