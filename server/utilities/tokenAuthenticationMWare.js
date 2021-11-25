const jwt = require("jsonwebtoken")

const tokenAuthenticationMWare = (req, res, next) => {
    const header = req.headers["authorization"]
    const token = header && header.split(" ")[1]

    if(token == null){
        return res.status(401).json({
            status: false,
            message: "No access. You don't provide a token"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err){
            return res.status(403).json({
                status: false,
                message: "No access. Your token is invalid"
            })
        }

        req.user = {username: user.username, _id: user._id}
        next()
    })

}

module.exports = tokenAuthenticationMWare