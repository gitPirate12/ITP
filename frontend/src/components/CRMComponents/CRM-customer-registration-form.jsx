import React, { Component } from "react";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerRegistrationForm() {
  const [values, setValues] = useState({
    customerName: "",
    customerEmail: "",
    customerContactNumber: "",
    customerAddress: "",
    customerCreatedPassword: "",
    customerConfirmedPassword: "",
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const sendDataToDB = () => {
    Axios.post("http://localhost:5000/api/v1/customer-registration-data", {
      customerAddress: values.customerAddress,
      customerConfirmedPassword: values.customerConfirmedPassword,
      customerContactNumber: values.customerContactNumber,
      customerEmail: values.customerEmail,
      customerName: values.customerName,
    })
      .then(() => {
        console.log("Successful Customer Registration");
      })
      .catch(() => {
        console.log("Unsuccessful Customer Registration");
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
  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
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
    if (values.customerName != "") {
      if (values.customerName.length <= 5) {
        toast.error("Name should have more than 5 Characters!!!", {
          position: "top-center",
        });
        return false;
      } //end if
      else if (numberIncludes(values.customerName)) {
        toast.error("Remove Numbers in Name!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
      else if (containsSpecialChars(values.customerName)) {
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

    //email validating
    if (values.customerEmail != "") {
      if (!isEmail(values.customerEmail)) {
        toast.error("Invalid Email!!!", {
          position: "top-center",
        });
        return false;
      } //end else
    } //end if
    else {
      toast.error("Please Enter Your Email!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    //validate created password
    if (values.customerCreatedPassword != "") {
      if (values.customerCreatedPassword.length <= 5) {
        toast.error("Password should have more than 5 Characters!!!", {
          position: "top-center",
        });
        return false;
      } //end if
      else if (!numberIncludes(values.customerCreatedPassword)) {
        toast.error("Include Number in Password!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
      else if (!containsSpecialChars(values.customerCreatedPassword)) {
        toast.error("Include spacial Characters in Password!!!", {
          position: "top-center",
        });
        return false;
      } //end else if
    } //end if
    else {
      toast.error("Please Create a Password!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    //validate confirmed password
    if (values.customerConfirmedPassword != "") {
      if (values.customerCreatedPassword != values.customerConfirmedPassword) {
        toast.error("Recheck Confimed Password!!!", {
          position: "top-center",
        });
        return false;
      } //end if
    } //end if
    else {
      toast.error("Please Confirm the Password!!!", {
        position: "top-center",
      });
      return false;
    } //end else

    //validate address
    if (values.customerAddress != "") {
      if (containsSpecialCharsInAddress(values.customerAddress)) {
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

    if (values.customerContactNumber != "") {
      if (
        values.customerContactNumber.length > 10 ||
        values.customerContactNumber.length < 10
      ) {
        toast.error("Phone Number should have only 10 Digits!!!", {
          position: "top-center",
        });
        return false;
      } //end if
      else if (!validatePhoneNumber(values.customerContactNumber)) {
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

    if (window.confirm("Confirm Registration")) {
      sendDataToDB();
      toast.success("Successfully submitted data!!!!", {
        position: "top-center",
      });
    } //end if
  };

  return (
    <div style={{ border: "2px black solid" }} className="container mt-5">
      <h1>Customer Registration Portal</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name" style={{ color: "black" }}>
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            placeholder="Enter name"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{ color: "black" }}>
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="customerEmail"
            placeholder="Enter email"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: "black" }}>
            Create Password:
          </label>
          <input
            type="text"
            className="form-control"
            id="customerCreatedPassword"
            placeholder="Enter password"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" style={{ color: "black" }}>
            Confirm Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="customerConfirmedPassword"
            placeholder="Confirm password"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ color: "black" }}>
            Residence Address:
          </label>
          <textarea
            className="form-control"
            id="customerAddress"
            placeholder="Enter address"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="phone" style={{ color: "black" }}>
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="customerContactNumber"
            placeholder="Enter phone number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input
          type="submit"
          id="submit-button"
          value="Register"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
}

export default CustomerRegistrationForm;
