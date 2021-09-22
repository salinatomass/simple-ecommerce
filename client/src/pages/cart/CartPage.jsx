import { useCart } from "../../context/providers/CartContext";
import { FiTrash } from "react-icons/fi";
import PaypalComponent from "../../components/paypal/PaypalButton";

const CartPage = () => {
  const {
    items,
    totalPrice,
    addProductToCart,
    removeItemFromCart,
    clearCart,
    decrementItem,
  } = useCart();

  if (items.length === 0) return <h1 className="mt-5">Empty Cart</h1>;

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <header>
          <div className="mt-5 d-flex justify-content-between">
            <h2>Your Shopping List</h2>
            <h4>{totalPrice}$</h4>
          </div>
          <button
            className="mb-5 mt-4 btn btn-secondary"
            onClick={() => clearCart()}
          >
            Clear cart
          </button>
        </header>

        {items.map((product) => (
          <div className="card rounded-0 my-2" key={product._id}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-fluid"
                    src={
                      product.images && product.images.url
                        ? product.images.url
                        : "/assets/no-image.png"
                    }
                    alt={product.name}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h2 className="h4">{product.name}</h2>
                      <div className="mb-3">
                        <span>Quantity: {product.quantity}</span>
                        <button
                          className="btn btn-secondary btn-sm mx-2"
                          onClick={() => decrementItem(product)}
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addProductToCart(product)}
                          disabled={product.quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                      <p>Price: {product.price}</p>
                      <p>Stock: {product.stock}</p>
                    </div>
                    <h3>${product.price * product.quantity}</h3>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => removeItemFromCart(product)}
                      className="btn btn-danger rounded-0 d-flex align-items-center"
                    >
                      <FiTrash className="me-2" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end py-5">
          <div className="w-50">
            <PaypalComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
