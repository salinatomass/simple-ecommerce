import express from "express";
import cors from "cors";
import morgan from "morgan";

import "./config/mongoose";
import { PORT } from "./config";

import productRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(productRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message,
  };

  res.status(error.status).json(error);
});

app.listen(PORT);
console.log("Server on port", PORT);
