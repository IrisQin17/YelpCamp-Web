var mongoose    = require("mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment");
	data = [
		{
			name: "Salmon Creek",
		 	image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
			description: "Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!Beautiful and clean!"
		},
		{
			name: "Granite Hill", 
		 	image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80",
			description: "High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!High hill and fresh air!"
		},
		{
			name: "Mountain Goat's Rest",
		 	image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
			description: "Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!Splendid rest!"
		}
	];
	

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err)
			console.log(err);
		console.log("removed campgrounds!");
		// Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err)
					console.log(err);
				else {
					console.log("added a campground");
					Comment.create(
					{
						text: "Great place, but better to have WIFI!",
						author: "Homer"
					}, function(err, comment){
						if(err)
							console.log(err);
						else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment");
						}	
					});
				}
			});
		});
	});
}
module.exports = seedDB;
