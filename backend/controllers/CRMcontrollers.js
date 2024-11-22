//import 'Customer' model from 'CRMCustomerModel.js' file
const Customer = require("../models/CRMCustomerModel.js");

//import 'Inquiry' model from 'CRMInquiryModel.js' file
const Inquiry = require("../models/CRMInquiryModel.js");

//import 'Suggestion' model from 'CRMsuggestionModel.js' file
const Suggestion = require("../models/CRMcustomerSuggestionModel.js");

//import uuid
const uuid = require("uuid");

//import 'nodemailer' package
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

//############################################################
exports.CustomerRegistrationController = (request, response, next) => {
  const name = request.body.customerName;
  const email = request.body.customerEmail;
  const contact_number = request.body.customerContactNumber;
  const home_address = request.body.customerAddress;
  const password = request.body.customerConfirmedPassword;
  const date = new Date();

  //create Customer object
  const customer = new Customer(
    name,
    email,
    contact_number,
    home_address,
    password,
    date
  );

  //store registration data inside database collection
  customer.save();

  response.send("Customer Registration Successfull!!!!!");
};

exports.displayCustomerAccountEdiPageController = (request, response, next) => {
  const singleCustomerData = {
    name: request.body.name,
    email: request.body.email,
    contact_number: request.body.contact_number,
    home_address: request.body.home_address,
  };
  console.log(singleCustomerData);
  response.render("CRMcustomer-account-edit-page.ejs", {
    customerData: singleCustomerData,
    documentTitle: request.body.name,
  });
};

