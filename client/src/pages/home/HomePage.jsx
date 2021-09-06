import { useContext } from "react";
import { ProductContext } from "../../context/providers/ProductsContext";
import Hero from "../../components/Hero";

const HomePage = () => {
  const { isLoading, products } = useContext(ProductContext);

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Hero />
      {products.map((product) => (
        <div className="col-md-4">
          <div className="card card-body" key={product._id}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
