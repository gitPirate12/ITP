//import 'mongoose' package
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//'customerInquirySchema'
const customerInquirySchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true, maxLength: 10 },
  inquiryDescription: { type: String, required: true },
  submittedDate: { type: Date, required: true },
  inquiryID: { type: String, required: true },
  inquiryType: { type: String, required: true },
});

module.exports = mongoose.model("Inquiry", customerInquirySchema);
