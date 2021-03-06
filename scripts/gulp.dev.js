/**
 * @author  https://github.com/silence717
 * @date on 2016/11/09
 * @desc [开发环境gulp任务]
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var config = require('./gulp.conf');
var proxyMiddleware = require('http-proxy-middleware');

module.exports = function () {
	
	// 配置代理路径，是否为本地mock
	var target = '';
	var isLocal = true;

	if (isLocal) {
		target = 'http://localhost:4001';
	} else {
		// todo 这里可以配置成你需要连接的API服务地址
	}	
	var devTask = {
		// browserSync任务
		browserSync: function() {
			var middleware = proxyMiddleware(['/web/'], {target: target, changeOrigin: true});
			browserSync({
				server: {
					baseDir: './',
					index: 'src/index.html',
					middleware: middleware
				},
		        port: 8080,
		        notify: false
			});
		},
		// 开发任务
		browserSyncDist: function() {
			var middleware = proxyMiddleware(['/web/'], {target: target, changeOrigin: true});
			browserSync({
				server: {
					baseDir: './',
					index: 'dist/index.html',
					middleware: middleware
				},
		        port: 8080,
		        notify: false
			});
		},
		// watch 任务
		watch: function() {
			watch('src/**/*.js', function() {
				gulp.run('inject');
			});
			watch('src/**/*.scss', function() {
				gulp.run('styles');
			});
			watch('src/**/*.html', function() {
//				return gulp.src('src/**/*.html')
//      		.pipe(browserSync.reload({stream:true}));
				gulp.run('devHtml');
			});
		}
	};
	return devTask;
}();