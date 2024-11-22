import React from "react";
import SupplyOrderStore from "./SupplyOrderStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export default function SupplyOrderUpdateForm() {
    const store = SupplyOrderStore();
    if (!store.updateSupplyOrderForm._id) return <></>;
    return (
        <FormStyled>
            <div className="form">
                <h2>Update Supply Order</h2>
                <form onSubmit={store.updateSupplyOrder}>
                    <div className="input-control">
                        <h3>SupplyOrder ID</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.orderID}
                            name="orderID"
                        ></input>
                    </div>
                    <div className="input-control">
                        <h3>Supplier ID</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.SID}
                            name="SID"
                        ></input>
                    </div>
                    <div className="input-control">
                        <h3>Supplier Name</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.supplierName}
                            name="supplierName"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Item</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.item}
                            name="item"
                        />
                    </div>

                    <div className="input-control">
                        <h3>Amount</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.amount}
                            name="amount"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Price</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.price}
                            name="price"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Discount</h3>
                        <input
                            type="text"
                            onChange={store.handleUpdateFieldChange}
                            value={store.updateSupplyOrderForm.discount}
                            name="discount"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Delivery Date</h3>

                        <DatePicker
                            type="date"
                            name="deliverydate"
                            dateFormat="yyyy-mm-dd"
                            onChange={(date) => {
                                let formattedDate = `${date.getFullYear()}-${
                                    date.getMonth() + 1
                                }-${date.getDate()}`;
                                store.handleUpdateFieldChange({
                                    target: {
                                        name: "deliverydate",
                                        value: formattedDate,
                                    },
                                });
                            }}
                            value={store.updateSupplyOrderForm.deliverydate}
                            {...(date) => {
                                let formattedDate = `${date.getFullYear()}-${
                                    date.getMonth() + 1
                                }-${date.getDate()}`;
                                store.updateCreateSupplyOrder({
                                    target: {
                                        name: "deliverydate",
                                        value: formattedDate,
                                    },
                                });
                            }}
                        />
                    </div>
                    <div className="submit-btn">
                        <button
                            id="button"
                            type="button"
                            onClick={store.updateSupplyOrder}
                        >
                            Update
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
    margin-left: 350px;
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
