import React, { Component, useState, useEffect } from "react";
import "../../styles/CRMstyles/customer-registration-form.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CRMCustomerSignInForm() {
  const [values, setValues] = useState({
    loginPassword: "",
    loginEmail: "",
  });

  const handleChange = (event) => {
    const newData = { ...values };
    newData[event.target.id] = event.target.value;
    setValues(newData);
  };

  const navigate = useNavigate();
  const navigateToReleventPage = (userStatus) => {
    if (userStatus.valid === "CUSTOMER") {
      navigate("/customer-account", {
        state: {
          userEmail: values.loginEmail,
          userPassword: values.loginPassword,
        },
      });
    } //end if
    else {
      toast.error("No User Found!!!\n Check Your Login Credentials");
    } //end else
  };

  const compareLoginCredentialsWithDatabase = () => {
    Axios.get(
      `http://localhost:5000/api/v1/validate-login-user-status/${values.loginEmail}/${values.loginPassword}`
    )
      .then((result) => {
        console.log("successful login credential comparing!!!");
        navigateToReleventPage(result.data);
      })
      .catch((error) => {
        console.log("Unsuccessful login credential comparing!!!");
        console.log(error);
      });
  };

  useEffect(() => {
    compareLoginCredentialsWithDatabase();
  }, []);

  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
  const validateSignInCredentials = (e) => {
    e.preventDefault();

    //email validating
    if (values.loginEmail != "") {
      if (!isEmail(values.loginEmail)) {
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

    //password validating
    if (values.loginPassword == "") {
      toast.error("Please Enter the Password!!!", {
        position: "top-center",
      });
      return false;
    }

    compareLoginCredentialsWithDatabase();
  };

  return (
    <div>
      <div class="container">
        <h2 style={{ color: "black" }}>Sign In</h2>
        <form onSubmit={(e) => validateSignInCredentials(e)}>
          <ToastContainer />
          <div class="form-group">
            <label for="email" style={{ color: "black" }}>
              Email address:
            </label>
            <input
              type="email"
              class="form-control"
              id="loginEmail"
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group">
            <label for="pwd" style={{ color: "black" }}>
              Password:
            </label>
            <input
              type="password"
              class="form-control"
              id="loginPassword"
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input type="submit" value="Submit" class="btn btn-default" />
        </form>
      </div>
    </div>
  );
}

export default CRMCustomerSignInForm;
