import Product from "../models/Product";
import createError from "http-errors";
import { uploadImage } from "../helpers/cloudinary";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) return res.json(product);

    return res.sendStatus(404);
  } catch (err) {
    console.error(err.status);
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    let imageUrl = { secure_url: "" };
    const { name, price, description, stock } = req.body;

    const nameProductFound = await Product.findOne({ name });
    if (nameProductFound)
      return next(createError.Conflict("Product already exits"));

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      imageUrl = result;
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      images: {
        url: imageUrl.secure_url,
      },
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (err) {
    console.error(err);
    next(createError.BadRequest(err._message));
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    let update = changes;

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      update = { ...update, images: { url: result.secure_url } };
    }

    const productUpdated = await Product.findByIdAndUpdate(id, update);

    if (productUpdated) return res.sendStatus(201);

    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDeleted = await Product.findByIdAndDelete(id);
    if (productDeleted) return res.sendStatus(204);

    return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
