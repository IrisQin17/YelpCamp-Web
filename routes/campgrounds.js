var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");
var middleware = require("../middleware");

// INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});	
});

//CREATE ROUTE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res) {
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCamp = {name: name, image: image, description: desc, author:author, price:price};
	Campground.create(newCamp, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//NEW ROUTE - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW ROUTE - show more info about one campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground:foundCamp});	
		}
	});
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCamp){
		res.render("campgrounds/edit", {campground:foundCamp});
	});
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds/" + req.params.id);
	});
	// redirect somewhere(show page)
	
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds");
	});
});

module.exports = router;
