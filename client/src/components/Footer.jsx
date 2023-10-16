import React from "react";

export default function Footer() {
  return (
    <>

  {/*----------------------------------------------
		footer - start
		----------------------------------------------*/}
  <footer className="footer bg-primary-color">
    <div className="container">
      <div className="footer-top">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-lg-6 col-sm-7 col-10">
            <a href="index.html" className="logo">
              <img src="assets/images/logo-sm.png" alt="Caremed Logo" width={185} height={48} />
            </a>
          </div>
          <div className="col-lg-6 col-sm-7 col-10 d-lg-flex justify-content-lg-end">
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-twitter" /><span>Twitter</span></a>
              <a href="#" className="social-link"><i className="fab fa-facebook" /><span>Facebook</span></a>
              <a href="#" className="social-link"><i className="fab fa-youtube" /><span>Youtube</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-middle">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-3 col-sm-7 col-10">
              <div className="info-box">
                <h6 className="info-title">Company</h6>
                <ul className="info-list">
                  <li><a href="#" className="info-link">About</a></li>
                  <li><a href="#" className="info-link">Our Doctors</a></li>
                  <li><a href="#" className="info-link">Latest Blog</a></li>
                  <li><a href="#" className="info-link">Careers</a></li>
                  <li><a href="#" className="info-link">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-7 col-10">
              <div className="info-box">
                <h6 className="info-title">Support</h6>
                <ul className="info-list">
                  <li><a href="#" className="info-link">Reviews</a></li>
                  <li><a href="#" className="info-link">FAQs</a></li>
                  <li><a href="#" className="info-link">Help Center</a></li>
                  <li><a href="#" className="info-link">Doctors</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-7 col-10">
              <div className="info-box">
                <h6 className="info-title">Legal</h6>
                <ul className="info-list">
                  <li><a href="#" className="info-link">Term of use</a></li>
                  <li><a href="#" className="info-link">Code of Conduct</a></li>
                  <li><a href="#" className="info-link">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-7 col-10">
              <div className="info-box">
                <h6 className="info-title">Company</h6>
                <form className="input-group input-footer">
                  <input type="email" className="form-control" placeholder="Email address" required />
                  <button type="submit" className="form-action"><i className="fas fa-check-circle" /></button>
                </form>
                <p>Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12 col-sm-7 col-10">
            <p>© GFXPARTNER</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/*----------------------------------------------
		footer - end
		----------------------------------------------*/}
    
  <button id="scroll-top" title="Back to Top"><i className="fal fa-angle-up" /></button>
  <div className="mobile-menu-overlay" />
  <div className="mobile-menu-container mobile-menu-light">
    <div className="mobile-menu-wrapper">
      <span className="mobile-menu-close"><i className="fal fa-times" /></span>
      <div className="input-group input-light input-search mt-2">
        <input type="text" className="form-control search-control border-none mr-1 ml-1" placeholder="search" />
        <button type="submit" className="btn-search"><i className="fas fa-search" /></button>
      </div>
      <nav className="mobile-nav mt-3">
        <ul className="mobile-menu">
          <li>
            <a href="#" className="sf-with-ul">Home Pages</a>
            <ul>
              <li><a href="index.html">Home 1</a></li>
              <li><a href="index-2.html">Home 2</a></li>
              <li><a href="index-3.html">Home 3</a></li>
              <li><a href="index-4.html">Home 4</a></li>
              <li><a href="index-5.html">Home 5</a></li>
              <li><a href="index-6.html">Home 6</a></li>
              <li><a href="index-7.html">Home 7</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className="sf-with-ul">Standard Pages</a>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="doctors.html">Our Doctors</a></li>
              <li><a href="doctors-detailed.html">Doctor (Detailed)</a></li>
              <li><a href="departments-1.html">Departments (Style 01)</a></li>
              <li><a href="departments-2.html">Departments (Style 02)</a></li>
              <li><a href="departments-detailed.html">Departments (Detailed)</a></li>
              <li><a href="treatments.html">Treatments</a></li>
              <li><a href="how-it-works.html">How it Works</a></li>
              <li><a href="help.html">Help</a></li>
              <li><a href="help-questions.html">Help Questions</a></li>
              <li><a href="membership.html">Membership</a></li>
              <li><a href="reviews.html">Reviews</a></li>
              <li><a href="contact-us.html">Contact</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className="sf-with-ul">Blog Pages</a>
            <ul>
              <li><a href="blog-masonry.html">Blog Masonry</a></li>
              <li><a href="blog-right-sidebar.html">Blog Masonry (Right Sidebar)</a></li>
              <li><a href="blog-left-sidebar.html">Blog Masonry (Left Sidebar)</a></li>
              <li><a href="blog-detailed.html">Blog Detailed</a></li>
              <li><a href="blog-detailed-sidebar.html">Blog Detailed Sidebar</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className="sf-with-ul">Appointments</a>
            <ul>
              <li><a href="appointment-step1.html">Appointment (Step01)</a></li>
              <li><a href="appointment-step2.html">Appointment (Step02)</a></li>
              <li><a href="appointment-step3.html">Appointment (Step03)</a></li>
              <li><a href="appointment-step4.html">Appointment (Step04)</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className="sf-with-ul">Login Pages</a>
            <ul>
              <li><a href="login.html">Signin</a></li>
              <li><a href="signup.html">Signup</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="social-icons mt-6">
        <a href="#" className="social-icon" target="_blank" title="Twitter"><i className="fab fa-twitter" /></a>
        <a href="#" className="social-icon" target="_blank" title="Facebook"><i className="fab fa-facebook" /></a>
        <a href="#" className="social-icon" target="_blank" title="Youtube"><i className="fab fa-youtube" /></a>
      </div>
    </div>
  </div>

	
    </>
  );
}
