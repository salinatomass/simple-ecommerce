const ProductCard = ({ product }) => {
  const { name, price, description, images } = product;
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
        <div className="">
          <button className="btn btn-primary btn-s rounded-0">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
