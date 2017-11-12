import express from "express";
import consign from "consign";

// const PORT = 3000;
const app = express();

// app.set("json spaces", 1);

consign()
	.include("libs/config.js")
	.then("db.js")
	.then("auth.js")
	.then("libs/middlewares.js")
	.then("routes")
	.then("libs/boot.js")
	.into(app);

// app.listen(PORT, () => console.log(`StudentDir API started on Port: ${PORT}`));