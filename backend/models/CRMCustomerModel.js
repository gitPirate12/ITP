//import 'mongoose' package
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//'customerInquirySchema'
const customerSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true, maxLength: 10 },
  customerAddress: { type: String, required: true },
  customerPassword: { type: String, required: true },
  membershipStartedDate: { type: Date, required: true },
  imageURL: { type: "String", required: false, default: null },
  userStatus: { type: String, required: true, default: "CUSTOMER" },
});

module.exports = mongoose.model("Customer", customerSchema);
