var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	overlay: string,
	main: string
});

var Image = mongoose.model('image', imageSchema);

module.exports = Image;