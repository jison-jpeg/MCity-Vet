import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddItem() {
    const { currentUser } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(0);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleQuantityChange = (value) => {
        // Ensure quantity is not negative
        const newQuantity = Math.max(0, quantity + value);
        setQuantity(newQuantity);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        switch (id) {
            case 'itemName':
                setItemName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'quantity': // Handle quantity input
                const newQuantity = parseInt(value, 10) || 0;
                setQuantity(newQuantity);
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const addedBy = currentUser._id; // Assuming currentUser has _id property

        const itemData = {
            itemName,
            description,
            category,
            quantity,
            addedBy,
        };

        try {
            const response = await fetch('/backend/inventory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Item added:', data);

                // Add system log after adding the item
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
                        activity: `Added item to inventory: ${itemData.itemName}`,
                    }),
                });

                if (systemLogResponse.ok) {

                    // Show a toast notification if the system log was added successfully
                    toast.success('Item added successfully', {
                        position: 'top-right',
                        autoClose: 3000, // Set the duration for which the toast will be displayed (in milliseconds)
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    console.log('System log added:', await systemLogResponse.json());
                } else {
                    console.error('Error adding system log:', systemLogResponse.statusText);
                }

                // You can reset the form or perform other actions after successful creation.
            } else {
                console.error('Error adding item:', response.statusText);
                // Error Toast notification
                toast.warning('Item Already Exist', {
                    position: 'top-right',
                    autoClose: 3000, // Set the duration for which the toast will be displayed (in milliseconds)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Error adding item:', error);
            // Error Toast notification. 
            toast.danger('An Error occured while adding item', {
                position: 'top-right',
                autoClose: 3000, // Set the duration for which the toast will be displayed (in milliseconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <>
            <ToastContainer />  
            <div className="modal fade" id="addModal" tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Item</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={handleFormSubmit}>

                                <div className="col-md-4">
                                    <label htmlFor="itemName" className="form-label">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemName"
                                        value={itemName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="quantity" className="form-label">
                                        Quantity
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="quantity"
                                            value={quantity}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            className="btn btn-outline-primary"
                                            type="button"
                                            onClick={() => handleQuantityChange(-1)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="btn btn-outline-primary"
                                            type="button"
                                            onClick={() => handleQuantityChange(1)}
                                        >
                                            +
                                        </button>

                                    </div>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="category" className="form-label">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="form-select"
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Choose...</option>
                                        <option value="Antibiotics">Antibiotics</option>
                                        <option value="Vitamins">Vitamins</option>
                                        <option value="Minerals">Minerals</option>
                                        <option value="Anti-Inflammatory">Anti-Inflammatory</option>
                                        <option value="Disinfectants">Disinfectants</option>
                                        <option value="Syringes">Syringes</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter a short description about the item..."
                                        id="description"
                                        style={{ height: 80 }}
                                        value={description}
                                        onChange={handleInputChange}
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
