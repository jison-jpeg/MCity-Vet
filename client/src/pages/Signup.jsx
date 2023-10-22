import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function Signup() {
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

      const response = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // const response = await axios.post('/backend/auth/signup', formData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
  
      const data = response.data;
  
      setLoading(false);
  
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/signin')

    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  

  useEffect(() => {
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    dashboardStylesheet.setAttribute('disabled', true);

    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');
    dashboardBootstrap.setAttribute('disabled', true);
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
        <div className="height-100vh login-section signup-section position-relative bg-section bg-section-18">

          <form onSubmit={handleSubmit} className="sign-form">
            <div className="form-heading text-center">
              <h4 className="sub-title ls-n-20 line-height-1 mb-3">Register Account</h4>
              <span className="heading-desc">
                Complete the form below to create your account.
              </span>
            </div>
            <div className="col-sm">
              <div className="form-content">
                <div className="input-group input-light">
                  <h6 className="input-title">Name</h6>
                  <input type="text" id='firstName' className="form-control" placeholder="First Name" required onChange={handleChange} />
                  <input type="text" id='lastName' className="form-control" placeholder="Last Name" required onChange={handleChange} />
                </div>
                <div className="input-group input-light">
                  <h6 className="input-title">Email</h6>
                  <input type="email" id='email' className="form-control" placeholder="example@gmail.com" required onChange={handleChange} />
                </div>
                <div className="input-group input-light">
                  <h6 className="input-title">Password</h6>
                  <input type="password" id='password' className="form-control" required onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="term-privacy d-flex justify-content-center">
              <span className="line-height-10">{error && "Email has been already exist!"}</span>
            </div>

            <button disabled={loading} type="submit" className="btn btn-form btn-secondary-color">
              <span>{loading ? 'Signing Up...' : 'Sign Up'}</span>
            </button>

            <div className="term-privacy d-flex justify-content-center">
              <span className="line-height-1">or</span>
            </div>

            {/* <button type="submit" className="btn btn-form btn-primary-color">
              <span><FontAwesomeIcon icon={faGoogle} className='google-icon' /> Sign up with Google</span>
            </button> */}

            <OAuth />

            <div className="term-privacy d-flex justify-content-center">
              <span className="line-height-1">Already have an account?</span>
              <div className="btn-link">
                <a className="line-height-1" href="/signin">
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="foreground-img">
            <img src="assets/images/backgrounds/background-2-fore.png" alt="image" />
          </div>
        </div>
      </main>
    </>
  );
}
