const Customer = require("../models/CRMCustomerModel");

exports.CustomerRegistrationController = (request, response, next) => {
  const name = request.body.customerName;
  const email = request.body.customerEmail;
  const contact_number = request.body.customerContactNumber;
  const home_address = request.body.customerAddress;
  const password = request.body.customerConfirmedPassword;
  const date = new Date();

  //create Customer object
  const customer = new Customer({
    customerName: name,
    customerEmail: email,
    customerContact: contact_number,
    customerAddress: home_address,
    customerPassword: password,
    membershipStartedDate: date,
  });

  //store registration data inside database collection
  customer
    .save()
    .then((result) => {
      console.log("Customer Registered in DB by controller");
      console.log(result);
      response.send("Customer Registration successful!!!");
    })
    .catch((error) => {
      console.log("Customer Registration in DB unsuccessful by controller!!!");
      console.log(error);
    });
};

exports.generateCustomerInformationReportController = (
  request,
  response,
  next
) => {
  const allCustomerData = Customer.find()
    .then((allCustomerData) => {
      console.log("Fetch all customers Data by controller successfully!!!");
      response.send(allCustomerData);
    })
    .catch((error) => {
      console.log(
        "Fetching all customers Data by controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

exports.customerDeletionController = (request, response, next) => {
  const customer_email = request.params.customer_email;
  console.log("Recived Customer Email as Parameter: " + customer_email);

  Customer.findOneAndDelete({ customerEmail: customer_email })
    .then((result) => {
      console.log("Customer Deleted Successfully by controller");
      response.send("User Deleted Successfully!!!");
    })
    .catch((error) => {
      console.log("Error occured when deleting customer by controller");
      console.log(error);
    });
};

exports.validateCustomerController = (request, response, next) => {
  console.log("Login Email recieved: " + request.params.customerEmail);
  console.log("Login Password received: " + request.params.customerPassword);

  email = request.params.customerEmail;
  pwd = request.params.customerPassword;

  const customer = Customer.findOne({
    customerEmail: email,
    customerPassword: pwd,
  })
    .then((customer) => {
      console.log("Successfully compared user status by controller!!!");
      console.log("User Status: " + customer.userStatus);
      console.log(customer);

      if (customer.userStatus === "CUSTOMER") {
        response.send({ valid: "CUSTOMER" });
      } //end if
      else {
        response.send({ valid: false });
      } //end else
    })
    .catch((error) => {
      console.log("Comparing user status by controller is unsuccessful!!!");
      console.log(error);
      response.send({ valid: false });
    });
};

exports.loadCustomerAccountController = (request, response, next) => {
  console.log("Customer Email recieved: " + request.params.customerEmail);
  console.log("Customer Password received: " + request.params.customerPassword);

  email = request.params.customerEmail;
  pwd = request.params.customerPassword;

  const customer = Customer.findOne({
    customerEmail: email,
    customerPassword: pwd,
  })
    .then((customer) => {
      console.log("Successfully  get customer information by controller!!!");
      console.log(customer);

      response.send(customer);
    })
    .catch((error) => {
      console.log(
        "Getting customer information by controller is unsuccessful!!!"
      );
      console.log(error);
      response.send("Unsuccessful Loading Data");
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

exports.customerAccountEditController = (request, response, next) => {
  const rcustomerEmail = request.body.customerEmail;
  const rcustomerName = request.body.customerName;
  const rcustomerContact = request.body.customerContact;
  const rcustomerAddress = request.body.customerAddress;
  const rcustomerPassword = request.body.customerPassword;

  //pass data to Customer Model
  Customer.findOneAndUpdate(
    { customerEmail: rcustomerEmail, customerPassword: rcustomerPassword },
    {
      customerName: rcustomerName,
      customerAddress: rcustomerAddress,
      customerContact: rcustomerContact,
    }
  )
    .then((result) => {
      console.log("Customer Information Updated Successfully!!!");
      console.log(result);
    })
    .catch((error) => {
      console.log("Updating customer Information is unsuccessfull!!!");
    });
};
