import { Link } from "react-router-dom";
import { useAuth } from "../../context/providers/AuthContext";
import { useCart } from "../../context/providers/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const NavBar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems, clearCart } = useCart();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Simple ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                {user.role === "admin" && (
                  <Link className="nav-link" to="/kproducts/new">
                    NewProduct
                  </Link>
                )}
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/auth/signup">
                Signup
              </Link>
            )}

            <Link
              className="nav-link active d-flex align-items-center"
              aria-current="page"
              to="/cart"
            >
              <FiShoppingCart />
              <span className="mx-1">Cart</span>
              <span className="badge bg-secondary ms-2">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
