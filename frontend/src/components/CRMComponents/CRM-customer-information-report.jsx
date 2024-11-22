import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../styles/CRMstyles/table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerInformationReport() {
  const [customerInformation, setCustomerInformation] = useState([]);

  const getCustomerInformation = async () => {
    const response = await Axios.get(
      "http://localhost:5000/api/v1/generate-customer-information-report"
    );
    setCustomerInformation(response.data);
  };

  useEffect(() => {
    getCustomerInformation();
  }, []);

  const deleteCustomer = async (email) => {
    if (window.confirm("Are You Sure about Customer Information Deletion?")) {
      const response = await Axios.post(
        `http://localhost:5000/api/v1/delete-customer/${email}`
      );
      if (response.status === 200) {
        getCustomerInformation();
        toast.success("Customer Information Deletion Successfull!!!", {
          position: "top-center",
        });
      } //end if
    } //end if
  };

  return (
    <div>
      <h1>Customer Information Report</h1>
      <ToastContainer />
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Home Address</th>
              <th style={{ textAlign: "center" }}>Contact Number</th>
              <th style={{ textAlign: "center" }}>Membership Started Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerInformation.length > 0 ? (
              customerInformation.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerEmail}</td>
                    <td>{item.customerAddress}</td>
                    <td>{item.customerContact}</td>
                    <td>{item.membershipStartedDate}</td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteCustomer(item.customerEmail)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="empty-p">Data Not Available!!!</p>
            )}
          </tbody>
        </table>
        <button
          class="btn btn-success"
          style={{ width: 200, marginLeft: "42%", marginTop: 20 }}
          type="button"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default CustomerInformationReport;
