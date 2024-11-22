import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import "../../styles/CRMstyles/customer-registration-form.css";

function CRMsingleFeedback() {
  const { feedbackId } = useParams();
  const [singleCustomerFeedback, setSingleCustomerFeedaback] = useState([]);

  const getSingleCustomerFeedback = async (feedbackId) => {
    const response = await Axios.get(
      `http://localhost:5000/api/v1/single-customer-suggestion/${feedbackId}`
    );
    setSingleCustomerFeedaback(response.data);
  };

  useEffect(() => {
    if (feedbackId) {
      getSingleCustomerFeedback(feedbackId);
    } //end if
  }, [feedbackId]);
  return (
    <div>
      <div class="container mt-4">
        <h2 style={{ color: "black" }}>Customer Feedback</h2>
        <form action="" method="post">
          <div class="form-group">
            <label style={{ color: "black" }} for="name">
              Name:
            </label>
            <input
              type="text"
              class="form-control"
              value={singleCustomerFeedback.customerName}
              disabled
            />
          </div>
          <div class="form-group">
            <label style={{ color: "black" }} for="email">
              Email:
            </label>
            <input
              type="email"
              class="form-control"
              value={singleCustomerFeedback.customerEmail}
              disabled
            />
          </div>
          <div class="form-group">
            <label style={{ color: "black" }} for="contact">
              Contact:
            </label>
            <input
              type="tel"
              class="form-control"
              value={singleCustomerFeedback.customerContact}
              disabled
            />
          </div>

          <div class="form-group">
            <label style={{ color: "black" }} for="inquiry">
              Feedback:
            </label>
            <textarea
              class="form-control"
              id="inquiry"
              rows="5"
              value={singleCustomerFeedback.suggestionDescription}
              disabled
            />
          </div>
          <Link to={`/send-emails/${singleCustomerFeedback.customerEmail}`}>
            <button type="submit" class="btn btn-primary">
              Reply
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CRMsingleFeedback;
