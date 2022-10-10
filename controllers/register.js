const User = require("../models/user");     
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const Register = async (req, res) => {
  const { username, passwd,gmail} = req.body;

  const duplicate = await User.findOne({ username });

  if (duplicate) {
    return res.sendStatus(409); //Conflict 

  }

  if (!username || !passwd || !gmail) {
    return res.status(400).json({ 'message': 'Username Email and Password are required.' });
  }

  try {
    const hashedPwd = await bcrypt.hash(passwd, 10)
   await User.create({ ...req.body, passwd: hashedPwd });
    res.sendStatus(StatusCodes.OK);
  } catch (error) {

    res.status(500).json({ 'msg': error.message })
  }


};

module.exports = Register;
