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
    let imageUrl = { secure_url: "" };
    const { name, price, description, quantity } = req.body;

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
      quantity,
      images: {
        url: imageUrl.secure_url,
      },
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (err) {
    console.error("ups: ", err);
    next(createError.BadRequest(err._message));
  }
};

export const updateProduct = (req, res) => {
  res.json("updating products");
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
