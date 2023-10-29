import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'; 
import OAuth from '../components/OAuth';

export default function Signin() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(signinStart());
      const response = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

  
      const data = await response.json();
      if (data.success === false) {
        dispatch(signinFailure(data));
        return;
      }
      dispatch(signinSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signinFailure(error));
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
                
                <span className="term-privacy d-flex justify-content-center">{error ? error.message || 'Something went wrong!' : ''}</span>

                <div className="btn-link">
                  <a href="#">Forgot password?</a>
                </div>
                <button disabled={loading} type="submit" className="btn btn-form btn-secondary-color">
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                </button>

                <div className="term-privacy d-flex justify-content-center">
                  <span className="line-height-1">or </span>
                </div>


                <OAuth /> 

                {/* <button type="submit" className="btn btn-form btn-primary-color">
                  <span> <FontAwesomeIcon icon={faGoogle} className='google-icon' /> Continue with Google</span>
                </button> */}

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
