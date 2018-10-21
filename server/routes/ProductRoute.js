const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const ProductRoute = express.Router();
var cloudinary = require('cloudinary');
var Photo= require('../models/Photo');
var mongoose = require('mongoose');
const fs = require('fs');
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
	extended: true
}));
let fileStoredName = '';
// Require Post model <in our routes module
let Product = require('../models/Product');
// Defined store route
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
      cb(null, 'public/uploads')
	} 
})
var upload = multer({
	storage: storage, 
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})

// route file 
ProductRoute.route('/file')
	.post(upload.single('file'), function (req, res) {
 		cloudinary.config({ 
			cloud_name:"clouname"  ,  
			api_key: "apikey" , 
			api_secret:"apisecret"  
		  });
		  cloudinary.uploader.upload(req.file.path, function(result) { 
			  var photo = new Photo();
				photo.name = req.body.name;
				photo.picture = result.url;
		 	  photo.save(function(err, photos){
				if(err) 
				  res.send(err);
				res.json({ message: 'photographed place created.'});
				console.log("d",photos.picture);
				fileStoredName= photos.picture; 
			  }); })

	})
ProductRoute.route('/addproduct').post(function (req, res) {
 	req.body.img = fileStoredName;
	let product = new Product(req.body);
	product.save()
		.then(product => {
			res.status(200).json(product);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});
 
 
 


module.exports = ProductRoute;
