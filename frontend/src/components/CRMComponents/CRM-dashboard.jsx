import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/CRMstyles/crm-dashboard.css";

function CRMDashboard() {
  return (
    <div style={{ border: "2px black solid" }} className="container">
      <h1>Customer Relationship Management Unit</h1>
      <div className="main-navigation-button-group">
        <Link to="/customer-information-report">
          <button className="report-generating-button">
            Generate Customer Information Report
          </button>
        </Link>

        <Link to="/customer-inquiry-report">
          <button className="report-generating-button">
            Generate Customer Inquiry Report
          </button>
        </Link>
        <Link to="/customer-feedback-report">
          <button className="report-generating-button">
            Generate Customer Feedback/Suggestion Report
          </button>
        </Link>
        <Link to="/send-emails">
          <button className="report-generating-button">Send Emails</button>
        </Link>
      </div>
    </div>
  );
}

export default CRMDashboard;
