let mongoose = require('mongoose'),
	assert = require('assert');

let Schema = mongoose.Schema;

let bookSchema = new Schema({
	title: String,
	writers: String,
	cover: String,
	url: String,
	rating: String,
	rating_count: String
});
let book = mongoose.model('book', bookSchema);
//自动映射到films的collection
//自定义表名：let Film = new Schema({..}, { collection: 'name' });

// let db = mongoose.connect('mongodb://127.0.0.1:27017/nodejs-douban');
mongoose.connect('mongodb://yjx:123@127.0.0.1:27017/myfirstdb').then(
	() => {
		console.log("")
		/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
	},
	err => {
		console.log(err);
		/** handle initial connection error */
	}
);
module.exports = {
	book: book
};