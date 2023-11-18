import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddAccount() {
    const { currentUser } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        address: '',
        gender: '',
        birthdate: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };
    // console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/backend/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);

                // Add system log after creating the user
                const systemLogResponse = await fetch('/backend/logs/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountId: currentUser._id,
                        name: `${currentUser.firstName} ${currentUser.lastName}`,
                        role: currentUser.role,
                        dateTime: new Date(),
                        activity: `Created an account for ${user.firstName} ${user.lastName}`,
                    }),
                });

                if (systemLogResponse.ok) {
                    console.log('System log added:', await systemLogResponse.json());
                } else {
                    console.error('Error adding system log:', systemLogResponse.statusText);
                }

                // Reset the form or perform other actions after successful creation.
            } else {
                console.error('Error creating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    return (
        <>
            <div className="modal fade" id="addModal" tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add an Account</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="row g-3">


                                <div className="col-md-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input type="text" className="form-control" id="firstName"
                                        value={user.firstName}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input type="text" className="form-control" id="lastName"
                                        value={user.lastName}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="middleName" className="form-label">
                                        Middle Name
                                    </label>
                                    <input type="text" className="form-control" id="middleName"
                                        value={user.middleName}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="role" className="form-label">
                                        Role
                                    </label>
                                    <select id="role" className="form-select" value={user.role} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="admin">Admin</option>
                                        <option value="customer">Customer</option>
                                        <option value="secretary">Secretary</option>
                                        <option value="technician">Technician</option>
                                    </select>
                                </div>


                                <div className="col-9">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Street, Barangay, City, Province"
                                        value={user.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="gender" className="form-label">
                                        Gender
                                    </label>
                                    <select id="gender" className="form-select" defaultValue={""}  onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="birthdate" className="form-label">
                                        Birthdate
                                    </label>
                                    <input type="date" className="form-control" id="birthdate"
                                    value={user.birthdate}
                                    onChange={handleChange}/>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number
                                    </label>
                                    <input type="number" className="form-control" id="phone" placeholder='0912 345 6789'
                                    value={user.phone}
                                    onChange={handleChange}/>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="example@email.com"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter a passoword"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
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
