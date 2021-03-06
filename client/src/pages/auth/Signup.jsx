import { useState } from "react";
import { useAuth } from "../../context/providers/AuthContext";
import { Link } from "react-router-dom";

import Spinner from "../../components/ui/Spinner";

const Signup = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { isLoading, signup, errorMessage } = useAuth();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await signup(user);
      if (userResponse) history.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row h-100">
      <div className="col-md-4 offset-md-4 p-2 my-auto">
        <div className="card card-body">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control rounded-0"
                placeholder="email@example.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control rounded-0"
                placeholder="Write your password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-0"
              disabled={!user.email || !user.password || isLoading}
            >
              {isLoading ? <Spinner /> : "Signup"}
            </button>

            <p className="mt-4">
              Do you have an Account? <Link to="/auth/signin">Login</Link>
            </p>

            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
