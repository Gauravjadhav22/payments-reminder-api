const { StatusCodes } =require ("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if(err.message==="unauthorized"){
  console.log(":fjdsfjklsa");
  customError.msg=`the user is unAuthorized${err}`
  res.status(401);
  }


  if (err.name === "ValidationError") {
    customError.msg = `Object.values(err.errors)
      .map((item) => item.message)
      .join(",");`
    customError.statusCode = 400;
  }

  //object.values returns the array of all values of properties in a object
  //object.key returns the array of all properties of a object

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.values}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports= errorHandlerMiddleware;
