//import 'express' package
const express = require("express");
//get 'Router' object
const router = express.Router();

//import controllers
const customerControllers = require("../controllers/CRMcustomerController.js");
const inquiryControllers = require("../controllers/CRMinquiryController.js");
const suggestionControllers = require("../controllers/CRMsuggestionController.js");
const emailControllers = require("../controllers/CRMemailController.js");
const controllers = require("../controllers/CRMcontrollers.js");

//##############################
//middleware for receive data coming from-> CRMcustomer-registration-page.ejs
router.post(
  "/customer-registration-data",
  customerControllers.CustomerRegistrationController
);

//####################################
//middleware for check customer user status
router.get(
  "/validate-login-user-status/:customerEmail/:customerPassword",
  customerControllers.validateCustomerController
);

//####################################
//middleware for load customer-account
router.get(
  "/load-customer-account/:customerEmail/:customerPassword",
  customerControllers.loadCustomerAccountController
);

//################################################
//middleware for recieve data coming from-> CRMcustomer-account-edit-page.ejs
router.post(
  "/edit-customer-account",
  customerControllers.customerAccountEditController
);

//##############################################
//middleware for receive data coming from->CRMcustomer-inquiry-page.ejs
router.post(
  "/store-customer-inquiry",
  inquiryControllers.customerInquiryController
);

//#################################################
//middleware for recieve data coming from ->CRMcustomer-suggestion-page.ejs
router.post(
  "/store-customer-suggestion",
  suggestionControllers.customerSuggestionsController
);

//#####################################################
//middleware for recieve data coming from-> CRMemail-portal.ejs
router.post("/crm-email", emailControllers.crmEmailController);

//middleware for receive user-profile-picture coming from-> CRMcustomer-account-page.ejs
router.post(
  "/upload-profile-picture",
  controllers.customerProfilePictureUploadingController
);

//#############################################################
//middleware for display->CRMcustomer-information-report-page.ejs
router.get(
  "/generate-customer-information-report",
  customerControllers.generateCustomerInformationReportController
);

//##############################################################
//middleware for receive customer email coming from-> CRMcustomer-information-report-page.ejs(delete customer)
router.post(
  "/delete-customer/:customer_email",
  customerControllers.customerDeletionController
);

//#############################################################
//middleware for display->CRMcustomer-inquiry-report-page.ejs
router.get(
  "/generate-customer-inquiry-report",
  inquiryControllers.generateCustomerInquiryReportController
);

//############################################################
router.get(
  "/single-customer-inquiry/:inquiryID",
  inquiryControllers.getSingleCustomerInquiryController
);

//############################################################
router.post(
  "/delete-single-inquiry/:inquiryID",
  inquiryControllers.deleteSingleInquiryController
);

//##############################################################
//middleware for display->CRMcustomer-suggestion-report.ejs
router.get(
  "/generate-customer-suggestions-report",
  suggestionControllers.generateCustomerSuggestionsReportController
);

//##################################################################
router.get(
  "/single-customer-suggestion/:suggestionId",
  suggestionControllers.getSingleCustomerSuggestionController
);

//############################################################
router.post(
  "/delete-single-suggestion/:suggestionId",
  suggestionControllers.deleteSingleSuggestionController
);

//export router
module.exports = router;
