import { useState } from "react";
import { useAuth } from "../../context/providers/AuthContext";

import Spinner from "../../components/ui/Spinner";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { isLoading, signup, errorMessage } = useAuth();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
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
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
