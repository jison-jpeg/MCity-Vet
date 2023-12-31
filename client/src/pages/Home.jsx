import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Preloader from '../components/Preloader';

export default function Home() {

  return (
    <>
      

      <div className="page-wrapper">
        <Preloader />

        {/* Header.jsx */}
        <Header />

        <main className="main">
          {/*----------------------------------------------
			hero slider - start
			----------------------------------------------*/}
          <div
            className="intro-slider intro-slider-1 owl-carousel owl-theme owl-nav-inside owl-light slide-animate mb-0"
            data-toggle="owl"
            data-owl-options='{
					"dots": false,
					"nav": false, 
					"responsive": {
						"1200": {
							"nav": true
						}
					}
				}'
          >
            {/* 
					background image is added through css and can be modified in the style.min.css file
					the image is added to the .bg-section-1 class.
				*/}
            <div className="banner intro-slide bg-section bg-section-1" id='TopScroll'>
              <div className="container">
                <div className="banner-content">
                  <h1 className="banner-title">Nurturing the Heart of Your Farm.</h1>
             
                  <p className="banner-info">
                    Your livestock's well-being is our top priority, we're your partners in prosperity.
                  </p>
                  <div className="banner-actions">
                    <a
                      href="/book-appointment"
                      className="btn btn-secondary-color"
                    >
                      <span>Book an Appointment</span>
                    </a>
                    <a href="/dashboard" className="btn">
                      <span>View my Appointment</span>
                    </a>
                  </div>
                </div>
                <div className="foreground-img">
                  <img
                    src="assets/images/demos/demo-1/banner/banner-hero-1-fore.png"
                    alt="Banner-slide"
                  />
                </div>
              </div>
            </div>
            {/* 
					background image is added through css and can be modified in the _sections.scss file
					the image is added to the .bg-section-2 class.
				*/}
            <div className="banner intro-slide bg-section bg-section-2">
              <div className="container">
                <div className="banner-content">
                  <h1 className="banner-title">Technician who treat with care.</h1>
                  <p className="banner-info">
                    Our skilled Technicians have tremendous experience with wide range
                    of experience to serve the needs of our patients.
                  </p>
                  <div className="banner-actions">
                    <a
                      href="appointment-step1.html"
                      className="btn btn-secondary-color"
                    >
                      <span>Book an Appointment</span>
                    </a>
                    <a href="/About" className="btn">
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>
                <div className="foreground-img">
                  <img
                    src="assets/images/demos/demo-1/banner/banner-hero-2-fore.png"
                    alt="Banner-slide"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*----------------------------------------------
			hero slider - end
			----------------------------------------------*/}
          {/*----------------------------------------------
			schedule section - start
			----------------------------------------------*/}
          <div className="bg-primary-color schedule-section">
            <div className="container">
              <div className="row position-relative">

                <div className="col-lg-5 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                  <div className="widget">
                    <h4 className="widget-title">
                      <i className="far fa-clock" />
                      Working hours
                    </h4>
                    <p className="widget-desc">
                      Below are our working hours throughout the week
                      excluding national holidays.
                    </p>
                    <div className="widget-hours">
                      <span>Monday — Friday</span>
                      <span className="time">
                        8:00<sup>AM</sup> — 5:00<sup>PM</sup>
                      </span>
                    </div>
                    <div className="widget-hours">
                      <span>Saturday — Sunday</span>
                      <span className="time">
                        10:00<sup>AM</sup> — 5:00<sup>PM</sup>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 offset-lg-1 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                  <div className="widget">
                    <h4 className="widget-title">
                      <i className="far fa-heart-rate" />
                      Technician availability
                    </h4>
                    <p className="widget-desc">
                      Our technicians are available most of the week and if not you can
                      always book appointment with other available Technicians on our
                      panel of expert Technicians.
                    </p>
                    <a
                      href="/book-appointment"
                      className="btn btn-sm btn-secondary-color btn-secondary-color-1 ls-0"
                    >
                      <span>Meet Our Technicians</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="container disease-section">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12 col-md-8 col-sm-8 col-10">
                <h2 className="ls-n-20 text-center section-heading">
                  Committed to livestock wellness excellence.
                </h2>
              </div>
            </div>
            <div className="blog-slider row d-flex justify-content-center">
              <div className="col-lg-4 col-md-8 col-sm-8 col-10">
                <div className="card">
                  <div className="card-heading">
                    <figure>
                      <i className="fal fa-heartbeat" />
                    </figure>
                    <h4 className="card-title">
                     Services
                    </h4>
                  </div>
                  <div className="card-content">
                    <ul className="card-menu ls-20">
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                          Artificial Insemination
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                        Hormone Induction
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                        Castration
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                        Iron Supplementation
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                        Deworming
                        </a>
                      </li>
                      {/* <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="treatments.html" className="item-link">
                          
                        </a>
                      </li> */}
                    </ul>
                    {/* <div className="btn-link">
                      <a href="departments-1.html">Learn More</a>
                      <i className="far fa-caret-right" />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-8 col-sm-8 col-10">
                <div className="card">
                  <div className="card-heading">
                    <figure>
                      <i className="fal fa-user-md" />
                    </figure>
                    <h4 className="card-title">
                      Technicians
                    </h4>
                  </div>
                  <div className="card-content">
                    <ul className="card-menu ls-20">
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                          Dr. Omar T. Cahanap
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                          Annabel Sia
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                          Jack Gepisao
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="#" className="item-link">
                          Phile Rae Bonggo
                        </a>
                      </li>
                      <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="treatments.html" className="item-link">
                          Charlou Michael Dumindin
                        </a>
                      </li>
                      {/* <li className="menu-item">
                        <i className="far fa-caret-right" />
                        <a href="treatments.html" className="item-link">
                          Thyroid Disorders
                        </a>
                      </li> */}
                    </ul>
                    {/* <div className="btn-link">
                      <a href="departments-1.html">Learn More</a>
                      <i className="far fa-caret-right" />
                    </div> */}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          {/*----------------------------------------------
			disease section - end
			----------------------------------------------*/}
          {/*----------------------------------------------
			types section - start
			----------------------------------------------*/}
          {/* 
				background image is added through css and can be modified in the _sections.scss file
				the image is added to the .bg-section-3 class.
			*/}
          <div className="type-section type-section-margin-bottom bg-section bg-section-3">
            <div className="container-wrapper">
              <div className="container position-relative">
                <div className="row">
                  <div className="col-lg-12 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                    <div className="banner-content">
                      <div className="banner-content-wrapper">
                        <div className="banner-heading">
                          <h2 className="banner-title">
                            We provide quality care that treats everyone.
                          </h2>
                          <p className="banner-info">
                            We provide primary care when you need it, get
                            personalized and high quality healthcare by talking to
                            top medical Technicians.
                          </p>
                        </div>
                      </div>
                      <div className="icon-boxes">
                        <div className="icon-box-wrapper">
                          <div className="icon-box icon-box-1 text-center">
                            <figure>
                              <i className="fal fa-user-circle" />
                            </figure>
                            <div className="icon-box-content">
                              <h4 className="box-title">Artificial Insemination</h4>
                            </div>
                          </div>
                        </div>
                        <div className="icon-box-wrapper">
                          <div className="icon-box icon-box-1 text-center">
                            <figure>
                              <i className="fal fa-baby-carriage" />
                            </figure>
                            <div className="icon-box-content">
                              <h4 className="box-title">Pig</h4>
                            </div>
                          </div>
                        </div>
                        <div className="icon-box-wrapper">
                          <div className="icon-box icon-box-1 text-center">
                            <figure>
                              <i className="fal fa-users" />
                            </figure>
                            <div className="icon-box-content">
                              <h4 className="box-title">Goat</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="foreground-img">
              <img
                src="assets/images/demos/demo-1/banner/banner-big-1-fore.png"
                alt="image"
              />
            </div>
          </div>
          {/*----------------------------------------------
			types section - end
			----------------------------------------------*/}
          {/*----------------------------------------------
			image box section - start
			----------------------------------------------*/}
          <div className="container image-box-section" id='Scroll'>
            <h2 className="ls-n-20 text-center section-heading">
              What Services do our System Offers?
            </h2>
            <div className="row d-flex justify-content-center">
              <div className="image-box image-over col-lg-4 col-md-8 col-sm-8 col-10">
                <figure>
                  <img
                    src="assets/images/demos/demo-3/img-box/img3-1.png"
                    alt="Image-over"
                    width={298}
                    height={461}
                  />
                </figure>
                <div className="box-content">
                  <h4 className="box-title">Artificial Insemination</h4>
                  <p className="box-desc">
                    All of our doctors are highly skilled and have a minimum of 15
                    years experience in U.S top healthcare institutions.
                  </p>
                  <div className="btn-link">
                    <a href="doctors.html">Our Doctors</a>
                    <i className="far fa-caret-right" />
                  </div>
                </div>
              </div>
              <div className="image-box image-over col-lg-4 col-md-8 col-sm-8 col-12">
                <figure>
                  <img
                    src="assets/images/demos/demo-3/img-box/img3-2.png"
                    alt="Image-over"
                    width={259}
                    height={424}
                  />
                </figure>
                <div className="box-content">
                  <h4 className="box-title">Convenient</h4>
                  <p className="box-desc">
                    Book an appointment to video chat with the doctor of your choice
                    from the ease of home using a smartphone.
                  </p>
                  <div className="btn-link">
                    <a href="appointment-step1.html">Download App</a>
                    <i className="far fa-caret-right" />
                  </div>
                </div>
              </div>
              <div className="image-box image-over col-lg-4 col-md-8 col-sm-8 col-12">
                <figure>
                  <img
                    src="assets/images/demos/demo-3/img-box/img3-3.png"
                    alt="Image-over"
                    width={325}
                    height={461}
                  />
                </figure>
                <div className="box-content">
                  <h4 className="box-title">Affordable</h4>
                  <p className="box-desc">
                    Our pricing plans are quite affordable and you don’t have to
                    wait in order to see a doctor in the time of urgency.
                  </p>
                  <div className="btn-link">
                    <a href="membership.html">Pricing Plans</a>
                    <i className="far fa-caret-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*----------------------------------------------
			image box section - end
			----------------------------------------------*/}
          {/*----------------------------------------------
			type section - start
			----------------------------------------------*/}
          {/* 
				background image is added through css and can be modified in the _sections.scss file
				the image is added to the .bg-section-4 class.
			*/}
          <div className="bg-section bg-section-4 type-section type-section-2">
            <div className="container-wrapper">
              <div className="container">
                <div className="banner-content">
                  <div className="row">
                    <div className="col-lg-12 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="banner-content-wrapper">
                        <h2 className="banner-title">
                          The mission of quality &amp; our core values.
                        </h2>
                        <p className="banner-info">
                          Our mission it to improve the world’s health through
                          compassionate and afforable care through innovation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-wheelchair" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">Put the patient first</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-user-nurse" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">Take personal ownership</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-stethoscope" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">
                            Celebrate the art of medicine
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-syringe" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">Be fast, but don't hurry</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-heart-circle" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">Always work with integrity</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="icon-box icon-box-left">
                        <figure>
                          <i className="fal fa-microscope" />
                        </figure>
                        <div className="icon-box-content">
                          <h4 className="box-title">Be inquisitive and discover</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 offset-lg-0 col-md-8 col-sm-8 offset-sm-2 col-10 offset-1">
                      <div className="banner-actions">
                        <a
                          href="appointment-step1.html"
                          className="btn btn-primary-color"
                        >
                          <span>Book an Appointment</span>
                        </a>
                        <a href="how-it-works.html" className="btn">
                          <span>Learn More</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="foreground-img">
              <img
                src="assets/images/demos/demo-1/banner/banner-big-2-fore.png"
                alt="image"
              />
            </div>
          </div>
          {/*----------------------------------------------
			type section - end
			----------------------------------------------*/}
          {/*----------------------------------------------
			blog preview section - start
			----------------------------------------------*/}
          

          {/* <FacebookMsg /> */}
        </main>

        <Footer />
      </div>
    </>




  )
}
