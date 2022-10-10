const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Login = async (req, res) => {
  const { username, passwd } = req.body;

  if (!username || !passwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    // throw Error ("unauthorized")

    return res.sendStatus(401); //Unauthorized
  }

  const match = await bcrypt.compare(passwd,foundUser.passwd);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          userId: foundUser._id
        },
      },
      process.env.ACCESS_TOKEN_SECRETE,
      {
        expiresIn: "10m",
      }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,

      },
      process.env.REFRESH_TOKEN_SECRETE,
      { expiresIn: "1hr" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    //Creates Secure Cookie with refresh token
    //Can be Changes to production

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,//must be true for production https
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
 


    res.status(StatusCodes.OK).json({ username: foundUser.username, accessToken: accessToken, gmail: foundUser.gmail });
  
  
  
  } else {

    return res.sendStatus(401);
  }
};

module.exports = Login;
