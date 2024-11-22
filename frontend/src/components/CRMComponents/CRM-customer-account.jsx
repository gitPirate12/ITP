import React, { Component } from "react";
import "../../styles/CRMstyles/customer-profile.css";
import "../../styles/CRMstyles/customer-registration-form.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import pp from "../../images/CRMimages/default_profile_picture.png";

function CustomerAccount() {
  const location = useLocation();
  let userEmail = location.state.userEmail;
  let userPassword = location.state.userPassword;

  const [customerInformation, setCustomerInformation] = useState([]);

  const getCustomerInformation = async () => {
    const response = await Axios.get(
      `http://localhost:5000/api/v1/load-customer-account/${userEmail}/${userPassword}`
    );

    setCustomerInformation(response.data);
    toast.success(`Welcome ${response.data.customerName}!!!`);
  };

  useEffect(() => {
    getCustomerInformation();
  }, []);

  const navigate = useNavigate();
  const moveToCustomerProfileEditPage = () => {
    navigate("/customer-account-edit-form", {
      state: {
        customerEmail: customerInformation.customerEmail,
        customerName: customerInformation.customerName,
        customerAddress: customerInformation.customerAddress,
        customerContact: customerInformation.customerContact,
        customerPassword: customerInformation.customerPassword,
      },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="profile-pic">
          <img src={pp} />
        </div>

        <h2 style={{ color: "black" }}>SAP Customer Account</h2>
        <ToastContainer />

        <label htmlFor="name" style={{ color: "black" }}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="customer_name"
          value={customerInformation.customerName}
          disabled
        />

        <label htmlFor="email" style={{ color: "black" }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="customer_email"
          value={customerInformation.customerEmail}
          disabled
        />

        <label htmlFor="contact" style={{ color: "black" }}>
          Contact Number:
        </label>
        <input
          type="tel"
          id="contact"
          name="customer_contact"
          value={customerInformation.customerContact}
          disabled
        />

        <label htmlFor="address" style={{ color: "black" }}>
          Home Address:
        </label>
        <input
          type="text"
          id="address"
          name="customer_home_address"
          value={customerInformation.customerAddress}
          disabled
        />

        <form
          action="/upload-profile-picture"
          method="post"
          encType="multipart/form-data"
        >
          <label htmlFor="customer-profile-picture" style={{ color: "black" }}>
            Upload Profile Picture:
          </label>
          <input
            type="file"
            id="profile-picture"
            name="customer_profile_picture"
          />
          <button
            className="btn"
            id="upload-profile-picture-btn"
            style={{ width: 200, height: 50, fontSize: "15px", padding: "5px" }}
          >
            Upload Profile Picture
          </button>
        </form>

        <div className="button-group">
          <button
            className="btn"
            id="edit-profile-btn"
            type="submit"
            style={{ width: 120, height: 40, fontSize: "15px", padding: "5px" }}
            onClick={() => moveToCustomerProfileEditPage()}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;
