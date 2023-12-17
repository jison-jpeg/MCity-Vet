import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import Preloader from '../components/Preloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

export default function ProfileView() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [userProfile, setUserProfile] = useState(null);

  // State to manage the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add 'toggle-sidebar' class to the body when the button is clicked
  if (isSidebarOpen) {
    document.body.classList.add('toggle-sidebar');
  } else {
    document.body.classList.remove('toggle-sidebar');
  }

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

  useEffect(() => {
    // Fetch user profile based on the id
    fetch(`/backend/user/${id}/profile`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, [id]);

// Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Display confirmation alert
  const isConfirmed = window.confirm('Are you sure you want to update this profile?');

  if (!isConfirmed) {
    // If the user cancels the update, do nothing
    return;
  }

  try {
    const response = await fetch(`/backend/user/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Update local state with modified data
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        ...formData,
      }));

      // alert('Profile updated successfully!');
      //Success toast
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } else {
      // alert('Failed to update profile.');
      //Error toast
      toast.error('Failed to update profile.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    // Error toast
    toast.error('Error updating profile.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};
  // Function to handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <Preloader />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">User</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={userProfile?.profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>  {userProfile?.firstName} {userProfile?.middleName ? ` ${userProfile.middleName[0]}.` : ''} {userProfile?.lastName}</h2>
                  <h3>{userProfile?.role}</h3>


                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >

                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">Full Name</div>
                        <div className="col-lg-9 col-md-8">{userProfile?.lastName} , {userProfile?.firstName} {userProfile?.middleName}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Birthday</div>
                        <div className="col-lg-9 col-md-8">
                        {userProfile?.birthdate}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                        {userProfile?.address}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                        {userProfile?.phone}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                        {userProfile?.email}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      <form onSubmit={handleSubmit}>

                        <div className="row mb-3">
                          <label
                            htmlFor="firstName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            First Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="firstName"
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder='Enter your first name'
                              defaultValue={userProfile?.firstName} onChange={handleChange}

                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="lastName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Last Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="lastName"
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder='Enter your last name'
                              defaultValue={userProfile?.lastName} onChange={handleChange}

                            />
                          </div>
                        </div>


                        <div className="row mb-3">
                          <label
                            htmlFor="lastName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Middle Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="middleName"
                              type="text"
                              className="form-control"
                              id="middleName"
                              placeholder='Optional'
                              defaultValue={userProfile?.middleName} onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="birthdate"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Birthdate
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="birthdate"
                              type="date"
                              className="form-control"
                              id="birthdate"
                              defaultValue={userProfile?.birthdate} onChange={handleChange}
                            />
                          </div>
                        </div>


                        <div className="row mb-3">
                          <label
                            htmlFor="address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="address"
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder='Enter your home address'
                              defaultValue={userProfile?.address} onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder='09'
                              defaultValue={userProfile?.phone} onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="email"
                              defaultValue={userProfile?.email}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button className="btn btn-primary" type="submit">     
                                Save Changes           
                          </button>
                        </div>
                      </form>

                      {/* End Profile Edit Form */}

                    </div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* End #main */}
    </>
  )
}
