import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function UpdateItem({ selectedItem }) {
    const { currentUser } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(0);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [lastModifiedBy, setLastModifiedBy] = useState('N/A');

    useEffect(() => {
        // Update state when selectedItem changes
        if (selectedItem) {
            setQuantity(selectedItem.quantity || 0);
            setItemName(selectedItem.itemName || '');
            setDescription(selectedItem.description || '');
            setCategory(selectedItem.category || '');
            fetchLastModifiedBy(selectedItem.updatedBy);
        }
    }, [selectedItem]);

    const fetchLastModifiedBy = (userId) => {
        if (userId) {
            fetch(`/backend/user/${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((userData) => {
                    setLastModifiedBy(`${userData.firstName} ${userData.lastName}`);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLastModifiedBy('N/A');
                });
        } else {
            setLastModifiedBy('N/A');
        }
    };

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
            case 'quantity':
                // Handle quantity input
                const newQuantity = parseInt(value, 10) || 0;
                setQuantity(newQuantity);
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const updatedBy = currentUser._id; // Assuming currentUser has _id property

        const updatedItemData = {
            itemName,
            description,
            category,
            quantity,
            updatedBy,
        };

        if (quantity === 0) {
            updatedItemData.status = 'Out of Stock';
        } else {
            updatedItemData.status = 'In Stock';
        }

        try {
            const response = await fetch(`/backend/inventory/update/${selectedItem._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItemData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Item updated:', data);
                // You can close the modal or perform other actions after successful update.
            } else {
                console.error('Error updating item:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <>
            <div className="modal fade" id="updateModal" tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Item</h5>
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
                                        value={category}
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
                                <div className="modal-footer d-flex justify-content-between">
                                    <span className='text-muted'>Last Modified by: {lastModifiedBy}</span>
                                    <div className='class="d-grid gap-2 d-sm-flex justify-content-sm-end'>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Vertically centered Modal*/}
        </>
    );
}
