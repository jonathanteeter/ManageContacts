var db = require("../models");

module.exports = function(app) {
	app.get("/", function(req, res) {
		// this route should find all contacts in the table and render them using the Handlebars 'contacts' template, sorted ascending by firstName
		// res.send("Hit the index page"); // First verify route to page
		db.Contact.findAll({ // find everything in table {}, 
			order: [["lastName", "ASC"], ["firstName", "ASC"]]
		}).then(function (contacts) {
			res.render("contacts", { name: "Jonathan's", favSaying: "Gratitude is a Great Attitude!", contacts: contacts }); // 2 key value pairs
			// pass in handlebars template to render, 2nd arg must be object
			// must take array 'contacts' and place into object 'contacts' as above
		})
	});

	app.get("/api/contacts", function(req, res) {
		// this route should find all contacts in the table and display them as JSON
		db.Contact.findAll({ // find everything in table {}, 
			order: [["lastName", "ASC"], ["firstName", "ASC"]]
		}).then(function (contacts) {
			res.json(contacts);
		})
	});

	app.post("/api/contacts", function(req, res) {
		// this route should add a new contact to the table, and should then redirect to the route '/api/contacts'
		// console.log("howdi");
		// res.json(req.body);
		db.Contact.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			contactType: req.body.contactType,
			phoneNumber: req.body.phoneNumber || null, // validate
			emailAddress: req.body.emailAddress || null
		}).then(function(newContact) {
			console.log('New contact: ');
			console.log(newContact);
			res.redirect("/api/contacts");  // need some res. method here
		})
	});

	app.delete("/api/contacts/:id", function(req, res) {
		// this route should delete a contact from the table, if the id matches the ':id' url param
		db.Contact.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbContact) {
			res.json(dbContact)
		});
	});
};