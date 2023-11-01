import React, { useState, useEffect } from 'react';

export default function AddAppointment() {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        // Fetch the list of technicians from your API
        fetch('/backend/user/technicians') // Replace with the actual API endpoint
            .then((response) => response.json())
            .then((data) => {
                setTechnicians(data);
            })
            .catch((error) => {
                console.error('Error fetching technicians: ', error);
            });
    }, []);

    return (
        <>
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
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="date" className="form-label">
                                        Date for your Appointment
                                    </label>
                                    <input type="date" className="form-control" id="date" required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="technician" className="form-label">
                                        Technician Name and Schedule
                                    </label>
                                    <select id="technician" className="form-select" defaultValue={""} required>
                                        <option value={""}>Choose...</option>
                                        {technicians.map((technician) => (
                                            <option key={technician._id} value={technician._id}>
                                                {technician.firstName} {technician.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input type="text" className="form-control" id="firstName" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input type="text" className="form-control" id="lastName" />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="1234 Main St"
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="landmark" className="form-label">
                                        Landmark
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="landmark"
                                        placeholder="Juan's Store"
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="typeOfAnimal" className="form-label">
                                        Type of Animal
                                    </label>
                                    <input type="text" className="form-control" id="typeOfAnimal" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="numberOfHeads" className="form-label">
                                        Number of Heads
                                    </label>
                                    <input type="number" className="form-control" id="numberOfHeads" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputZip" className="form-label">
                                        Phone Number
                                    </label>
                                    <input type="phoneNumber" className="form-control" id="phoneNumber" placeholder='0912 345 6789' />
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
            {/* End Vertically centered Modal*/}
        </>

    )
}
