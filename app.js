const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRouter = require("./api/routes/users");
const registerRouter = require("./api/routes/register");
const loginRouter = require("./api/routes/login");
const Movies = require('./api/routes/movies');

const app = express();

mongoose.connect(
  "mongodb+srv://shaileshy731:test123@cluster0.j4fzb4o.mongodb.net/?retryWrites=true&w=majority",
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
app.use("/movies", Movies);

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
