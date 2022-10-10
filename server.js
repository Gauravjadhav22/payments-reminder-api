require("dotenv").config();
require('express-async-errors');
const connectDb = require("./db/connect");
//packages
const cors = require("cors");
const cookieParser = require('cookie-parser')
//express
const express = require("express");
const app = express();
const path = require('path')
//routers
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const refreshTokenRouter = require("./routes/refresh");
const paymentsRouter = require("./routes/api/paymentRoutes");
const logoutRouter = require("./routes/logout");

//middleware
const notFound = require("./middleware/not-found");
const verifyJwt= require("./middleware/verifyJWT")
const errorHandlerMiddleware = require("./middleware/error-handler");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser())



app.use("/api/auth", registerRouter);
app.use("/api/auth", loginRouter);
app.use("/api/auth", refreshTokenRouter);
app.use("/api/auth", logoutRouter);

app.use(verifyJwt)
app.use("/api/payments", paymentsRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI).then(() =>
      console.log("connected to db")
    );
    app.listen(port, console.log(`server is listenning on ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
