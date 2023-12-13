import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UpdateItem from './modals/UpdateItem';

export default function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [userDisplayNames, setUserDisplayNames] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Initialize selectedItem

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetch('/backend/inventory/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Inventory Data:', data);
        setInventoryData(data);

        // Extract addedBy user IDs from the data
        const userIds = data.map((item) => item.addedBy);

        // Fetch user display names and update state
        Promise.all(userIds.map(fetchUserName))
          .then((displayNames) => setUserDisplayNames(displayNames))
          .catch((error) => console.error('Error fetching user display names:', error));
      })
      .catch((error) => console.error('Error fetching inventory data:', error));
  }, []);

  const fetchUserName = (userId) => {
    return fetch(`/backend/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => `${userData.firstName} ${userData.lastName}`)
      .catch((error) => {
        console.error('Error fetching user data:', error);
        return 'Unknown User';
      });
  };

  const getStatusBadgeClass = (status) => {
    return status === 'In Stock' ? 'bg-success' : 'bg-danger';
  };
  

  return (
    <>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Items Inventory</h5>
            {inventoryData.length === 0 ? (
              <p>No Items</p>
            ) : (
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
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((item, index) => (
                      <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                        <td>{item.category}</td>
                        <td>{item.dateAdded}</td>
                        <td>{item.dateUpdated}</td>
                        <td>{userDisplayNames[index]}</td>
                        <td> <span className={`badge rounded-pill ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span> </td>
                        <td>
                          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
                            <button
                              type="button"
                              className="btn btn-primary-dashboard-action btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#updateModal"
                              onClick={() => setSelectedItem(item)}
                            >
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
            )}
          </div>
        </div>
      </div>

      <UpdateItem selectedItem={selectedItem} />

    </>
  );
}