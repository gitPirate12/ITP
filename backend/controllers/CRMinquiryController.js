const Inquiry = require("../models/CRMInquiryModel");
//import uuid
const uuid = require("uuid");

exports.customerInquiryController = (request, response, next) => {
  const name = request.body.customerName;
  const contact = request.body.customerContactNumber;
  const email = request.body.customerEmail;
  const inquiryType = request.body.inquiryType;
  const inquiryDescription = request.body.inquiryDescription;
  const date = new Date();
  const inquiryId = uuid.v4();
  //create Inquiry object
  const inquiry = new Inquiry({
    customerName: name,
    customerEmail: email,
    customerContact: contact,
    inquiryType: inquiryType,
    inquiryDescription: inquiryDescription,
    submittedDate: date,
    inquiryID: inquiryId,
  });

  inquiry
    .save()
    .then((result) => {
      console.log("Inquiry Registered in DB by controller");
      console.log(result);
      response.send("Inquiry Registration successful!!!");
    })
    .catch((error) => {
      console.log("Inquiry Registration in DB unsuccessful by controller!!!");
      console.log(error);
    });
};

exports.generateCustomerInquiryReportController = (request, response, next) => {
  const allCustomerInquiriesData = Inquiry.find()
    .then((allCustomerInquiriesData) => {
      console.log(
        "All customers inquiries fetched by controller successfully!!!"
      );
      response.send(allCustomerInquiriesData);
    })
    .catch((error) => {
      console.log(
        "Fetching all customers Inquiries by controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

exports.getSingleCustomerInquiryController = (request, response, next) => {
  const inquiryId = request.params.inquiryID;
  console.log("Inquiry ID: " + inquiryId);
  const singleInquiry = Inquiry.findOne({ inquiryID: inquiryId })
    .then((singleInquiry) => {
      console.log("Single Inquiry Fetched by Controller successfully!!!");
      response.send(singleInquiry);
    })
    .catch((error) => {
      console.log("Error occured while fetching single customer inquiry");
      console.log(error);
    });
};

exports.deleteSingleInquiryController = (request, response, next) => {
  const inquiryId = request.params.inquiryID;
  console.log("Inquiry ID: " + inquiryId);

  Inquiry.findOneAndDelete({ inquiryID: inquiryId })
    .then((result) => {
      console.log("Inquiry Deleted Successfully by controller");
      response.send("Inquiry Deleted Successfully!!!");
    })
    .catch((error) => {
      console.log("Error occured when deleting inquiry by controller");
      console.log(error);
    });
};
