import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import 'ref' here
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
  });

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
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    if (image.size > 2 * 1024 * 1024) {
      setImageError(true);
      return;
    }

    if (!image.type.startsWith("image/")) {
      setImageError(true);
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <>
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
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={currentUser?.profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>{currentUser?.firstName} {currentUser?.lastName} {currentUser?.middleName ? currentUser.middleName[0] : ''}.</h2>
                  <h3>{currentUser?.role}</h3>


                </div>
              </div>
            </div>
            <div className="col-xl-8">
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

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
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
                        <div className="col-lg-9 col-md-8">{currentUser?.lastName}, {currentUser?.firstName} {currentUser?.middleName}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Birthday</div>
                        <div className="col-lg-9 col-md-8">
                        {currentUser?.birthdate}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                        {currentUser?.address}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                        {currentUser?.phone}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {currentUser?.email}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      <form onSubmit={handleSubmit}>

                        <input type="file" ref={fileRef} hidden accept='image/*'
                          onChange={(e) => setImage(e.target.files[0])} />


                        {imageError ? (
                          <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            Error uploading image (file size must be less than 2 MB)
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            />
                          </div>
                        ) : imagePercent > 0 && imagePercent < 100 ? (
                          <div>
                            <div className="progress mt-3">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${imagePercent}%` }}
                                aria-valuenow={imagePercent}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                {imagePercent}%
                              </div>
                            </div>
                            <br />
                          </div>
                        ) : imagePercent === 100 ? (
                          <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Image uploaded successfully!
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            />
                          </div>
                        ) : null}




                        <div className="row mb-3">
                          <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img src={formData.profilePicture || currentUser.profilePicture} alt="Profile"
                              onClick={() => fileRef.current.click()}
                            />
                          </div>
                        </div>

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
                              defaultValue={currentUser?.firstName} onChange={handleChange}

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
                              defaultValue={currentUser?.lastName} onChange={handleChange}
                              
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
                              defaultValue={currentUser?.middleName} onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="Address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Birthdate
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="address"
                              type="date"
                              className="form-control"
                              id="birthdate"
                              defaultValue={currentUser?.birthdate} onChange={handleChange}
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
                              defaultValue={currentUser?.address} onChange={handleChange}
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
                              defaultValue={currentUser?.phone} onChange={handleChange}
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
                              defaultValue={currentUser?.email}
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

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      {/* Change Password Form */}
                      <form>
                        <div className="row mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="currentPassword"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="newpassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="renewpassword"
                              type="password"
                              className="form-control"
                              id="renewPassword"
                            />
                          </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button className="btn btn-primary" type="button">
                            Change Password
                          </button>
                        </div>
                      </form>
                      {/* End Change Password Form */}
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
