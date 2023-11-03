import React from 'react'

export default function TechnicianList() {
  return (
    <>
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <div className="doctor-menu mt-3">

          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-1.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="technician-name mb-0 ls-n-20">FirstName LastName</h4>
              <p className="technician-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="#">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="#"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
