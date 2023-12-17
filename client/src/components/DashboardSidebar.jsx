import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


export default function DashboardSidebar({ toggleSidebar }) {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser.role === 'admin';
  const isCustomer = currentUser.role === 'customer';

  const [currentLocation, setCurrentLocation] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'bbc2f62bcf57b20a33ef593505a3243e';

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );

            if (response.ok) {
              const data = await response.json();
              setCurrentLocation(data.name);
              setWeatherInfo({
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
              });
            } else {
              console.error('Failed to fetch weather data');
            }
          },
          (error) => {
            console.error('Error getting user location', error);
          }
        );
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeatherData();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <i className="bi bi-x toggle-sidebar-btn d-block d-sm-block d-md-block d-lg-block d-xl-none" onClick={toggleSidebar} />

        <a href="/dashboard"><img src="/assets/images/logo-mc.png" id="sidebar-logo" alt="" /></a>

        <ul className="sidebar-nav" id="sidebar-nav">

          <li className="nav-heading">MENU</li>

          {/* Dashboard Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/dashboard' ? '' : 'collapsed'}`} href="/dashboard">

              <i className="bi bi-grid" />
              <span>{isCustomer ? 'Home' : 'Dashboard'}</span>
            </a>
          </li>
          {/* End Dashboard Nav */}

          {/* Appointment Page Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname.startsWith('/appointments') ? '' : 'collapsed'}`} href="/appointments">

              <i className="bi bi-clipboard-heart" />
              <span>{isCustomer ? 'My Appointment' : 'Appointments'}</span>            </a>
          </li>
          {/* End Appointment Page Nav */}

          {/* Inventory Page Nav */}
          {!isCustomer && (
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/inventory' ? '' : 'collapsed'}`} href="/inventory">

                <i className="bi bi-box-seam" />
                <span>Inventory</span>
              </a>
            </li>
          )}
          {/* End Inventory Page Nav */}

          {/* Medical Record Page Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/medical-record' ? '' : 'collapsed'}`} href="/medical-record">
              <i className="bi bi-prescription" />
              <span>Medical Record</span>
            </a>
          </li>
          {/* End Medical Record Page Nav */}

          {/* User Page Nav */}
          <li className="nav-heading">USER</li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/profile' ? '' : 'collapsed'}`} href="/profile">
              <i className="bi bi-person" />
              <span>Profile</span>
            </a>
          </li>
          {/* End User Page Nav */}

          {/* Account Management Page Nav */}
          {isAdmin && (
            <div>

              <li className="nav-heading">SYSTEM</li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/account-management' ? '' : 'collapsed'}`} href="/account-management">
                  <i className="bi bi-person-gear" />
                  <span>Account Management</span>
                </a>
              </li>

              {/* End Account Management Page Nav */}

              {/* System Logs Page Nav */}
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === '/system-logs' ? '' : 'collapsed'}`} href="/system-logs">
                  <i className="bi bi-card-list" />
                  <span>System Logs</span>
                </a>
              </li>
            </div>
          )}
          {/* End System Logs Page Nav */}

          {/* Archives Page Nav */}
          {!isCustomer && (
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#icons-nav"
                data-bs-toggle="collapse"
                href="#"
                aria-expanded="false"
              >
                <i className="bi bi-archive" />
                <span>Archives</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="icons-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="/appointments/archive">
                    <i className="bi bi-circle" />
                    <span>Appointments</span>
                  </a>
                </li>
                <li>
                  <a href="/medical-record/archive">
                    <i className="bi bi-circle" />
                    <span>Medical Record</span>
                  </a>
                </li>
              </ul>
            </li>
          )}



        </ul>



        <section className="section dashboard mt-5">
          <div className="card info-card default-card">
            <div className="card-body">
              <h5 className="card-title mt-2">
                <i className='bi bi-geo-alt-fill' style={{ marginRight: '0.5rem' }}></i>
                {String(currentLocation)} {/* Cast to string if it's NaN */}
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <img
                    src={`http://openweathermap.org/img/w/${weatherInfo?.icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
                <div className="ps-3">
                  <h6>{String(weatherInfo?.temperature)}°</h6> {/* Cast to string if it's NaN */}
                  <span>
                    {String(weatherInfo?.description.charAt(0).toUpperCase() + weatherInfo?.description.slice(1))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


      </aside>


      {/* End Sidebar*/}
    </>

  )
}
