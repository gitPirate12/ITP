const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
//additional package installations
//=>multer
//=>nodemailer and sendgrid
//=>uuid

//express app
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//import routes
//const CRMroutes = require("./routes/CRMroutes.js");

//app.use(CRMroutes);

//routes
//this function will read all the files in the route folder, map them,  and add the /api/v1 to it
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  //connect to db
  db();
  //listen to requests
  app.listen(process.env.PORT, () => {
    console.log("listening to port: ", PORT);
  });
};

server();
