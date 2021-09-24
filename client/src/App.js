import "./styles/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Providers
import { ProductProvider } from "./context/providers/ProductsContext";
import { AuthProvider } from "./context/providers/AuthContext";
import { CartProvider } from "./context/providers/CartContext";

// Components
import NavBar from "./components/ui/NavBar";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import ProductFormPage from "./pages/products/ProductFormPage";
import ProductEditPage from "./pages/products/ProductEditPage";
import CartPage from "./pages/cart/CartPage";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import NotFoundPage from "./pages/notFound/notFoundPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <div className="App container">
            <Switch>
              <ProductProvider>
                <Route path="/" exact component={HomePage} />
                <Route path="/auth/signup" component={Signup} />
                <Route path="/auth/signin" component={Signin} />
                <Route path="/products/new" component={ProductFormPage} />
                <Route path="/products/edit/:id" component={ProductEditPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/not-found" component={NotFoundPage} />
              </ProductProvider>
            </Switch>
          </div>
        </CartProvider>
      </AuthProvider>
      <Toaster />
    </Router>
  );
}

export default App;
