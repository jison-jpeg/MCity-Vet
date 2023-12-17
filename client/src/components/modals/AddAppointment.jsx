import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddAppointment({ appointments, setAppointments }) {
    const { currentUser } = useSelector((state) => state.user);
    const [technicians, setTechnicians] = useState([]);
    const [animalInfo, setAnimalInfo] = useState([{ typeOfAnimal: '', age: '', numberOfHeads: '' }]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        date: '',
        technician: '',
        firstName: '',
        lastName: '',
        address: '',
        landmark: '',
        email: '',
        typeOfAnimal: '',
        numberOfHeads: '',
        services: [],
        age: '',
        phoneNumber: '',
    });

    const handleAnimalInfoChange = (index, propertyName, value) => {
        const newAnimalInfo = [...animalInfo];
        newAnimalInfo[index] = { ...newAnimalInfo[index], [propertyName]: value };
        setAnimalInfo(newAnimalInfo);

        console.log('Updated animalInfo:', newAnimalInfo);
    };


    const handleAddMore = () => {
        setAnimalInfo([...animalInfo, { typeOfAnimal: '', age: '', numberOfHeads: '' }]);
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


    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedDate = new Date(formData.date);
        const currentDate = new Date();
        setIsLoading(true);
        // Perform validation
        if (!formData.date || !formData.technician || !formData.address || !formData.email || !formData.phoneNumber || animalInfo.some(animal => !animal.typeOfAnimal || !animal.age || !animal.numberOfHeads) || formData.services.length === 0) {
            // If any required field is missing, show an error toast and return
            toast.error('Please fill in all required fields.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (selectedDate < currentDate) {
            // If the selected date is in the past, show an error toast and return
            toast.error('Please select a future date for your appointment.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
    
        const userRole = currentUser.role;
        let firstName = userRole === 'customer' ? currentUser.firstName : formData.firstName;
        let lastName = userRole === 'customer' ? currentUser.lastName : formData.lastName;
        let email = userRole === 'customer' ? currentUser.email : formData.email;

        const appointmentData = {
            schedule: formData.date,
            technicianName: formData.technician,
            firstName: firstName,
            lastName: lastName,
            phone: formData.phoneNumber,
            email: email,
            services: formData.services,
            address: formData.address,
            landmark: formData.landmark,
            patient: animalInfo.map(animal => ({
                typeOfAnimal: animal.typeOfAnimal,
                numberOfHeads: animal.numberOfHeads,
                age: animal.age,
            })),
        };
        console.log('Submitted appointmentData:', appointmentData);


        try {
            const response = await fetch('/backend/appointment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Appointment created:', data);

                // Show a toast after successful appointment creation
                toast.success('Appointment created successfully!', {
                    position: 'top-right',
                    autoClose: 3000, // Set the duration for which the toast will be displayed (in milliseconds)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                setAppointments((prevAppointments) => {
                    const updatedAppointments = prevAppointments ? [...prevAppointments, data] : [data];
                    return updatedAppointments;
                });

                // Add system log after creating the appointment
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
                        activity: `Created an appointment this coming ${appointmentData.schedule} for ${appointmentData.firstName} ${appointmentData.lastName}`,
                    }),
                });

                if (systemLogResponse.ok) {
                    console.log('System log added:', await systemLogResponse.json());
                } else {
                    console.error('Error adding system log:', systemLogResponse.statusText);
                }

                // You can reset the form or perform other actions after successful creation.
            } else {
                console.error('Error creating appointment:', response.statusText);

                // Show a toast after failed appointment creation
                toast.error('Failed to create appointment!', {
                    position: 'top-right',
                    autoClose: 3000, // Set the duration for which the toast will be displayed (in milliseconds)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            // Show an error toast for general errors

            toast.error('An error occurred. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            // Set loading state to false after the request is completed (success or failure)
            setIsLoading(false);
        }
    };

    const handleServiceChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setFormData({
                ...formData,
                services: [...formData.services, name],
            });
        } else {
            setFormData({
                ...formData,
                services: formData.services.filter((service) => service !== name),
            });
        }
    };




    return (
        <div className="modal fade" id="addModal" tabIndex={-1}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Book Appointment</h5>
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
                                    value={currentUser.role === 'customer' ? currentUser.firstName : formData.firstName}
                                    onChange={handleInputChange}
                                    disabled={currentUser.role === 'customer'}
                                    required
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
                                    value={currentUser.role === 'customer' ? currentUser.lastName : formData.lastName}
                                    onChange={handleInputChange}
                                    disabled={currentUser.role === 'customer'}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="technician" className="form-label">
                                    Technician Name and Schedule
                                </label>
                                <select
                                    id="technician"
                                    className="form-select"
                                    required
                                    value={formData.technician}
                                    onChange={handleInputChange}
                                >
                                    <option disabled value={''}>Choose...</option>
                                    {technicians.map((technician) => (
                                        <option key={technician._id} value={technician._id}>
                                            {technician.firstName} {technician.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">
                                    Date for your Appointment
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    required
                                    value={formData.date}
                                    onChange={handleInputChange}
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
                                    placeholder="Ex. 1234 Main St"
                                    value={formData.address}
                                    onChange={handleInputChange}
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
                                    placeholder="Ex. Juan's Store"
                                    value={formData.landmark}
                                    onChange={handleInputChange}
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
                                    placeholder="example@gmail.com"
                                    value={currentUser.role === 'customer' ? currentUser.email : formData.email}
                                    onChange={handleInputChange}
                                    disabled={currentUser.role === 'customer'}

                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder='0912 345 6789'
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>


                            {animalInfo.map((animal, index) => (
                                <div key={index} className='row g-3'>
                                    <div className="col-3">
                                        <label htmlFor={`typeOfAnimal_${index}`} className="form-label">
                                            Animal Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`typeOfAnimal_${index}`}
                                            value={animal.typeOfAnimal}
                                            onChange={(event) => handleAnimalInfoChange(index, 'typeOfAnimal', event.target.value)}
                                        />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor={`age_${index}`} className="form-label">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`age_${index}`}
                                            value={animal.age}
                                            onChange={(event) => handleAnimalInfoChange(index, 'age', event.target.value)}
                                        />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor={`numberOfHeads_${index}`} className="form-label">
                                            Number of Heads
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`numberOfHeads_${index}`}
                                            value={animal.numberOfHeads}
                                            onChange={(event) => handleAnimalInfoChange(index, 'numberOfHeads', event.target.value)}
                                        />
                                    </div>

                                    {index === animalInfo.length - 1 && (
                                        <div className="col-md-3 align-self-end">
                                            <button type="button" className="btn btn-outline-primary" onClick={handleAddMore}>
                                                Add More
                                            </button>
                                        </div>
                                    )}
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
                                            name={service.serviceType} // Use service.serviceType as the name attribute
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
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading && (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Loading...
                                        </>
                                    )}
                                    {!isLoading && 'Create Appointment'}
                                </button>
                                <ToastContainer />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
