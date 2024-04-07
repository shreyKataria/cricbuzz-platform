require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const errorHandler = require("./middlewares/error");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");

const app = express();

const server = http.createServer(app);

// declaration env variable
const PORT = process.env.PORT || 8000;
const db = process.env.MONGO_URL;

// middlewares
app.use(bodyParser.json());

// routes

app.use("/api", userRoute);

// error handler
app.use(errorHandler);

// db connection
mongoose
  .connect(db, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("connected to db ");
  })
  .catch((err) => console.log(err.message));

// server
server.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
