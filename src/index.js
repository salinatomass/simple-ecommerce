import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import "./config/mongoose";
import { PORT } from "./config";

import productRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.use(productRoutes);
app.use(authRoutes);
app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message || "Server error",
  };
  res.status(error.status).json(error);
});

app.listen(PORT);
console.log("Server on port", PORT);
