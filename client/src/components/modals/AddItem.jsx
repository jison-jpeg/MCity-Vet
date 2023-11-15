import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function AddItem() {
    const { currentUser } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (value) => {
        // Ensure quantity is not negative
        const newQuantity = Math.max(0, quantity + value);
        setQuantity(newQuantity);
    };

    const handleInputChange = (event) => {
        // Parse the input value as an integer
        const newQuantity = parseInt(event.target.value, 10) || 0;
        setQuantity(newQuantity);
    };


    return (
        <>
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
                            <form className="row g-3">

                                <div className="col-md-4">
                                    <label htmlFor="itemName" className="form-label">
                                        Item Name
                                    </label>
                                    <input type="text" className="form-control" id="itemName" />
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
                                    <select id="category" className="form-select">
                                        <option value="" disabled>Choose...</option>
                                        <option>Antibiotics</option>
                                        <option>Vitamins</option>
                                        <option>Minerals</option>
                                        <option>Anti-Inflammatory</option>
                                        <option>Disinfectants</option>
                                        <option>Syringes</option>
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
                                        defaultValue={""}
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
