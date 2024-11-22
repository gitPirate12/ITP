const Suggestion = require("../models/CRMcustomerSuggestionModel");
//import uuid
const uuid = require("uuid");

exports.customerSuggestionsController = (request, response, next) => {
  const customerName = request.body.customerName;
  const customerEmail = request.body.customerEmail;
  const customerContact = request.body.customerContactNumber;
  const suggestionDescription = request.body.customerFeedback;
  const date = new Date();
  const id = uuid.v4();

  //create Suggestion object
  const suggestion = new Suggestion({
    customerName: customerName,
    customerEmail: customerEmail,
    customerContact: customerContact,
    suggestionDescription: suggestionDescription,
    submittedDate: date,
    suggestionID: id,
  });

  suggestion
    .save()
    .then((result) => {
      console.log("Suggestion Registered in DB by controller");
      console.log(result);
      response.send("Suggestion Registration successful!!!");
    })
    .catch((error) => {
      console.log(
        "Suggestion Registration in DB unsuccessful by controller!!!"
      );
      console.log(error);
    });
};

exports.generateCustomerSuggestionsReportController = (
  request,
  response,
  next
) => {
  const allCustomerSuggestionsData = Suggestion.find()
    .then((allCustomerSuggestionsData) => {
      console.log(
        "All customers suggestions fetched by controller successfully!!!"
      );
      response.send(allCustomerSuggestionsData);
    })
    .catch((error) => {
      console.log(
        "Fetching all customers suggestions by controller is unsuccessfull!!!"
      );
      console.log(error);
    });
};

exports.getSingleCustomerSuggestionController = (request, response, next) => {
  const suggestionId = request.params.suggestionId;
  const singleSuggestion = Suggestion.findOne({ suggestionID: suggestionId })
    .then((singleSuggestion) => {
      response.send(singleSuggestion);
      console.log(
        "Fetched single customer inquiry by controller successfully!!!"
      );
    })
    .catch((error) => {
      console.log(
        "error occured when fetching single customer suggestion by controller!!!"
      );
      console.log(error);
    });
};

exports.deleteSingleSuggestionController = (request, response, next) => {
  const suggestionId = request.params.suggestionId;
  Suggestion.findOneAndDelete({ suggestionID: suggestionId })
    .then((result) => {
      console.log("Suggestion Deleted Successfully by controller");
      response.send("Suggestion Deleted Successfully!!!");
    })
    .catch((error) => {
      console.log("Error occured when deleting suggestion by controller");
      console.log(error);
    });
};
