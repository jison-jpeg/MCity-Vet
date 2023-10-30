import React from 'react'

export default function AddAccount() {
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
                            <form className="row g-3">


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

                                <div className="col-md-3">
                                    <label htmlFor="middleName" className="form-label">
                                        Middle Name
                                    </label>
                                    <input type="text" className="form-control" id="middleName" />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="role" className="form-label">
                                        Role
                                    </label>
                                    <select id="role" className="form-select" defaultValue={""} required>
                                        <option value={""}>Choose...</option>
                                        <option>...</option>
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
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="gender" className="form-label">
                                        Gender
                                    </label>
                                    <select id="gender" className="form-select" defaultValue={""} required>
                                        <option value={""}>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="birthdate" className="form-label">
                                        Birthdate
                                    </label>
                                    <input type="text" className="form-control" id="birthdate" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number
                                    </label>
                                    <input type="number" className="form-control" id="phone" placeholder='0912 345 6789' />
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
