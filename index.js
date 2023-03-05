const mongoose = require("mongoose");
const express = require("express");
const routes = require("./src/routes/routes")
const cors = require("cors")

mongoose
	.connect("mongodb://localhost:27017/profile_display", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		const whitelist = ["http://localhost:3000"]
		const corsOptions = {
			origin: function (origin, callback) {
				if (!origin || whitelist.indexOf(origin) !== -1) {
					callback(null, true)
				} else {
					callback(new Error("Not allowed by CORS"))
				}
			},
			credentials: true,
		}
		app.use(cors(corsOptions))
		app.use(express.json()) // new
		app.use("/api", routes)
		app.listen(5000, () => {
			console.log("Server has started! 5000")
		})
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
	})