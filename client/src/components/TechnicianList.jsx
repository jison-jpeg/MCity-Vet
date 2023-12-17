import React from 'react';

export default function TechnicianList({ technicians, onSelectTechnician  }) {
  const handleBookClick = (technician) => {
    onSelectTechnician(technician);
  };
  return (
    <div className="row d-flex justify-content-center">
      {technicians.map((technician) => (
        <div className="col-lg-12 col-sm-8 col-10" key={technician._id}>
          <div className="technician-menu mt-3">
            <div className="blog blog-technician d-md-flex">
              <figure>
                <img
                  src={technician.profilePicture}
                  className="avatar"
                  alt="Profile Picture"
                  width={143}
                  height={143}
                />
              </figure>
              <div className="blog-content">
                <h4 className="technician-name mb-0 ls-n-20">
                  {technician.firstName} {technician.lastName}
                </h4>
                <p className="technician-Availability">
                  Availability <i className="far fa-clock" /> {technician.availability}
                </p>
                <div className="btn-link">
                  <a href="#">Profile and Reviews</a>
                  <i className="far fa-caret-right" />
                </div>
              </div>
              <button
              className="btn btn-form btn-secondary-color"
              onClick={() => handleBookClick(technician)}
              >
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
