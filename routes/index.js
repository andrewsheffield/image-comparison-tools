var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Overlay Tool' });
});

router.get('/image_app', function(req, res, next) {
	var images = {
		overlay: "/images/1/dsm.png",
		main: "/images/1/ortho.png"
	}
	res.render('image_app', {
		title: 'Image App',
		images: images
	});
});

module.exports = router;
