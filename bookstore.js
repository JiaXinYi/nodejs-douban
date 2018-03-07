/**
 * Created by hao.cheng on 2016/11/19.
 */
let superagent = require('superagent'),
	cheerio = require('cheerio'),
	http = require('http'),
	fs = require('fs');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer(function (request, response) {
// 	response.writeHead(200, {
// 		'Content-Type': 'text/plain'
// 	});
// 	// response.end('hello world\n');
// });
// server.listen(port, hostname, () => {
// 	console.log('Server running at http://127.0.0.1:3000');

// })


// mongo = require('./mongo');
// 数据来源
const URL = 'https://www.jianshu.com/p/200b383818f3/';
let request = require('request');
superagent.get(URL)
	.end((err, res) => {
		var $ = cheerio.load(res.text);
		var data = [];
		for (var i = 1; i < 10; i++) {
			var _data = {
				title: '',
				description: '',
				url: '',
				location: {}
			};
			_data.title = $('.show-content-free p strong').eq(i).text();
			_data.description = $('.show-content-free p strong').eq(i).parent().text().replace(/\n/g, "");
			_data.url = $('.show-content-free p strong').eq(i).parent().nextAll().find('img').first().attr('data-original-src');

			console.log(_data);
			data.push(_data);
		}
		// 创建一个可写流
		// var writerStream = fs.createWriteStream('output.json');
		// writerStream.write(data);
		// var fs = require('fs');
		// 某些操作，保存app
		fs.writeFile('output.json', JSON.stringify(data),
			function (err) {
				if (err) throw err;
			});

	})