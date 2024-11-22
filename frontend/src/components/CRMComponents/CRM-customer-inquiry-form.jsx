import React, { Component } from "react";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerInquiryForm() {
  const [values, setValues] = useState({
    customerName: "",
    customerEmail: "",
    customerContactNumber: "",
    inquiryType: "",
    inquiryDescription: "",
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const sendDataToDB = () => {
    Axios.post("http://localhost:5000/api/v1/store-customer-inquiry", {
      inquiryType: values.inquiryType,
      inquiryDescription: values.inquiryDescription,
      customerContactNumber: values.customerContactNumber,
      customerEmail: values.customerEmail,
      customerName: values.customerName,
    })
      .then(() => {
        console.log("Successful Inquiry Submission");
      })
      .catch(() => {
        console.log("Unsuccessful Inquiry Submission");
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

    //validate contact number
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

    //validate inquiry type
    if (values.inquiryType == "") {
      toast.error("Please Enter Your Inquiry Type!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    //validate inquiry
    if (values.inquiryDescription == "") {
      toast.error("Please Enter Your Inquiry!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    if (window.confirm("Confirm Inquiry Submission")) {
      sendDataToDB();
      toast.success("Successfully submitted Inquiry!!!!", {
        position: "top-center",
      });
    } //end if
  };

  return (
    <div style={{ border: "2px black solid" }} className="container mt-5">
      <h1>Customer Inquiry Portal</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name" style={{ color: "black" }}>
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            id="customerName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{ color: "black" }}>
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={(e) => handleChange(e)}
            id="customerEmail"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" style={{ color: "black" }}>
            Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Phone Number"
            onChange={(e) => handleChange(e)}
            id="customerContactNumber"
          />
        </div>

        <label htmlFor="inquiry-type" style={{ color: "black" }}>
          Inquiry Type:
        </label>
        <select
          name="inquiry-type"
          onChange={(e) => handleChange(e)}
          id="inquiryType"
          required
        >
          <option value="Problem with Purchased Goods or Services">
            Problem with Purchased Goods or Services
          </option>
          <option value="Delivery Problem">Delivery Problem</option>
          <option value="Invoicing Problem">Invoicing Problem</option>
          <option value="Other">Other</option>
        </select>

        <div className="form-group">
          <label htmlFor="inquiry" style={{ color: "black" }}>
            Inquiry:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Inquiry"
            onChange={(e) => handleChange(e)}
            id="inquiryDescription"
            rows="15"
          ></textarea>
          <p id="inquiry-status" className="status"></p>
        </div>

        <input
          type="submit"
          id="submit-button"
          value="Submit"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
}

export default CustomerInquiryForm;
