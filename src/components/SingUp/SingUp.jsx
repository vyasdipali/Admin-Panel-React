// SignUp.js
import React, { useState } from "react";
import "./SingUp.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserType from "utility/enum";
// import UserType from "../../utility/enum"; // Import the enum

const SingUp = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const history = useHistory();
  const [data, setData] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    referralCode: "",
    userType: 0, // Initially set to 0
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "userType" ? parseInt(value) : value,
    });
    if (name === "userType") {
      console.log(`Selected user type: ${parseInt(value)}`);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_ENDPOINT) {
      console.error("API endpoint is not defined");
      setResponse({
        error:
          "API endpoint is not defined. Please check your environment variables.",
      });
      return;
    }
    try {
      const res = await axios.post(`${API_ENDPOINT}Auth/SignUp`, data);
      setResponse(res.data);
      const token = res.data.data.token;
      const userID = res.data.data.userID;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userID", userID);
      history.push("/admin/dashboard", { state: { token } });
      alert("Signup successful");
    } catch (error) {
      console.error("Error making POST request:", error);
      setResponse({ error: "Failed to sign up. Please try again." });
    }
  };
  return (
    <div>
      <section className="logins">
        <div className="container">
          <div className="row" align="center">
            <div className="col-lg-6 mx-auto">
              <div className="card">
                <div className="login-form">
                  <div className="login">
                    <h1>SingUp</h1>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        firstName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your firstName"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>
                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        lastName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your lastName"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>
                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        phoneNumber
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Your phoneNumber"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>
                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        referralCode
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Your referralCode"
                        name="referralCode"
                        value={data.referralCode}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>

                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="UserType">User Type</label>
                      <select
                        name="userType"
                        value={data.userType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select User Type
                        </option>
                        {Object.entries(UserType).map(([key, value]) => (
                          <option key={key} value={value}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>

                    <div className="mb-3 mb-3 d-flex flex-wrap align-items-center">
                      <label htmlFor="" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        aria-invalid="false"
                      />
                    </div>
                    <div className="login-btn mb-3">
                      <button id="login" className="login-button" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Link to="/Login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingUp;
