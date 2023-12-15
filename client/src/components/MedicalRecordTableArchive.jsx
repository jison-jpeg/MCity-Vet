import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MedicalRecordTableArchive() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const isCustomer = currentUser.role === 'customer';
  const isAdmin = currentUser.role === 'admin';

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        let response;
        if (isCustomer) {
          response = await fetch(`/backend/medical-record/${currentUser._id}/medical-record`);
        } else if (isAdmin) {
          response = await fetch('/backend/medical-record/all');
        } else {
          console.error('Invalid user role:', currentUser.role);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setMedicalRecords(data);
        } else {
          console.error('Failed to fetch medical records. No Medical Records found.');
        }
      } catch (error) {
        console.error('An error occurred while fetching medical records', error);
      }
    };

    fetchMedicalRecords();
  }, [currentUser, isCustomer, isAdmin]);

  // Filter medical records where archive is true
  const archivedMedicalRecords = Array.isArray(medicalRecords)
    ? medicalRecords.filter((record) => record.archive)
    : [];

  return (
    <>
      {archivedMedicalRecords.length === 0 ? (
        <div className="pt-4 d-flex flex-column align-items-center mb-5 mt-5 p-5">
          <img src="/assets/images/cow.gif" alt="No Archived Medical Records" />
          <h5 className="card-title">Hmm. Seems like nothing's in here but me.</h5>
          <p className="card-text">
            {isCustomer
              ? 'You have no archived medical records.'
              : 'No archived medical records found.'}
          </p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Appointment ID</th>
              <th scope="col">Date</th>
              <th scope="col">Client Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {archivedMedicalRecords.map((record) => (
              <tr key={record._id}>
                <td>{record._id}</td>
                <td>{record.appointmentId ? record.appointmentId._id || 'N/A' : 'N/A'}</td>
                <td>{record.createdAt}</td>
                <td>{`${(record.appointmentId && record.appointmentId.firstName) || 'N/A'} ${(
                  record.appointmentId && record.appointmentId.lastName
                ) || 'N/A'}`}</td>
                <td>
                  <Link to={`/medical-record/${record._id}`} className="btn btn-primary-dashboard-action btn-sm">
                    View
                  </Link>
                  <span> | </span>
                  <button type="button" className="btn btn-secondary-dashboard-action btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
