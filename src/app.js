const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
	const restaurants = await Restaurant.findAll();
	res.json(restaurants);
});
app.get(`/restaurants/:id`, async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findByPk(id);
	res.json(restaurant);
});
app.post("/addRestaurant", async (req, res) => {
	const { name, location, cuisine } = req.body;
	console.log(name);
	await Restaurant.create({
		name,
		location,
		cuisine,
	});
	res.json("Restaruant successfully added!");
});
app.put("/restaurants/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let restaurant = await Restaurant.findByPk(id);
		restaurant = await restaurant.update(req.body);
		res.json(restaurant);
	}catch(error){
		console.error(error);
		next(error);
	}
});
app.delete("/restaurants/:id", async (req, res) => {
	const { id } = req.params;
	let restaurant = await Restaurant.findByPk(id);
	restaurant = await restaurant.destroy();
	res.json(restaurant);
});

module.exports = app;
