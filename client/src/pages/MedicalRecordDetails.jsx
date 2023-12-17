import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../components/Preloader';

export default function MedicalRecordDetails() {
  const { currentUser } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [formValues, setFormValues] = useState({
    diagnosis: '',
    treatment: '',
  });

  useEffect(() => {
    const fetchMedicalRecordDetails = async () => {
      try {
        const response = await fetch(`/backend/medical-record/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching medical record details: ${response.statusText}`);
        }

        const medicalRecordData = await response.json();
        setMedicalRecord(medicalRecordData);

        const appointmentResponse = await fetch(`/backend/appointment/${medicalRecordData.appointmentId}`);
        if (!appointmentResponse.ok) {
          throw new Error(`Error fetching appointment details: ${appointmentResponse.statusText}`);
        }

        const appointmentData = await appointmentResponse.json();
        setAppointment(appointmentData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchMedicalRecordDetails();
  }, [id]);

  useEffect(() => {
    const fetchMedicalRecordDetails = async () => {
      try {
        const response = await fetch(`/backend/medical-record/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching medical record details: ${response.statusText}`);
        }

        const medicalRecordData = await response.json();
        setMedicalRecord(medicalRecordData);

        const appointmentResponse = await fetch(`/backend/appointment/${medicalRecordData.appointmentId}`);
        if (!appointmentResponse.ok) {
          throw new Error(`Error fetching appointment details: ${appointmentResponse.statusText}`);
        }

        const appointmentData = await appointmentResponse.json();

        const technicianResponse = await fetch(`/backend/user/${appointmentData.technicianName}`);
        if (!technicianResponse.ok) {
          throw new Error(`Error fetching technician details: ${technicianResponse.statusText}`);
        }

        const technicianData = await technicianResponse.json();
        const updatedAppointmentData = { ...appointmentData, technician: technicianData };

        setAppointment(updatedAppointmentData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchMedicalRecordDetails();
  }, [id]);

  const updateMedicalRecord = async (formData) => {
    try {
      // Include the appointmentId in the formData
      formData.appointmentId = medicalRecord.appointmentId;

      const response = await fetch(`/backend/medical-record/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error updating medical record: ${response.statusText}`);
      }

      const updatedMedicalRecord = await response.json();
      setMedicalRecord(updatedMedicalRecord);
      // Optionally, you can clear the form values after saving
      setFormValues({ diagnosis: '', treatment: '' });

      // Show a success toast
      toast.success('Medical record updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error toast
      toast.error('Error updating medical record!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Handle error, e.g., show an error message to the user
    }
  };

  // Toggle archive status with a single button


  const printMedicalRecordSummary = () => {
    const printContent = `
      <div style="text-align: center; font-size: 20px; margin-bottom: 20px;">
        <p>Medical Record Summary</p>
      </div>

      <div>
        <p><strong>Appointment ID:</strong> ${appointment?._id || 'N/A'}</p>
        <p><strong>Technician:</strong> ${appointment?.technician?.firstName || 'N/A'} ${appointment?.technician?.lastName || 'N/A'}</p>
        <p><strong>Schedule:</strong> ${appointment?.schedule || 'N/A'}</p>
      </div>

      <div style="margin-top: 20px;">
        <h5>Information</h5>
        <p><strong>Customer's Name:</strong> ${appointment?.firstName || 'N/A'} ${appointment?.lastName || 'N/A'}</p>
        <p><strong>Address:</strong> ${appointment?.address || 'N/A'}</p>
        <p><strong>Landmark:</strong> ${appointment?.landmark || 'N/A'}</p>
        <p><strong>Service(s):</strong> ${appointment?.services?.join(', ') || 'N/A'}</p>
        <p><strong>Animal(s):</strong> ${getAnimalDetails(appointment?.patient) || 'N/A'}</p>
      </div>

      <div style="margin-top: 20px;">
        <h5>Medical Record Details</h5>
        <p><strong>Diagnosis:</strong> ${medicalRecord?.diagnosis || 'N/A'}</p>
        <p><strong>Treatment:</strong> ${medicalRecord?.treatment || 'N/A'}</p>
        <p><strong>Prescription:</strong> Download ${medicalRecord?.prescription || 'N/A'}</p>
        <p><strong>Created By:</strong> ${medicalRecord?.createdBy || 'N/A'}</p>
        <p><strong>Updated At:</strong> ${medicalRecord?.updatedAt || 'N/A'}</p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Medical Record Summary</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const getAnimalDetails = (patients) => {
    if (!Array.isArray(patients)) return 'N/A';

    return patients
      .map((patient, index) => `(${patient.numberOfHeads}) ${patient.typeOfAnimal}${index < patients.length - 1 ? ', ' : ''}`)
      .join('');
  };

  // Toggle archive status with a single button
  const toggleArchive = async () => {
    try {
      console.log('Toggling archive status...');

      const response = await fetch(`/backend/medical-record/archive/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archive: !medicalRecord.archive,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error toggling archive status: ${response.statusText}`);
      }

      const updatedMedicalRecord = await response.json();
      console.log('Archive status toggled successfully:', updatedMedicalRecord);
      // Show a success toast
      toast.success(`Medical record ${medicalRecord.archive ? 'unarchived' : 'archived'} successfully!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setMedicalRecord(updatedMedicalRecord);
    } catch (error) {
      console.error('Error toggling archive status:', error);
      toast.error('An error occured while archiving', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  return (
    <>
      <Preloader />
      <ToastContainer />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>View Medical Record</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/medical-record">Medical Record</a>
              </li>
              <li className="breadcrumb-item active">View Medical Record</li>
            </ol>
          </nav>
        </div>

        {medicalRecord && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Medical Record Summary</h5>
                  <div className="d-flex gap-2 justify-content-end">
                    <button className="btn btn-primary-dashboard btn-sm rounded-pill"
                      onClick={printMedicalRecordSummary}
                    >
                      <i className='bi bi-printer-fill'></i>
                    </button>
                    <button className="btn btn-primary-dashboard btn-sm rounded-pill">
                      <i className='bi bi-download'></i>
                    </button>
                    {currentUser.role !== 'customer' && (
                      <button
                        className={`btn btn-primary-dashboard btn-sm rounded-pill ${medicalRecord.archive ? 'btn-danger' : 'btn-primary'}`}
                        type="button"
                        onClick={toggleArchive}
                      >
                        {medicalRecord.archive ? 'Unarchive' : 'Archive'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  {appointment && (
                    <>
                      <div className="col-sm-4 col-md-4 mt-2">
                        <p className="card-text fw-bold">Appointment ID</p>
                      </div>
                      <div className="col-sm-8 col-md-8 mt-2">
                        <p className="card-text text-muted">{appointment._id}</p>
                      </div>

                      <div className="col-sm-4 col-md-4 mt-2">
                        <p className="card-text fw-bold">Technician</p>
                      </div>
                      <div className="col-sm-8 col-md-8 mt-2">
                        <p className="card-text text-muted">{`${appointment?.technician?.firstName || 'N/A'} ${appointment?.technician?.lastName || ''}`}</p>
                      </div>

                      <div className="col-sm-4 col-md-4 mt-2">
                        <p className="card-text fw-bold">Schedule</p>
                      </div>
                      <div className="col-sm-8 col-md-8 mt-2">
                        <p className="card-text text-muted">{appointment.schedule || 'N/A'}</p>
                      </div>
                    </>
                  )}

                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Information</h5>
                </div>

                <div className="mb-3 row">
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Customer's Name</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment?.firstName ?? ''} {appointment?.lastName ?? ''}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Address</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment?.address ?? 'N/A'}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Landmark</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment?.landmark ?? 'N/A'}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Service(s)</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment?.services?.join(', ') ?? 'N/A'}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Animal(s)</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    {Array.isArray(appointment?.patient) ? (
                      <span className='text-muted'>
                        {appointment.patient.map((patient, index) => (
                          <span key={index}>
                            {`(${patient.numberOfHeads}) ${patient.typeOfAnimal}${index < appointment.patient.length - 1 ? ', ' : ''}`}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className='text-muted'>
                        {`(${appointment?.patient?.numberOfHeads}) ${appointment?.patient?.typeOfAnimal}`}
                      </span>
                    )}
                  </div>
                </div>


                <div className="mb-3 row">
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Diagnosis</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{medicalRecord.diagnosis}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Treatment</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{medicalRecord.treatment}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Prescription</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">Download {medicalRecord.prescription}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Created By</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{medicalRecord.createdBy}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Updated At</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{medicalRecord.updatedAt}</p>
                  </div>
                </div>

                {/* Form Section */}
                {/* You can add or modify the fields in the form as needed */}
                {currentUser.role !== 'customer' && (
                  <form>
                    <div className="mb-3 row">
                      <label htmlFor="diagnosis" className="col-sm-4 col-md-4 mt-2">Diagnosis</label>
                      <div className="col-sm-8 col-md-8 mt-2">
                        <textarea
                          className="form-control"
                          placeholder="Enter a short description of the diagnosis..."
                          id="diagnosis"
                          style={{ height: 80 }}
                          value={formValues.diagnosis}
                          onChange={(e) => setFormValues({ ...formValues, diagnosis: e.target.value })}
                        />
                      </div>

                      <label htmlFor="treatment" className="col-sm-4 col-md-4 mt-2">Treatment</label>
                      <div className="col-sm-8 col-md-8 mt-2">
                        <textarea
                          className="form-control"
                          placeholder="Enter a short description of the treatment..."
                          id="treatment"
                          style={{ height: 80 }}
                          value={formValues.treatment}
                          onChange={(e) => setFormValues({ ...formValues, treatment: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                      <button
                        className="btn btn-primary-dashboard btn-sm rounded-pill"
                        type="button"
                        onClick={() => {
                          updateMedicalRecord({
                            diagnosis: formValues.diagnosis,
                            treatment: formValues.treatment,
                          });
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
