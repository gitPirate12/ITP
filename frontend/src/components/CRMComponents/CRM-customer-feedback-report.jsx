import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../../styles/CRMstyles/table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerFeedbackReport() {
  const [customerFeedbacks, setCustomerFeedabcks] = useState([]);

  const getCustomerFeedbakcs = async () => {
    const response = await Axios.get(
      "http://localhost:5000/api/v1/generate-customer-suggestions-report"
    );
    setCustomerFeedabcks(response.data);
  };

  useEffect(() => {
    getCustomerFeedbakcs();
  }, []);

  const deleteCustomerFeedback = async (feedback_id) => {
    if (window.confirm("Are You Sure about Customer Inquiry Deletion?")) {
      const response = await Axios.post(
        `http://localhost:5000/api/v1/delete-single-suggestion/${feedback_id}`
      );
      if (response.status === 200) {
        getCustomerFeedbakcs();
        toast.success("Customer Feedaback Deletion Successfull!!!", {
          position: "top-center",
        });
      } //end if
    } //end if
  };

  return (
    <div>
      <h1>Customer Feedback Report</h1>
      <ToastContainer style={{ position: "top-center" }} />
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact Number</th>
              <th style={{ textAlign: "center" }}>Feedaback Submitted Date</th>
              <th style={{ textAlign: "center" }}>Feedaback Description</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerFeedbacks.length > 0 ? (
              customerFeedbacks.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerEmail}</td>
                    <td>{item.customerContact}</td>
                    <td>{item.submittedDate}</td>
                    <td>
                      <Link
                        to={`/single-customer-suggestion/${item.suggestionID}`}
                      >
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() =>
                          deleteCustomerFeedback(item.suggestionID)
                        }
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

export default CustomerFeedbackReport;
