import Product from "../models/Product";
import createError from "http-errors";
import { uploadImage } from "../helpers/cloudinary";

export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

export const getProduct = (req, res) => {
  res.json("get product");
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, quantity } = req.body;

    const nameProductFound = await Product.findOne({ name });
    if (nameProductFound)
      return next(createError.Conflict("Product already exits"));

    const resultImage = await uploadImage(req.files.image.tempFilePath);
    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      images: {
        url: resultImage.secure_url || "",
      },
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (err) {
    console.error(err._message);
    next(createError.BadRequest(err._message));
  }
};

export const updateProduct = (req, res) => {
  res.json("updating products");
};

export const deleteProduct = (req, res) => {
  res.json("deleting products");
};
