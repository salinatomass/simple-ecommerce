import { FiShoppingCart, FiTrash } from "react-icons/fi";
import { useProducts } from "../../context/providers/ProductsContext";
import { useAuth } from "../../context/providers/AuthContext";
import { useCart } from "../../context/providers/CartContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { _id, name, price, description, images, stock } = product;

  const { removeProduct } = useProducts();
  const { user, isLoggedIn } = useAuth();
  const { addProductToCart } = useCart();

  const handleCart = (product) => {
    addProductToCart(product);
    toast.success("Product added to cart", { position: "bottom-right" });
  };

  const handleDelete = async (id) => {
    const deletedProduct = await removeProduct(id);
    if (deletedProduct)
      toast.success("Product deleted succesfuly", { position: "bottom-right" });
  };

  return (
    <div className="card rounded-0">
      <img
        src={images && images.url ? images.url : "/assets/no-product.png"}
        alt=""
        className="w-75 m-auto"
      />
      <div className="card-body">
        <h2 className="h3">{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <p>Stock: {stock}</p>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary btn-sm rounded-0 d-flex align-items-center"
            onClick={() => handleCart(product)}
          >
            <FiShoppingCart />
            <span className="ms-2">Add to cart</span>
          </button>
          {isLoggedIn && user.role === "admin" && (
            <button
              className="btn btn-secondary btn-sm rounded-0 d-flex align-items-center"
              onClick={() => handleDelete(_id)}
            >
              <FiTrash />
              <span className="ms-2">Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
