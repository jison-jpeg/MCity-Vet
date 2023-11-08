import React, { useEffect } from 'react';

export default function NotFound() {

  useEffect(() => {
    const mainStylesheet = document.getElementById('main-stylesheet');
    const mainBootstrap = document.getElementById('main-bootstrap');

    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');

    mainStylesheet.setAttribute('disabled', 'true');
    dashboardStylesheet.removeAttribute('disabled');

    mainBootstrap.setAttribute('disabled', 'true');
    dashboardBootstrap.removeAttribute('disabled');
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <main className='main'>
          <div className="container">
            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
              <h1>404</h1>
              <h2 className='text-center'>The page you are looking for doesn't exist.</h2>
              <a className="btn" href="/">
                Back to home
              </a>
              <img
                src="assets/img/not-found.svg"
                className="img-fluid py-5"
                alt="Page Not Found"
              />

            </section>
          </div>
        </main>
      </div>
    </>

  )
}
