import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/CRMstyles/crm-dashboard.css";

class CRMCustomerDashboard extends Component {
  state = {};
  render() {
    return (
      <div style={{ border: "2px black solid" }} className="container">
        <h1>SAP Customers</h1>
        <div className="main-navigation-button-group">
          <Link to="/customer-registration-form">
            <button className="report-generating-button">
              Customer Registration Page
            </button>
          </Link>
          <Link to="/customer-inquiry-form">
            <button className="report-generating-button">
              Customer Inquiry Submission Page
            </button>
          </Link>
          <Link to="/customer-feedback-form">
            <button className="report-generating-button">
              Customer Feedback Submission Page
            </button>
          </Link>

          <Link to="/customer-sign-in-portal">
            <button className="report-generating-button">
              Cusomer Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CRMCustomerDashboard;
