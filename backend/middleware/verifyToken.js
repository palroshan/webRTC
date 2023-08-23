const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json("Unauthorized access")
    }
    const token = authorization.split(" ")[1]
    console.log(token)
    jwt.verify(token, process.env.jwt_secret, (err, result) => {
        if (!err) {
            req.user = result;
            next();
        } else {
            res.status(403).json(err)
        }
    })   
}

module.exports = verifyToken