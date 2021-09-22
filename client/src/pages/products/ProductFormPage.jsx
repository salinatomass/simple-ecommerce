import { useState } from "react";
import { useProducts } from "../../context/providers/ProductsContext";

import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const ProductFormPage = ({ history }) => {
  const { addNewProduct, isLoading, errorMessage } = useProducts();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
      formData.append("image", selectedImage);

      const productCreated = await addNewProduct(formData);

      if (!productCreated) throw new Error(errorMessage || "Upps! try again");

      toast.success("🚀 New product added", { position: "bottom-right" });
      history.push("/");
    } catch (err) {
      errorMessage
        ? toast.error(errorMessage, { position: "bottom-right" })
        : toast.error(err || "", { position: "bottom-right" });
    }
  };

  return (
    <div className="row h-100">
      <div className="col-md-8 offset-md-2 my-auto">
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Save product</h1>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!product.name || isLoading}
              >
                {isLoading ? <Spinner /> : "Save"}
              </button>
            </div>
            <div className="col-md-7">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control mb-3"
                name="name"
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                className="form-control mb-3"
                value={product.price}
                name="price"
                onChange={handleChange}
              />

              <label htmlFor="stock">Stock quantity</label>
              <input
                type="text"
                id="stock"
                className="form-control mb-3"
                name="stock"
                onChange={handleChange}
              />

              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="2"
                id="description"
                className="form-control"
                onChange={handleChange}
              ></textarea>
              <label htmlFor="image"></label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div>
            <div className="col-md-5 my-auto">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : "/assets/no-image.png"
                }
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;
