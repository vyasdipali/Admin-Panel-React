import React from 'react'
import { Link } from 'react-router-dom'
import'./Login.css'

const Login = () => {
  return (
 <div>

<section className='logins'>
        <div className='container'>
            <div className="row" align="center">
                <div className="col-lg-6 mx-auto">
                    <div className="card">
                        <div className="login-form">
                        <div className="login">
                            <h1>login</h1>
                        </div>
                            <form action="">
                                <div className="mb-3 d-flex flex-wrap align-items-center">
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <input type="text" className='form-control' placeholder='Enter Your Email' />
                                </div>
                                <div className="mb-3 mb-3 d-flex flex-wrap align-items-center">
                                    <label htmlFor="" className='form-label'>Password</label>
                                    <input type="password" className='form-control' placeholder='Enter your password' />
                                </div>
                                <div className="login-btn">
                                    <Link to="/Layout"><button className='btn'>Login</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
 </div>

  )
}

export default Login
