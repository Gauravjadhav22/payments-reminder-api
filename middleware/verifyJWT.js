const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization


  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]




  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = decoded.UserInfo
    console.log("ready to go ");
    next()
  })


}

module.exports = verifyJWT