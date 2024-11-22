import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import "../../styles/CRMstyles/customer-registration-form.css";

function CRMsingleInquiry() {
  const { inquiryId } = useParams();
  const [singleCustomerInquiry, setSingleCustomerInquiry] = useState([]);

  const getSingleCustomerInquiry = async (inquiryId) => {
    const response = await Axios.get(
      `http://localhost:5000/api/v1/single-customer-inquiry/${inquiryId}`
    );
    setSingleCustomerInquiry(response.data);
  };

  useEffect(() => {
    if (inquiryId) {
      getSingleCustomerInquiry(inquiryId);
    } //end if
  }, [inquiryId]);
  return (
    <div>
      <div class="container mt-4">
        <h2 style={{ color: "black" }}>Customer Inquiry</h2>
        <form action="" method="post">
          <div class="form-group">
            <label for="name" style={{ color: "black" }}>
              Name:
            </label>
            <input
              type="text"
              class="form-control"
              value={singleCustomerInquiry.customerName}
              disabled
            />
          </div>
          <div class="form-group">
            <label for="email" style={{ color: "black" }}>
              Email:
            </label>
            <input
              type="email"
              class="form-control"
              value={singleCustomerInquiry.customerEmail}
              disabled
            />
          </div>
          <div class="form-group">
            <label for="contact" style={{ color: "black" }}>
              Contact:
            </label>
            <input
              type="tel"
              class="form-control"
              value={singleCustomerInquiry.customerContact}
              disabled
            />
          </div>
          <div class="form-group">
            <label for="contact" style={{ color: "black" }}>
              Inquiry Type:
            </label>
            <input
              type="tel"
              class="form-control"
              value={singleCustomerInquiry.inquiryType}
              disabled
            />
          </div>
          <div class="form-group">
            <label for="inquiry" style={{ color: "black" }}>
              Inquiry:
            </label>
            <textarea
              class="form-control"
              id="inquiry"
              rows="5"
              value={singleCustomerInquiry.inquiryDescription}
              disabled
            />
          </div>
          <Link to={`/send-emails/${singleCustomerInquiry.customerEmail}`}>
            <button type="submit" class="btn btn-primary">
              Reply
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CRMsingleInquiry;
