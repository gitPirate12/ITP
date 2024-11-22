import SupplierMain from "./SupplierMain";
import SupplierStore from "./SupplierStore";
import styled from "styled-components";
import {
    SID,
    user,
    phone,
    item,
    cards,
    edit,
    deletebutton,
} from "../../utils/Icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function Suppliers() {
    const store = SupplierStore();
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setProperties({
            title: "Supplier List",
        });
        doc.autoTable({
            head: [["SID", "Name", "Phone", "Item", "Payment"]],
            body: store.supplierData.map((supplier) => [
                supplier.SID,
                supplier.supplierName,
                supplier.phone,
                supplier.itemType,
                supplier.paymentDetails,
            ]),
        });
        doc.save("supplier-list.pdf");
    };
    return (
        <SuppplierlistStyled>
            <div className="content">
                <div className="inner-content">
                    <table>
                        <thead>
                            <tr>
                                <th>{SID} SID</th>
                                <th>{user} Name</th>
                                <th>{phone} Phone</th>
                                <th>{item} Item</th>
                                <th>{cards} Payment</th>
                                <th>{edit} Edit</th>
                                <th>{deletebutton} Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.supplierData &&
                                store.supplierData.map((Suppliers) => {
                                    return (
                                        <tr key={Suppliers._id}>
                                            <td>{Suppliers.SID}</td>
                                            <td>{Suppliers.supplierName}</td>
                                            <td>{Suppliers.phone}</td>
                                            <td>{Suppliers.itemType}</td>
                                            <td>{Suppliers.paymentDetails}</td>
                                            <td>
                                                <button
                                                    className="update"
                                                    onClick={() =>
                                                        store.toggleUpdate(
                                                            Suppliers
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
                                                        store.deleteSupplier(
                                                            Suppliers._id
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
                    <button onClick={generatePDF}>Generate PDF</button>
                </div>
            </div>
        </SuppplierlistStyled>
    );
}
const SuppplierlistStyled = styled.div`
    .content {
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 50px auto;
        max-width: 800px;
        padding-left: 50px;
        margin-left: 90px;
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
        width: 1000px;
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

    button {
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

    ${SID}, ${user}, ${phone}, ${item}, ${cards}, ${edit}, ${deletebutton} {
        margin-right: 5px;
        font-size: 16px;
        color: #008cba;
    }
`;
