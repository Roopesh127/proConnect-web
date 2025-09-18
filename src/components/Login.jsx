import axios from "axios";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("@gmail.com");
  const [password, setPassword] = useState("@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      // setError(err?.response?.)
      console.error(err);
      setError(err.response?.data?.message || "Something went Wrong!!!");
    }
  };

  const handleSingnup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SingUp"}
          </h2>

          {!isLoginForm && (
            <div className="flex flex-col">
              <label className="form-control w-full max-w-xs flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter your mail id here......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs py-4 flex flex-col gap-1">
                <div className="label">
                  <span className="label-text-alt">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter your password here......"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          )}

          <div className="flex flex-col">
            <label className="form-control w-full max-w-xs flex flex-col gap-1">
              <div className="label">
                <span className="label-text-alt">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter your mail id here......"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs py-4 flex flex-col gap-1">
              <div className="label">
                <span className="label-text-alt">Password</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Enter your password here......"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="card-actions justify-center flex flex-col items-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSingnup}
            >
              {isLoginForm ? "LogIn" : "SignUp"}
            </button>
          </div>

          <p
            className="m-auto py-4 cursor-pointer"
            onClick={() => setLoginForm((val) => !val)}
          >
            {isLoginForm
              ? "not register? SingUp please"
              : "already resistered? then Login Please!!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
