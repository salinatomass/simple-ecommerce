import { useState } from "react";
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

  const [quantity, setQuantity] = useState(0);

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
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                    </div>
                    <h3>${product.price * product.quantity}</h3>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <button
                        className="btn btn-secondary rounded-0"
                        onClick={() => decrementItem(product, quantity)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control d-inline rounded-0 w-25 mx-2"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button
                        className="btn btn-primary rounded-0"
                        onClick={() => addProductToCart(product, quantity)}
                      >
                        +
                      </button>
                    </div>
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
