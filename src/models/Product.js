import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // avoid space errors
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      url: String,
    },
    category: {},
  },
  {
    timestamps: true, // createdAt and updatedAt
    versionKey: false,
  }
);

export default model("Product", ProductSchema);