exports.customerAccountEditController = (request, response, next) => {
  const email = request.body.customer_email;
  const name = request.body.customer_name;
  const contact_number = request.body.customer_contact;
  const home_address = request.body.customer_home_address;
  const password = request.body.confirmed_password;

  //pass data to Customer Model
  Customer.updateSingleCustomerData(
    email,
    name,
    home_address,
    contact_number,
    password
  );

  //redirect to CRMcustomer-account-page.ejs
  const singleCustomerData = Customer.fetchSingleCustomerData(email)
    .then((singleCustomerData) => {
      response.render("CRMcustomer-account-page.ejs", {
        customerData: singleCustomerData,
        documentTitle: singleCustomerData.name,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.displayCustomerInquiryPageController = (request, response, next) => {
  const singleCustomerData = {
    name: request.body.customer_name,
    email: request.body.customer_email,
    contact_number: request.body.customer_contact,
  };

  //rendering CRMcustomer-inquiry-page.ejs
  response.render("CRMcustomer-inquiry-page.ejs", {
    customerData: singleCustomerData,
    documentTitle: request.body.customer_name,
  });
};

//############################################################
exports.customerInquiryController = (request, response, next) => {
  const name = request.body.customerName;
  const contact = request.body.customerContactNumber;
  const email = request.body.customerEmail;
  const inquiryType = request.body.inquiryType;
  const inquiryDescription = request.body.inquiryDescription;
  const date = new Date();
  const inquiryId = uuid.v4();
  //create Inquiry object
  const inquiry = new Inquiry(
    name,
    email,
    contact,
    inquiryType,
    inquiryDescription,
    date,
    inquiryId
  );

  inquiry.save();
  response.send("Customer Inquiry Submission Successfull!!!!");
};

exports.displayCustomerSuggestionPageController = (request, response, next) => {
  const displayingData = {
    customer_name: request.body.customer_name,
    customer_email: request.body.customer_email,
    customer_contact: request.body.customer_contact,
  };

  //rendering CRMcustomer-suggestion-page.ejs
  response.render("CRMcustomer-suggestion-page.ejs", {
    customerData: displayingData,
    documentTitle: request.body.customer_name,
  });
};

//################################################################
exports.customerSuggestionsController = (request, response, next) => {
  const customerName = request.body.customerName;
  const customerEmail = request.body.customerEmail;
  const customerContact = request.body.customerContactNumber;
  const suggestionDescription = request.body.customerFeedback;
  const date = new Date();
  const id = uuid.v4();

  //create Suggestion object
  const suggestion = new Suggestion(
    customerName,
    customerEmail,
    customerContact,
    suggestionDescription,
    date,
    id
  );

  suggestion.save();

  response.send("Customer Feedback Submission Successfull!!!!");
};

exports.displayCrmEmailPortalPageController = (request, response, next) => {
  const customer_email = request.params.customer_email;
  response.render("CRMemail-portal.ejs", { recepient_email: customer_email });
};

//###########################################################
exports.crmEmailController = (request, response, next) => {
  const email_to = request.body.recipientEmail;
  const email_subject = request.body.subject;
  const email_message = request.body.message;

  transporter
    .sendMail({
      to: email_to,
      from: "sapretailmanagementsystem@gmail.com",
      subject: email_subject,
      text: email_message,
      secure: true,
    })
    .then((result) => {
      console.log("Email Send Successfully!!!!!!");
      console.log(result);
      response.send("Email Send Successfully!!!");
    })
    .catch((error) => {
      console.log("Error occured when sending email!!!");
      console.log(error);
    });
};

exports.customerProfilePictureUploadingController = (
  request,
  response,
  next
) => {
  const customer_profile_picture = request.file;
  const email = request.body.email;
  let imageURL = null;
  if (customer_profile_picture) {
    console.log("customer_profile_picture is available!!!");
    let tempImageURL = new String(customer_profile_picture.path);
    imageURL = "/" + tempImageURL.replace("\\", "/");
  } //end if
  else {
    imageURL = "/Customer_Profile_Pictures/default_profile_picture.png";
  } //end else

  console.log("Image URL: " + imageURL);
  Customer.uploadCustomerProfilePicture(email, imageURL);

  //redirect to  CRMcustomer-account-page.ejs
  const singleCustomerData = Customer.fetchSingleCustomerData(email).then(
    (singleCustomerData) => {
      response.render("CRMcustomer-account-page.ejs", {
        customerData: singleCustomerData,
        documentTitle: singleCustomerData.name,
      });
    }
  );
};

//####################################################
exports.generateCustomerInformationReportController = (
  request,
  response,
  next
) => {
  const allCustomerData = Customer.getAllCustomersData()
    .then((allCustomerData) => {
      console.log("All customers Data passed to controller successfully!!!");
      response.send(allCustomerData);
    })
    .catch((error) => {
      console.log(
        "All customers Data passed to controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

//#################################################################
exports.customerDeletionController = (request, response, next) => {
  const customer_email = request.params.customer_email;
  console.log("Recived Customer Email as Parameter: " + customer_email);

  Customer.deleteCustomer(customer_email);

  response.send("User Deleted Successfully!!!");
};

//####################################################################
exports.generateCustomerInquiryReportController = (request, response, next) => {
  const allCustomerInquiriesData = Inquiry.getAllCustomersInquiries()
    .then((allCustomerInquiriesData) => {
      console.log(
        "All customers inquiries passed to controller successfully!!!"
      );
      response.send(allCustomerInquiriesData);
    })
    .catch((error) => {
      console.log(
        "All customers Inquiries passed to controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

//###################################################################
exports.getSingleCustomerInquiryController = (request, response, next) => {
  const inquiryID = request.params.inquiryID;
  console.log("Inquiry ID: " + inquiryID);
  const singleInquiry = Inquiry.getSingleInquiry(inquiryID)
    .then((singleInquiry) => {
      response.send(singleInquiry);
    })
    .catch((error) => {
      console.log("Error occured while fetching single customer inquiry");
    });
};

//###################################################################
exports.deleteSingleInquiryController = (request, response, next) => {
  const inquiryID = request.params.inquiryID;
  console.log("Inquiry ID: " + inquiryID);

  Inquiry.deleteSingleInquiry(inquiryID);

  response.send("Inquiry Deleted Successfully");
};

//################################################################
exports.generateCustomerSuggestionsReportController = (
  request,
  response,
  next
) => {
  const allCustomerSuggestionsData = Suggestion.getAllCustomersSuggestions()
    .then((allCustomerSuggestionsData) => {
      console.log(
        "All customers suggestions passed to controller successfully!!!"
      );
      response.send(allCustomerSuggestionsData);
    })
    .catch((error) => {
      console.log(
        "All customers suggestions passed to controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

//####################################################################################
exports.getSingleCustomerSuggestionController = (request, response, next) => {
  const suggestionId = request.params.suggestionId;
  const singleSuggestion = Suggestion.getSingleSuggestion(suggestionId)
    .then((singleSuggestion) => {
      response.send(singleSuggestion);
      console.log("send single customer inquiry to frontend successfully!!!!");
    })
    .catch((error) => {
      console.log(
        "error occured when send single customer suggestion to frontend"
      );
      console.log(error);
    });
};

//##########################################################
exports.deleteSingleSuggestionController = (request, response, next) => {
  const suggestionId = request.params.suggestionId;
  Suggestion.deleteSingleSuggestion(suggestionId);
  response.send("suggestion deleted successfully!!!!!");
};
