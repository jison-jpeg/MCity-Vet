import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Preloader from '../components/Preloader';

export default function About() {
  return (
    
    <div>
      <Preloader />

      <Header />
      
<main className="main">
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
                  <h1 className="banner-title">Doctors who treat with care.</h1>
                  <p className="banner-info">
                    Our skilled doctors have tremendous experience with wide range
                    of diseases to serve the needs of our patients.
                  </p>
                  <div className="banner-actions">
                    <a
                      href="appointment-step1.html"
                      className="btn btn-secondary-color"
                    >
                      <span>Book an Appointment</span>
                    </a>
                    <a href="how-it-works.html" className="btn">
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
</main>



<Footer />
      </div>
      
  )
}
