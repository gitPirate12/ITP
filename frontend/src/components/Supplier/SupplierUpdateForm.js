import React from "react";
import SupplierStore from "./SupplierStore";
import styled from "styled-components";

export default function SupplierUpdateForm() {
    const store = SupplierStore();
    if (!store.updateSupplierForm._id) return <></>;
    return (
        <FormStyled>
            <div className="form">
                <h2>Update supplier</h2>
                <form onSubmit={() => store.updateSupplier}>
                    <div className="input-control">
                        <h3>Supplier ID</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplierForm.SID}
                            name="SID"
                        ></input>
                    </div>
                    <div className="input-control">
                        <h3>Supplier Name</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplierForm.supplierName}
                            name="supplierName"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Contact Number</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplierForm.phone}
                            name="phone"
                        />
                    </div>

                    <div className="input-control">
                        <h3>item type</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplierForm.itemType}
                            name="itemType"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Payment Details</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplierForm.paymentDetails}
                            name="paymentDetails"
                        />
                    </div>
                    <div className="submit-btn">
                        <button
                            id="button"
                            type="button"
                            onClick={store.updateSupplier}
                        >
                            update Supplier
                        </button>
                    </div>
                </form>
            </div>
        </FormStyled>
    );
}
const FormStyled = styled.form`
    background-color: #576cbc;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    color: black;

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            font-size: 28px;
            margin-bottom: 30px;
        }

        form {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .input-control {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;

            h3 {
                font-size: 16px;
                margin-bottom: 5px;
            }

            input {
                width: 100%;
                padding: 10px;
                border-radius: 5px;
                border: none;
                font-size: 16px;
            }
        }

        .submit-btn {
            margin-top: 30px;

            button {
                padding: 10px 20px;
                background-color: #008cba;
                border: none;
                color: #fff;
                font-size: 18px;
                border-radius: 5px;
                cursor: pointer;

                &:hover {
                    background-color: #006f8b;
                }
            }
        }
    }
`;
