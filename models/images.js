var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	overlay: String,
	main: String
});

var Image = mongoose.model('image', imageSchema);

module.exports = Image;