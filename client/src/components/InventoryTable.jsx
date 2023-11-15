import React, { useEffect, useState } from 'react'

export default function InventoryTable() {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {

        fetch('/backend/inventory/all')
          .then((response) => response.json())
          .then((data) => setInventoryData(data))
          .catch((error) => console.error('Error fetching inventory data:', error));
      }, []);
    

    return (
        <>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Items Inventory</h5>
                        <div className="table-responsive-md">
                            <table className="table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Date Added</th>
                                        <th scope="col">Date Updated</th>
                                        <th scope="col">Added By</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{item.category}</td>
                      <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                      <td>{new Date(item.dateUpdated).toLocaleDateString()}</td>
                      <td>{item.addedBy}</td>
                      <td>
                        <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
                          <button type="button" className="btn btn-primary-dashboard-action btn-sm">
                            Update
                          </button>
                          <button type="button" className="btn btn-secondary-dashboard-action btn-sm">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
