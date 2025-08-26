import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config(); // To load environment variables from .env file and sets them into process.env

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // Allows an Express.js app to automatically parse incoming JSON data in the request body
// Without express.json(), req.body would be undefined when sending JSON data in a POST request.

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("/{*any}", (req, res) => {
		// "*" (instead of "/{*any}") works only in development but not in production.
		// All paths match * other than /api/products (since that path is already matched above)
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at http://localhost:${PORT}`);
});
