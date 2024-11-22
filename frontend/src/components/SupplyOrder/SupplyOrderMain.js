import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SupplyOrderStore from "./SupplyOrderStore";
import SupplyOrders from "./SupplyOrders";
import SupplyOrderUpdateForm from "./SupplyOrderUpdateForm";
import SupplyOrderForm from "./SupplyOrderForm";
import styled from "styled-components";
import SideBar from "../Sidebar/Sidebar";
import { plus } from "../../utils/Icons";
function SupplyOrder() {
    const store = SupplyOrderStore();
    const [ButtonStatus, setButtonStatus] = useState(false);

    //use effect
    useEffect(() => {
        store.getSupplyOrders();
    }, []);

    return (
        <div className="SupplyOrderList">
            <SupplyOrderStyle>
                <div className="SupplyOrder-content">
                    <SideBar></SideBar>
                </div>
                <div className="content">
                    {ButtonStatus && <SupplyOrderForm />}
                    <div className="submit-btn">
                        {!ButtonStatus && !store.updateSupplyOrderForm._id && (
                            <button
                                className="layer1"
                                onClick={setButtonStatus}
                            >
                                {plus} CREATE SUPPLY ORDER
                            </button>
                        )}
                    </div>

                    <SupplyOrderUpdateForm />

                    {!ButtonStatus && <SupplyOrders />}

                    <div className="cancle">
                        {ButtonStatus && (
                            <button
                                className="cancle"
                                onClick={() => setButtonStatus(false)}
                            >
                                Cancle
                            </button>
                        )}
                    </div>
                </div>
            </SupplyOrderStyle>
        </div>
    );
}
const SupplyOrderStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .SupplyOrder-content {
        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }
    }
    .content {
        margin: 0;
    }

    .sidebar-container {
        min-width: 250px;
        margin-right: 20px;
    }

    .submit-btn {
        display: flex;
        align-items: center;

        justify-content: flex-end;
        margin-bottom: 20px;
    }

    .cancle {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
    }

    button {
        background-color: #008cba;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: #005f79;
        }

        &.layer1 {
            background-color: #fff;
            color: #008cba;
            border: 1px solid #008cba;

            &:hover {
                background-color: #008cba;
                color: #fff;
            }
        }
    }
`;

export default SupplyOrder;
