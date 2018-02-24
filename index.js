// 豆瓣2017年度读书榜单爬取

let superagent = require('superagent'), //nodejs里面一个非常方便的客户端代理请求模块，支持get,post,put,delete等
	assert = require('assert'); //异常抛出判断模块，assert.equal(err, null);  如果err不为null,则直接抛出异常

let mongo = require('./mongo');

//获取高分图书清单，得到豆瓣对应详情页的url
const URL = 'https://book.douban.com/ithil_j/activity/book_annual2017/widget/1'

superagent.get(URL)
	.end((err, res) => {
		// let data = [];
		//榜单类别名称
		let title = res.body.res.payload.title;
		//列表数据
		let subjects = res.body.res.subjects
		subjects.forEach((val) => {
			var _data = {
				title: '',
				writers: '',
				cover: '',
				url: '',
				rating: ''
			}
			_data.title = val.title;
			_data.writers = val.writers;
			_data.cover = val.cover;
			_data.url = val.url;
			_data.rating = val.rating;

			// data.push(_data);
			mongo.book.create(_data, (err, doc) => {
				assert.equal(err, null);
				console.log(doc);
			})

		});
	})