import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
    console.log("API_ENDPOINT: ", API_ENDPOINT);

    const history = useHistory();
    const [data, setData] = useState({ password: '', email: '' });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!API_ENDPOINT) {
          console.error('API endpoint is not defined');
          setResponse({ error: 'API endpoint is not defined. Please check your environment variables.' });
          return;
        }
        try {
          const res = await axios.post(`${API_ENDPOINT}Auth/AdminLogin`, data);
          setResponse(res.data); 
          const token = res.data.data.token;
          const userID = res.data.data.userID;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userID', userID);
          history.push('/admin/dashboard', { state: { token } });
          console.log("userID>>", userID);
          alert("Login successful");
        } catch (error) {
          console.error('Error making POST request:', error);
          setResponse({ error: 'Failed to login. Please try again.' });
        }
      };

    return (
        <div>
            <section className='logins'>
                <div className='container'>
                    <div className="row" align="center">
                        <div className="col-lg-6 mx-auto">
                            <div className="card">
                                <div className="login-form">
                                    <div className="login">
                                        <h1>Login</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3 d-flex flex-wrap align-items-center">
                                            <label htmlFor="" className='form-label'>Email</label>
                                            <input type="email" className='form-control' placeholder='Enter Your Email' name="email" value={data.email} onChange={handleChange}  required aria-invalid="false" />
                                        </div>
                                        <div className="mb-3 mb-3 d-flex flex-wrap align-items-center">
                                            <label htmlFor="" className='form-label'>Password</label>
                                            <input type="password" className='form-control' placeholder='Enter your password' name="password" value={data.password} onChange={handleChange} required aria-invalid="false" />
                                        </div>
                                        <div className="login-btn mb-3">
                                            <button id="login" className="login-button" type="submit"> Login  </button>
                                            
                                        </div>
                                    </form> 
                                    
                                </div>

                           <div style={{display:"flex",justifyContent:"s"}}>
                           <Link to="/SingUp" >SingUp</Link>
                           </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
