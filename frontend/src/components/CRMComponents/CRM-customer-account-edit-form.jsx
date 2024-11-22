import React, { Component } from "react";
import "../../styles/CRMstyles/customer-registration-form.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Veynitha change

function CustomerAccountEditForm() {
  const location = useLocation();
  const receivedCustomerName = location.state.customerName;
  const receivedCustomerEmail = location.state.customerEmail;
  const receivedCustomerAddress = location.state.customerAddress;
  const receivedCustomerPassword = location.state.customerPassword;
  const receivedCustomerContact = location.state.customerContact;

  //useState
  const [customerContactNumber, setCustomerContactNumber] = useState(
    receivedCustomerContact
  );
  const [customerAddress, setCustomerAddress] = useState(
    receivedCustomerAddress
  );
  const [customerName, setCustomerName] = useState(receivedCustomerName);
  const [confirmedCustomerPassword, setConfirmedCustomerPassword] =
    useState("");

  const sendDataToDB = () => {
    Axios.post("http://localhost:5000/api/v1/edit-customer-account", {
      customerName: customerName,
      customerEmail: receivedCustomerEmail,
      customerContact: customerContactNumber,
      customerAddress: customerAddress,
      customerPassword: receivedCustomerPassword,
    })
      .then(() => {
        toast.success("Customer Account Updated Successfully!!!");
      })
      .catch(() => {
        toast.error("Customer Account Updating Unsuccessful!!!");
      });
  };

  //validations and submission
  const numberIncludes = (text) => {
    return /\d/.test(text);
  };
  const containsSpecialChars = (text) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(text);
  };

  const containsSpecialCharsInAddress = (text) => {
    const specialChars = /[`!@#$%^&*()_+={};':"|<>?~]/;
    //const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(text);
  };
  function validatePhoneNumber(phoneNumber) {
    var regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //name validating
    if (customerName != "") {
      if (customerName.length <= 5) {
        toast.error("Name should have more than 5 Characters!!!", {
          position: "top-center",
        });
        return false;
      } //end if
      else if (numberIncludes(customerName)) {
        toast.error("Remove Numbers in Name!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
      else if (containsSpecialChars(customerName)) {
        toast.error("Remove spacial Characters in Name!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
    } //end if
    else {
      toast.error("Please Enter Your Name!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    //validate address
    if (customerAddress != "") {
      if (containsSpecialCharsInAddress(customerAddress)) {
        toast.error("Remove Invalid Spacial Characters in Address!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
    } //end if
    else {
      toast.error("Please Enter Your Address!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    if (customerContactNumber != "") {
      if (
        customerContactNumber.length > 10 ||
        customerContactNumber.length < 10
      ) {
        toast.error("Phone Number should have only 10 Digits!!!", {
          position: "top-center",
        });
        return false;
      } //end if
      else if (!validatePhoneNumber(customerContactNumber)) {
        toast.error("Include Numbers only!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
    } //end if
    else {
      toast.error("Please Enter Your Phone Number!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    //validate confirmed password
    if (confirmedCustomerPassword == "") {
      toast.error("Please Confirm the Password!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    if (confirmedCustomerPassword != receivedCustomerPassword) {
      toast.error("Please Check Your Confirmed Password Again!!!", {
        position: "top-center",
      });
      return false;
    }

    if (window.confirm("Confirm Updating")) {
      sendDataToDB();
      toast.success("Customer Account Updated Successfully!!!");
    } //end if
  };

  return (
    <div>
      <div class="container mt-5">
        <h1>Customer Account Edit Page</h1>
        <ToastContainer />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="customerEmail"
              class="form-control"
              value={receivedCustomerEmail}
              disabled
            />
          </div>

          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              class="form-control"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              autocomplete="off"
            />
          </div>

          <div class="form-group">
            <label for="address">Residence Address:</label>
            <input
              class="form-control"
              id="customerAddress"
              value={customerAddress}
              onChange={(event) => setCustomerAddress(event.target.value)}
              autocomplete="off"
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input
              type="tel"
              class="form-control"
              id="customerContact"
              value={customerContactNumber}
              onChange={(event) => setCustomerContactNumber(event.target.value)}
              autocomplete="off"
            />
          </div>

          <div class="form-group">
            <label for="phone">Confirm Password:</label>
            <input
              type="password"
              class="form-control"
              id="customerPassword"
              onChange={(event) =>
                setConfirmedCustomerPassword(event.target.value)
              }
              autocomplete="off"
            />
          </div>

          <button type="submit" id="submit-button" class="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerAccountEditForm;
