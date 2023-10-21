import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import the Google logo icon
import axios from 'axios';

export default function Signin() {

  const [formData, setFormData] = useState({}); // [1]
  const [error, setError] = useState(false); // [1
  const [loading, setLoading] = useState(false); // [1]
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); // [2]
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      setError(false);
  
      const response = await axios.post('/backend/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
  
      setLoading(false);
  
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };


  useEffect(() => {
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    dashboardStylesheet.setAttribute('disabled', 'true');
    
    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');
    dashboardBootstrap.setAttribute('disabled', 'true');
  }, []);

  return (
    <>
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
      <div className="page-wrapper">


        {/* <Header /> */}
        {/*----------------------------------------------
	        navigation - start
	    ----------------------------------------------*/}
        <header className="header header-sign">
          <div className="header-middle header-middle-simple">
            <div className="header-left">
              <a href="/" className="logo">
                <h1 className="mb-0"><img src="assets/images/logo.png" alt="Caremed Logo" width={185} height={48} /></h1>
              </a>
            </div>
          </div>
        </header>
        {/*----------------------------------------------
	        navigation - end
	    ----------------------------------------------*/}


        <main className="main">
          <div className="height-100vh login-section position-relative bg-section bg-section-17">
          <form onSubmit={handleSubmit} className="sign-form">
              <div className="form-heading text-center">
                <h4 className="sub-title ls-n-20 line-height-1 mb-2">Welcome back!</h4>
                <span className="heading-desc">Sign in to continue to MCity Vet.</span>
              </div>
              <div className="form-content">
                <div className="input-group input-light">
                  <h6 className="input-title">Email</h6>
                  <input type="email" id='email' className="form-control" placeholder="example@gmail.com" required onChange={handleChange} />
                </div>
                <div className="input-group input-light">
                  <h6 className="input-title">Password</h6>
                  <input type="password" id='password' className="form-control" required onChange={handleChange} />
                </div>
                
                <span className="term-privacy d-flex justify-content-center">{error && "Invalid email or password!"}</span>

                <div className="btn-link">
                  <a href="#">Forgot password?</a>
                </div>
                <button disabled={loading} type="submit" className="btn btn-form btn-secondary-color">
                <span>{loading ? 'Logging In...' : 'Sign In'}</span>
                </button>

                <div className="term-privacy d-flex justify-content-center">
                  <span className="line-height-1">or </span>
                </div>

                <button type="submit" className="btn btn-form btn-primary-color">
                  <span> <FontAwesomeIcon icon={faGoogle} className='google-icon' /> Continue with Google</span>
                </button>

                <div className="term-privacy d-flex justify-content-center">
                  <span className="line-height-1">New to MCity Vet? </span>
                  <div className="btn-link">
                    <a className="line-height-1" href="/signup">
                      Create an Account
                    </a>
                  </div>
                </div>
              </div>
            </form>
            <div className="foreground-img">
              <img
                src="assets/images/backgrounds/background-1-fore.png"
                alt="image"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
