const Hero = () => {
  return (
    <section className="py-3 text-center container">
      <div className="row py-lg-4">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">My simple E-commerce</h1>
          <p className="lead text-muted">
            This is an example application created with the MERN stack to
            understand the flow of creating a modern app.
          </p>
          <p>
            <a href="#!" className="btn btn-primary my-2">
              Main call to action
            </a>
            <a href="#!" className="btn btn-secondary my-2">
              Secondary action
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
