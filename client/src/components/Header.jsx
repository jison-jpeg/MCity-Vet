import React from 'react'

export default function Header() {
  return (
<header className="header">
 
  <div className="header-middle sticky-header">
    <div className="header-left">
      <a href="/" className="logo">
        <h1 className="mb-0"><img src="assets/images/logo.png" alt="Caremed Logo" width={185} height={48} /></h1>
      </a>
    </div>
    <div className="header-right">
      <button className="mobile-menu-toggler">
        <span className="sr-only">Toggle mobile menu</span>
        <i className="fal fa-bars" />
      </button>
      <nav className="main-nav ls-20">
        <ul className="menu sf-arrows">
          <li className="megamenu-container active">
            <a href="/" className="sf-with-ul">Home<i className="fas fa-caret-down" /></a>
            <div className="megamenu demo">
              <div className="menu-col scrollable">
                <div className="demo-list">
                  <div className="demo-item">
                    <a href="/">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/01_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 1 <span>(Standard1)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-2.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/02_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 2 <span>(How it Works)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-3.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/03_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 3<span>(Standard2)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-4.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/04_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 4<span>(Appointment1)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-5.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/05_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 5<span>(Appointment2)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-6.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/06_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 6<span>(Treatments)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="index-7.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/07_home.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Home 7<span>(COVID-19)</span></span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="/signin">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/30_signin.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Signin</span>
                    </a>
                  </div>{/* End .demo-item */}
                  <div className="demo-item">
                    <a href="signup.html">
                      <div className="demo-bg" style={{backgroundImage: 'url(assets/images/menu/31_signup.jpg)'}}>
                        <div className="demo-link"><i className="fas fa-arrow-right" /></div>
                      </div>
                      <span className="demo-title">Signup</span>
                    </a>
                  </div>{/* End .demo-item */}
                </div>{/* End .demo-list */}
              </div>{/* End .menu-col */}
            </div>{/* End .megamenu */}
          </li>
          <li>
            <a href="#" className="sf-with-ul">Pages<i className="fas fa-caret-down" /></a>
            <ul className="sub-menu">
              <li><a href="about.html"><i className="fas fa-angle-right" />About us</a></li>
              <li className="li-with-arrow">
                <a href="doctors.html"><i className="fas fa-angle-right" />Our Doctors<i className="far fa-caret-right" /></a>
                <ul>
                  <li><a href="doctors.html"><i className="fas fa-angle-right" />Our Doctors</a></li>
                  <li><a href="doctors-detailed.html"><i className="fas fa-angle-right" />Doctor (Detailed)</a></li>
                </ul>
              </li>
              <li className="li-with-arrow">
                <a href="departments-1.html"><i className="fas fa-angle-right" />Departments<i className="far fa-caret-right" /></a>
                <ul>
                  <li><a href="departments-1.html"><i className="fas fa-angle-right" />Departments Style 1</a></li>
                  <li><a href="departments-2.html"><i className="fas fa-angle-right" />Departments Style 2</a></li>
                  <li><a href="departments-detailed.html"><i className="fas fa-angle-right" />Department details</a></li>
                </ul>
              </li>
              <li className="li-with-arrow">
                <a href="blog-masonry.html"><i className="fas fa-angle-right" />Our Blog<i className="far fa-caret-right" /></a>
                <ul>
                  <li><a href="blog-masonry.html"><i className="fas fa-angle-right" />Blog Masonry</a></li>
                  <li><a href="blog-right-sidebar.html"><i className="fas fa-angle-right" />Blog Masonry (right sidebar)</a></li>
                  <li><a href="blog-left-sidebar.html"><i className="fas fa-angle-right" />Blog Masonry (left sidebar)</a></li>
                  <li><a href="blog-detailed.html"><i className="fas fa-angle-right" />Blog Detailed</a></li>
                  <li><a href="blog-detailed-sidebar.html"><i className="fas fa-angle-right" />Blog Detailed (Sidebar)</a></li>
                </ul>
              </li>
              <li className="li-with-arrow">
                <a href="appointment-step1.html"><i className="fas fa-angle-right" />Appointments<i className="far fa-caret-right" /></a>
                <ul>
                  <li><a href="appointment-step1.html"><i className="fas fa-angle-right" />Appointment 1</a></li>
                  <li><a href="appointment-step2.html"><i className="fas fa-angle-right" />Appointment 2</a></li>
                  <li><a href="appointment-step3.html"><i className="fas fa-angle-right" />Appointment 3</a></li>
                  <li><a href="appointment-step4.html"><i className="fas fa-angle-right" />Appointment 4</a></li>
                </ul>
              </li>
              <li className="li-with-arrow"><a href="help.html"><i className="fas fa-angle-right" />Help</a>
                <ul>
                  <li><a href="help.html"><i className="fas fa-angle-right" />Help</a></li>
                  <li><a href="help-questions.html"><i className="fas fa-angle-right" />Help Questions</a></li>
                </ul>
              </li>
              <li><a href="reviews.html"><i className="fas fa-angle-right" />Reviews</a></li>
              <li><a href="contact-us.html"><i className="fas fa-angle-right" />Contact us</a></li>
            </ul>
          </li>
          <li>
            <a href="how-it-works.html">How it works</a>
          </li>
          <li>
            <a href="treatments.html">Treatments</a>
          </li>
          <li>
            <a href="membership.html">Membership</a>
          </li>
          <li>
            <a href="help.html">Help</a>
          </li>
        </ul>{/* End .menu */}
      </nav>{/* End .main-nav */}
      <div className="header-search">
        <a href="#" className="search-toggle" role="button"><i className="fas fa-search" /></a>
        <form action="#" className="header-search-wrapper">
          <label htmlFor="q" className="sr-only">Search</label>
          <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
          <button type="submit" className="btn-search"><i className="fas fa-search" /></button>
        </form>
      </div>
      <a href="/book-appointment" className="btn btn-sm btn-primary-color ls-0">
        <span>Book an Appointment</span>
      </a>
      <a href="appointment-step1.html" className="icon-alt"><i className="fal fa-notes-medical" /></a>
      <a href="/signin" className="btn btn-sm btn-secondary-color ls-0 btn-login">
        <span>Sign in</span>
      </a>
      <a href="/signin" className="icon-alt"><i className="fas fa-user" /></a>
    </div>
  </div>
</header>

  )
}
