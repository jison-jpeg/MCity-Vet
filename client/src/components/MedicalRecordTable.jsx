import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MedicalRecordTable() {
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await fetch('/backend/medical-record/all');
                const data = await response.json();

                // Fetch additional data for each medical record from the Appointment model
                const recordsWithDetails = await Promise.all(
                    data.map(async (record) => {
                        const appointmentResponse = await fetch(`/backend/appointment/${record.appointmentId}`);
                        const appointmentData = await appointmentResponse.json();
                        return {
                            ...record,
                            firstName: appointmentData.firstName,
                            lastName: appointmentData.lastName,
                        };
                    })
                );

                setMedicalRecords(recordsWithDetails);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        fetchMedicalRecords();
    }, []);

    return (
        <>
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
                    {medicalRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record._id}</td>
                            <td>{record.appointmentId}</td>
                            <td>{record.createdAt}</td>
                            <td>{`${record.firstName} ${record.lastName}`}</td>
                            <td>
                                <Link to={`/medical-record/${record._id}`} className="btn btn-primary-dashboard-action btn-sm">View</Link>
                                <span> | </span>
                                <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
