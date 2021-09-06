import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProductProvider } from "./context/providers/ProductsContext";

// Components
import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/home/HomePage.jsx";
import ProductForm from "./pages/products/ProductForm";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App container">
        <Switch>
          <ProductProvider>
            <Route path="/" exact component={HomePage} />
            <Route path="/products/new" component={ProductForm} />
          </ProductProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
