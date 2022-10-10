const User = require("../models/user");

const handleLogout = async (req, res) => {
  //on Client also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  // is refreshtokn in db?
  const foundUser = await User.findOne({ refreshToken }).exec()
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //delete refreshtoken in db

  foundUser.refreshToken = '';
  const result = await foundUser.save()
  // const result = await User.findOneAndUpdate({ username: foundUser.username }, { refreshToken: '' })
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  return res.sendStatus(204);
};

module.exports = handleLogout;
