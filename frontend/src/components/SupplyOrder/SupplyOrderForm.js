import React from "react";
import SupplyOrderStore from "./SupplyOrderStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export default function SupplyOrderForm() {
    const store = SupplyOrderStore();

    if (store.updateSupplyOrderForm._id) return <></>;
    return (
        <FormStyled>
            <div className="form">
                <h2>Supply Order </h2>
                <form onSubmit={store.createSupplyOrder}>
                    <div className="input-control">
                        <h3>SupplyOrder ID</h3>
                        <input
                            type="text"
                            onChange={store.updateCreateSupplyOrder}
                            value={store.createSupplyOrderForm.orderID}
                            name="orderID"
                        ></input>
                    </div>
                    <div className="input-control">
                        <h3>Supplier ID</h3>
                        <input
                            type="text"
                            onChange={store.updateCreateSupplyOrder}
                            value={store.createSupplyOrderForm.SID}
                            name="SID"
                        ></input>
                    </div>
                    <div className="input-control">
                        <h3>Supplier Name</h3>
                        <input
                            type="text"
                            onChange={store.updateCreateSupplyOrder}
                            value={store.createSupplyOrderForm.supplierName}
                            name="supplierName"
                        />
                    </div>
                    <div className="input-control">
                        <h3>Item</h3>
                        <input
                            type="text"
                            onChange={store.updateCreateSupplyOrder}
                            value={store.createSupplyOrderForm.item}
                            name="item"
                        />
                    </div>
                    <div className="input-control">
                        <div>
                            <h3>Amount</h3>
                            <input
                                type="text"
                                onChange={store.updateCreateSupplyOrder}
                                value={store.createSupplyOrderForm.amount}
                                name="amount"
                            />
                        </div>
                        <div className="input-control">
                            <h3>Price</h3>
                            <input
                                type="text"
                                onChange={store.updateCreateSupplyOrder}
                                value={store.createSupplyOrderForm.price}
                                name="price"
                            />
                        </div>
                        <div className="input-control">
                            <h3>Discount</h3>
                            <input
                                type="text"
                                onChange={store.updateCreateSupplyOrder}
                                value={store.createSupplyOrderForm.discount}
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
                                    store.updateCreateSupplyOrder({
                                        target: {
                                            name: "deliverydate",
                                            value: formattedDate,
                                        },
                                    });
                                }}
                                value={store.createSupplyOrderForm.deliverydate}
                                {...(date) => {
                                    let formattedDate = `${date.getFullYear()}-${
                                        date.getMonth() + 1
                                    }-${date.getDate()}`;
                                    store.CreateSupplyOrder({
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
                                type="button"
                                onClick={store.createSupplyOrder}
                            >
                                Create Supply Order
                            </button>
                        </div>
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
    width: 100%;
    color: black;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

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
