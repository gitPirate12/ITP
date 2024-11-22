import React, { Component } from "react";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CRMstyles/customer-registration-form.css";

function CRMEmailPortal() {
  const [values, setValues] = useState({
    subject: "",
    recipientEmail: "",
    message: "",
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const sendDataToDB = () => {
    Axios.post("http://localhost:5000/api/v1/crm-email", {
      recipientEmail: values.recipientEmail,
      subject: values.subject,
      message: values.message,
    })
      .then(() => {
        console.log("Successful email Submission");
      })
      .catch(() => {
        console.log("Unsuccessful email Submission");
      });
  };

  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //email validating
    if (values.recipientEmail != "") {
      if (!isEmail(values.recipientEmail)) {
        toast.error(
          "Invalid Email!!!",
          {
            position: "top-center",
          },
          {
            position: "top-center",
          }
        );
        return false;
      } //end else
    } //end if
    else {
      toast.error("Please Enter Recipient's Email!!!", {
        position: "top-center",
      });
      return false;
    } //end else
    //validate subject
    if (values.subject == "") {
      toast.error("Please Enter the Subject!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    //validate message
    if (values.message == "") {
      toast.error("Please Enter the Message!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    if (window.confirm("Confirm Email Sending")) {
      sendDataToDB();
      toast.success("Successfully sent Email!!!!", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={{ border: "2px black solid" }} className="container mt-5">
      <h1>SAP Email Portal</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="to" style={{ color: "black" }}>
            To:
          </label>
          <input
            id="recipientEmail"
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Recipient Email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject" style={{ color: "black" }}>
            Subject:
          </label>
          <input
            type="text"
            placeholder="Enter Subject"
            className="form-control"
            autoComplete="off"
            id="subject"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" style={{ color: "black" }}>
            Message:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Feedback"
            id="message"
            rows="15"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>

        <input type="submit" className="btn btn-primary" value="Send" />
      </form>
    </div>
  );
}

export default CRMEmailPortal;
