const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);

  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });


  

  
  if (!foundUser) {
    return res.sendStatus(403); //Forbidden 
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRETE,
    (err, decoded) => {
      if (err || foundUser.user !== decoded.user) {
        console.log(foundUser.user, decoded.user, "😶😶😶😶😶😶😶😶😶");
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(
        {
          userInfo: {
            user: foundUser.username,
            userId: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRETE,
        { expiresIn: "10m" }
      );

      res.json({ accessToken });
    }
  );
};

module.exports = handleRefreshToken;
