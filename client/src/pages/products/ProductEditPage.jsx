import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProducts } from "../../context/providers/ProductsContext";

import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const ProductEditPage = ({ history }) => {
  const { edit, loadProduct, changeProduct, isLoading, errorMessage } =
    useProducts();
  const { id } = useParams();

  const [product, setProduct] = useState(edit);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const findProduct = async () => {
      const productFound = await loadProduct(id);
      if (!productFound) {
        history.push("/not-found");
      }
    };
    findProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => setProduct(edit), [edit]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: parseInt(e.target.value) || e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
      formData.append("image", selectedImage);

      const productUpdated = await changeProduct(id, formData);

      if (!productUpdated) throw new Error(errorMessage || "Upps! try again");

      toast.success("Product update successfuly", { position: "bottom-right" });
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row h-100 pt-5">
      <div className="col-md-8 offset-md-2 my-auto">
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Edit product</h1>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={product === edit}
              >
                {isLoading ? <Spinner /> : "Edit"}
              </button>
            </div>
            <div className="col-md-7">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control mb-3 mt-2"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
              <label htmlFor="price">Price (USD)</label>
              <input
                type="number"
                id="price"
                className="form-control mb-3 mt-2"
                value={product.price}
                name="price"
                onChange={handleChange}
              />

              <label htmlFor="stock">Stock quantity</label>
              <input
                type="number"
                id="stock"
                className="form-control mb-3 mt-2"
                value={product.stock}
                name="stock"
                onChange={handleChange}
              />

              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="2"
                id="description"
                className="form-control mt-2"
                value={product.description}
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
                    : product.images.url
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

export default ProductEditPage;
