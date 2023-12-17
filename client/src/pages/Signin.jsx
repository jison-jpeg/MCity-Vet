import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinStart, signinSuccess, signinFailure, setRefreshToken } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import ReCAPTCHA from "react-google-recaptcha";
import Preloader from '../components/Preloader';

export default function Signin() {

  const key = '6LeW5u8oAAAAACoTjVXDIKpFpi0lSBSyFZOcCCfC'
  const [captcha, setCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setCaptcha(true);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captcha) {
      setCaptchaError("Please complete the reCAPTCHA.");
      return;
    }

    if (!formData.email || !formData.password) {
      setCaptchaError("Email and password are required.");
      return;
    }

    setCaptchaError("");

    try {
      dispatch(signinStart());
      const response = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success === false) {
          dispatch(signinFailure(data));
        } else {
          dispatch(signinSuccess(data));
          dispatch(setRefreshToken(data.refreshToken));
          navigate('/dashboard');
        }
      } else {
        console.error('Sign-in failed with status:', response.status);
        dispatch(signinFailure({ message: 'Invalid email or password.' }));
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      dispatch(signinFailure({ message: 'Something went wrong!' }));
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
<Preloader />
      <div className="page-wrapper">
        <header className="header header-sign">
          <div className="header-middle header-middle-simple">
            <div className="header-left">
              <a href="/" className="logo">
                <h1 className="mb-0"><img src="assets/images/logo.png" alt="Caremed Logo" width={185} height={48} /></h1>
              </a>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="height-100vh login-section position-relative bg-section bg-section-signin">
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

                {error && (
                  <span className="term-privacy d-flex justify-content-center">{error.message}</span>
                )}
                {captchaError && (
                  <span className="term-privacy d-flex justify-content-center">{captchaError}</span>
                )}

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

                <div className="pt-4 d-flex flex-column align-items-center">
                  <ReCAPTCHA
                    sitekey={key}
                    onChange={onChange}
                  />
                </div>

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
                src="assets/img/signin/background-1-fore.png"
                alt="image"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
