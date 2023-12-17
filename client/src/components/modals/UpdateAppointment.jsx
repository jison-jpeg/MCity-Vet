import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function UpdateAppointment({ appointment }) {
    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        technician: '',
        schedule: '',
        address: '',
        landmark: '',
        email: '',
        phone: '',
        patients: [
            {
                typeOfAnimal: '',
                age: '',
                numberOfHeads: '',
            },
        ],
        services: [],
    });

    useEffect(() => {
        // Update form data when appointment changes
        if (appointment) {
            console.log("Updated Appointment Data:", formData);
            setFormData((prevFormData) => ({
                ...prevFormData,
                firstName: appointment.firstName,
                lastName: appointment.lastName,
                technician: appointment.technicianName,
                schedule: appointment.schedule,
                address: appointment.address,
                landmark: appointment.landmark,
                email: appointment.email,
                phone: appointment.phone,
                services: appointment.services,
                patients: appointment.patient.map((patient) => ({
                    typeOfAnimal: patient.typeOfAnimal,
                    age: patient.age,
                    numberOfHeads: patient.numberOfHeads,
                })),
            }));
        }
    }, [appointment]);


    // Other useEffect and functions remain unchanged



    const [technicians, setTechnicians] = useState([]);
    const [services, setServices] = useState([]);

    const handlePatientChange = (index, field, value) => {
        setFormData((prevFormData) => {
            const updatedPatients = [...prevFormData.patients];
            updatedPatients[index] = { ...updatedPatients[index], [field]: value };
            return {
                ...prevFormData,
                patients: updatedPatients,
            };
        });
    };


    useEffect(() => {
        if (appointment) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                services: appointment.services,
                technician: appointment.technicianName,
            }));
        }
    }, [appointment]);

    const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        services: checked
            ? [...prevFormData.services, name]
            : prevFormData.services.filter((service) => service !== name),
    }));
};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [technicianResponse, serviceResponse] = await Promise.all([
                    fetch('/backend/technician/all').then((response) => response.json()),
                    fetch('/backend/service/all').then((response) => response.json()),
                ]);

                setTechnicians(technicianResponse);
                setServices(serviceResponse);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input Field:', name, 'Value:', value);
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            technicianName: name === 'technician' ? value : prevFormData.technicianName,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data to be Submitted:', formData);

        try {
            const response = await fetch(`/backend/appointment/update/${appointment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error updating appointment: ${response.statusText}`);
            }

            // Check if the date has changed
            if (formData.schedule !== appointment.schedule) {
                // If the date has changed, update the status to 'Rescheduled'
                const rescheduleResponse = await fetch(`/backend/appointment/update/${appointment._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: 'Rescheduled',
                    }),
                });

                if (!rescheduleResponse.ok) {
                    throw new Error(`Error updating appointment status to Rescheduled: ${rescheduleResponse.statusText}`);
                }
            }

            // Add system log after updating the appointment
            const systemLogResponse = await fetch('/backend/logs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountId: currentUser._id,
                    name: `${currentUser.firstName} ${currentUser.lastName}`, // Include lastName in the name field
                    role: currentUser.role,
                    dateTime: new Date(),
                    activity: `Made an update(s) on appointment for ${formData.firstName} ${formData.lastName}`,
                }),
            });

            if (systemLogResponse.ok) {
                console.log('System log added:', await systemLogResponse.json());
            } else {
                console.error('Error adding system log:', systemLogResponse.statusText);
            }


            const updatedAppointment = await response.json();
            console.log('Updated Appointment:', updatedAppointment);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="modal fade" id="updateModal" tabIndex={-1}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Appointment</h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">

                        <form className="row g-3" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleInputChange}



                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleInputChange}


                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="technician" className="form-label">
                                    Technician Name
                                </label>
                                <select
                                    id="technician"
                                    className="form-select"
                                    required
                                    name='technician'
                                    value={formData.technician}
                                    onChange={handleInputChange}
                                >
                                    <option disabled value={''}>
                                        Choose...
                                    </option>
                                    {technicians.map((technician) => (
                                        <option key={technician._id} value={technician._id}>
                                            {technician.firstName} {technician.lastName}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="col-md-6">
                                <label htmlFor="schedule" className="form-label">
                                    Date for your Appointment
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="schedule"
                                    name='schedule'
                                    value={formData.schedule}
                                    onChange={handleInputChange}
                                    required

                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name='address'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="1234 Main St"

                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="landmark" className="form-label">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="landmark"
                                    name='landmark'
                                    value={formData.landmark}
                                    onChange={handleInputChange}
                                    placeholder="Juan's Store"

                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="example@gmail.com"


                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder='0912 345 6789'

                                />
                            </div>

                            {formData.patients.map((patient, index) => (
                                <div key={index} className='row g-3'>
                                    <div className="col-md-3">
                                        <label htmlFor={`typeOfAnimal_${index}`} className="form-label">
                                            Animal Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`typeOfAnimal_${index}`}
                                            name={`typeOfAnimal_${index}`}
                                            value={patient.typeOfAnimal}
                                            onChange={(e) => handlePatientChange(index, 'typeOfAnimal', e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor={`age_${index}`} className="form-label">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`age_${index}`}
                                            name={`age_${index}`}
                                            value={patient.age}
                                            onChange={(e) => handlePatientChange(index, 'age', e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor={`numberOfHeads_${index}`} className="form-label">
                                            Number of Heads
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`numberOfHeads_${index}`}
                                            name={`numberOfHeads_${index}`}
                                            value={patient.numberOfHeads}
                                            onChange={(e) => handlePatientChange(index, 'numberOfHeads', e.target.value)}
                                        />
                                    </div>

                                    <div className="col align-self-end">
                                        {index === formData.patients.length - 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        patients: [...prevFormData.patients, { typeOfAnimal: '', age: '', numberOfHeads: '' }],
                                                    }))
                                                }
                                            >
                                                Add More
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}


                            <div className="col-md-6">
                                <label htmlFor="services" className="form-label">
                                    Services
                                </label>
                                {services.map((service) => (
                                    <div key={service._id} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`service_${service._id}`}
                                            name={service.serviceType}
                                            checked={formData.services.includes(service.serviceType)} // Check based on the formData
                                            onChange={handleServiceChange}
                                        />
                                        <label className="form-check-label">{service.serviceType}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
