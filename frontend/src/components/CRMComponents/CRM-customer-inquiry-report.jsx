import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../../styles/CRMstyles/table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerInquiryReport() {
  const [customerInquiries, setCustomerInquiries] = useState([]);

  const getCustomerInquiries = async () => {
    const response = await Axios.get(
      "http://localhost:5000/api/v1/generate-customer-inquiry-report"
    );

    setCustomerInquiries(response.data);
  };

  useEffect(() => {
    getCustomerInquiries();
  }, []);

  const deleteCustomerInquiry = async (inquiry_id) => {
    if (window.confirm("Are You Sure about Customer Inquiry Deletion?")) {
      const response = await Axios.post(
        `http://localhost:5000/api/v1/delete-single-inquiry/${inquiry_id}`
      );
      if (response.status === 200) {
        getCustomerInquiries();
        toast.success("Customer Inquiry Deletion Successfull!!!", {
          position: "top-center",
        });
      } //end if
    } //end if
  };

  return (
    <div>
      <h1>Customer Inquiry Report</h1>
      <ToastContainer style={{ position: "top-center" }} />
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact Number</th>
              <th style={{ textAlign: "center" }}>Inquiry Type</th>
              <th style={{ textAlign: "center" }}>Inquiry Submitted Date</th>
              <th style={{ textAlign: "center" }}>Inquiry Description</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerInquiries.length > 0 ? (
              customerInquiries.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerEmail}</td>
                    <td>{item.customerContact}</td>
                    <td>{item.inquiryType}</td>
                    <td>{item.submittedDate}</td>
                    <td>
                      <Link to={`/single_customer_inquiry/${item.inquiryID}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteCustomerInquiry(item.inquiryID)}
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

export default CustomerInquiryReport;
