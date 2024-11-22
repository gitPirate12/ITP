import SupplyOrderStore from "./SupplyOrderStore";
import styled from "styled-components";
import { dateFormat } from "../Sidebar/dateformat";
import jsPDF from "jspdf";
import { edit, deletebutton } from "../../utils/Icons";

export default function SupplyOrders() {
    const store = SupplyOrderStore();
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setProperties({
            title: "Supplier List",
        });
        doc.autoTable({
            head: [
                [
                    "Order ID",
                    "SID",
                    "Supplier Name",
                    "Item",
                    "Amount",
                    "Price",
                    "Discount",
                ],
            ],
            body: store.SupplyOrderData.map((SupplyOrder) => [
                SupplyOrder.orderID,
                SupplyOrder.SID,
                SupplyOrder.supplierName,
                SupplyOrder.item,
                SupplyOrder.amount,
                SupplyOrder.price,
                SupplyOrder.discount,
            ]),
        });
        doc.save("supplier-order-list.pdf");
    };
    return (
        <SuppplierOrderlistStyled>
            <div className="content">
                <div className="inner-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Supplier ID</th>
                                <th>Supplier Name</th>
                                <th>Item</th>
                                <th> Quantity</th>
                                <th> Price</th>
                                <th>Discount</th>
                                <th>Delivery Date</th>
                                <th>{edit} Edit</th>
                                <th>{deletebutton} Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.SupplyOrderData &&
                                store.SupplyOrderData.map((SupplyOrder) => {
                                    return (
                                        <tr key={SupplyOrder._id}>
                                            <td>{SupplyOrder.orderID}</td>
                                            <td>{SupplyOrder.SID}</td>
                                            <td>{SupplyOrder.supplierName}</td>
                                            <td>{SupplyOrder.item}</td>
                                            <td>{SupplyOrder.amount}</td>
                                            <td>{SupplyOrder.price}</td>
                                            <td>{SupplyOrder.discount}</td>
                                            <td>
                                                {dateFormat(
                                                    SupplyOrder.deliverydate
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="update"
                                                    onClick={() =>
                                                        store.toggleUpdate(
                                                            SupplyOrder
                                                        )
                                                    }
                                                >
                                                    {edit}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="delete"
                                                    onClick={() =>
                                                        store.deleteSupplyOrder(
                                                            SupplyOrder._id
                                                        )
                                                    }
                                                >
                                                    {deletebutton}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <button id="pdf button" onClick={generatePDF}>
                        Generate PDF
                    </button>
                </div>
            </div>
        </SuppplierOrderlistStyled>
    );
}

const SuppplierOrderlistStyled = styled.div`
    .content {
        color: black;
        display: float;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 50px auto;

        max-width: 800px;
        padding-left: 50px;
        margin-left: 200px;
    }
    .table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 8px;
    }

    .inner-content {
        display: flex;
        flex-direction: column;
        width: 1100px;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        margin-left: 20px;
    }

    .text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }

    p {
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        color: #333;
    }
    .pdf button {
        background-color: #fff;
        color: #fff;
        width: 50px;
    }

    .button {
        background-color: #008cba;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease-in-out;
    }

    button:hover {
        background-color: #005f79;
    }

    .update {
        margin-right: 10px;
        background-color: green;
    }
    .delete {
        margin-right: 10px;
        background-color: red;
    }
`;
