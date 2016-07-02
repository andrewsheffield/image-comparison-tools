var express = require('express');
var router = express.Router();
var Image = require('../models/images.js');

Image.find({}, function(err, data) {
	console.log(data);
	if (data.length <= 0) {
		var newImage = new Image({
			overlay: "/images/1/dsm.png",
			main: "/images/1/ortho.png"
		});
		newImage.save(function (err, data){
			if (err) console.log(error)
			else
				console.log(data);
		});
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	Image.find({}, function(err, data) {
		if (err) {
			console.log(err)
			res.status(500).send({error: err})
		} else {
			res.render('index', {
				title: 'Image Overlay Tool',
				images: data
			});
		}
	});
  
});

router.get('/image_app/:image_id', function(req, res, next) {
	var image_id = req.params.image_id;
	Image.findOne({_id: image_id}, function(err, image) {
		if (err) res.send(err);
		res.render('image_app', {
			title: 'Image App',
			image: image
		});
	});
	
});

module.exports = router;
