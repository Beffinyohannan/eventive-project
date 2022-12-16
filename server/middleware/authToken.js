const jwt = require("jsonwebtoken");

const check =async (req, res, next) => {
    try {
        console.log("Check middleware")
        // console.log(req.body,'jwt got to backend');
        const tokens = req.headers['authorization']
        // const {token} = req.body.jwt
        // console.log(token,'bbbbbbbbbbb');
        console.log(tokens,',,,,,,,,,,,,,,,,,,,,,,,,,,');
        if(!tokens){
            console.log('errrrrrrrrrrrrrrrrrrrr');
             res.status(401).json({error:'Athorization token required'})
        }
        const user = jwt.verify(tokens, process.env.JWT_SECRET)
       if(user){
        req.user=user
        next()
       }else{
        res.send({ verified: false, data: "No Admin" })
       }
    } catch (error) {
        console.log(error.message);
        res.send({ verified: false, data: error.message })
    }

}

module.exports = check;