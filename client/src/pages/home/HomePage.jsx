import { useProducts } from "../../context/providers/ProductsContext";
import Hero from "../../components/Hero";
import ProductCard from "../../components/products/ProductCard";

const HomePage = () => {
  const { isLoading, products } = useProducts();

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Hero />
      {products.map((product) => (
        <div className="col-md-3 p-2 pb-5" key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
