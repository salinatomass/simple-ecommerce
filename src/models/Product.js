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
    desciption: {
      type: String,
      trim: true,
    },
    quantitiy: {
      type: Number,
      default: 0,
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
