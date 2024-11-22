//import 'mongoose' package
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//'customerSuggestionSchema'
const customerSuggestionSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true, maxLength: 10 },
  suggestionDescription: { type: String, required: true },
  submittedDate: { type: Date, required: true },
  suggestionID: { type: String, required: true },
});

module.exports = mongoose.model("Suggestion", customerSuggestionSchema);
