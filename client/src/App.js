import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProductProvider } from "./context/providers/ProductsContext";
import { AuthProvider } from "./context/providers/AuthContext";

// Components
import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/home/HomePage.jsx";
import ProductForm from "./pages/products/ProductForm";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <div className="App container">
          <Switch>
            <ProductProvider>
              <Route path="/" exact component={HomePage} />
              <Route path="/auth/Signup" component={Signup} />
              <Route path="/products/new" component={ProductForm} />
            </ProductProvider>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
