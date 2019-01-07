const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRouter = require("./api/routes/users");
const registerRouter = require("./api/routes/register");
const loginRouter = require("./api/routes/login");
const app = express();

mongoose.connect(
  "mongodb://devops:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@cluster0-shard-00-00-lfyxo.mongodb.net:27017,cluster0-shard-00-01-lfyxo.mongodb.net:27017,cluster0-shard-00-02-lfyxo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  {
    useNewUrlParser: true
  }
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if (request.method == "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS"
    );
    return response.status(200).json({});
  }

  next();
});

app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use((request, response, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.error = error.status || 500;
  response.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
