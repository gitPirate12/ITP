import React from "react";
import { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerFeedbackForm() {
  const [values, setValues] = useState({
    customerName: "",
    customerEmail: "",
    customerContactNumber: "",
    customerFeedback: "",
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const sendDataToDB = () => {
    Axios.post("http://localhost:5000/api/v1/store-customer-suggestion", {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerFeedback: values.customerFeedback,
      customerContactNumber: values.customerContactNumber,
    })
      .then(() => {
        console.log("Successful feedback Submission");
      })
      .catch(() => {
        console.log("Unsuccessful feedback Submission");
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

    //validate feedback
    if (values.customerFeedback == "") {
      toast.error("Please Enter Your Feedback!!!", {
        position: "top-center",
      });
      return false;
    } //end if

    if (window.confirm("Confirm Feedback Submission")) {
      sendDataToDB();
      toast.success("Successfully submitted Feedback!!!!", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={{ border: "2px black solid" }} className="container mt-5">
      <h1>Customer Feedback Portal</h1>
      <ToastContainer />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name" style={{ color: "black" }}>
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter Name"
            id="customerName"
            onChange={(e) => handleChange(e)}
            value={values.customerName}
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
            id="customerEmail"
            onChange={(e) => handleChange(e)}
            value={values.customerEmail}
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
            id="customerContactNumber"
            onChange={(e) => handleChange(e)}
            value={values.customerContactNumber}
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback" style={{ color: "black" }}>
            Feedback:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Feedback"
            id="customerFeedback"
            onChange={(e) => handleChange(e)}
            value={values.customerFeedback}
            rows="15"
          ></textarea>
        </div>

        <input type="submit" value="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default CustomerFeedbackForm;
