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
        <main className='main' style={{ backgroundColor: '#283779' }}>
          <div className="container">
            <section className="section error-401 min-vh-100 d-flex flex-column align-items-center justify-content-center">
              <h1>401</h1>
              <h2 className='text-center'>You don't have permission to access this page.</h2>
              <a className="btn" href="/">
                Back to home
              </a>
              <img
                src="/assets/img/unauthorized.svg"
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
