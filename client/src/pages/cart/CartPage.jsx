import { useProducts } from "../../context/providers/ProductsContext";
import { FiTrash } from "react-icons/fi";

const CartPage = () => {
  const { cart } = useProducts();

  if (cart.length === 0) return <h1 className="mt-5">Empty Cart</h1>;

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <header className="my-5 d-flex justify-content-between">
          <h2>Your Shopping List</h2>
          <h4>1000$</h4>
        </header>

        {cart.map((product) => (
          <div className="card rounded-0 my-2" key={product._id}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-fluid"
                    src={product.images.url}
                    alt={product.name}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between">
                      <h2 className="h4">{product.name}</h2>
                      <h3>${product.price}</h3>
                    </div>
                    <div>
                      <button className="btn btn-primary rounded-0 me-3">
                        +
                      </button>
                      <input
                        type="number"
                        className="form-control d-inline rounded-0 w-25"
                      />
                      <button className="btn btn-secondary rounded-0 ms-3">
                        -
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-danger rounded-0 d-flex align-items-center">
                      <FiTrash className="me-2" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
