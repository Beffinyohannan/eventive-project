// const jwt = require("jsonwebtoken");

// const check =async (req, res, next) => {
//     try {
//         console.log("Check middleware")
//         // console.log(req.body,'jwt got to backend');
//         const tokens = req.headers.accesstoken
//         // const {token} = req.body.jwt
//         // console.log(token,'bbbbbbbbbbb');
//         console.log(tokens,',,,,,,,,,,,,,,,,,,,,,,,,,,');
//         if(!tokens){
//             console.log('errrrrrrrrrrrrrrrrrrrr');
//              res.status(401).json({error:'Athorization token required'})
//         }
//         const user = jwt.verify(tokens, process.env.JWT_SECRET)
//        if(user){
//         req.user=user
//         next()
//        }else{
//         res.send({ verified: false, data: "No Admin" })
//        }
//     } catch (error) {
//         console.log(error.message,'bnm,.');
//         res.send({ verified: false, data: error.message })
//     }

// }

// module.exports = check;

const jwt = require('jsonwebtoken')

const  check = (req,res,next)=>{
    console.log('in verify');
    const token = req.headers.accesstoken;
    console.log(token,'its token');
    if(!token){
        res.status(403).json("Account verification failed")
    }else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                console.log(err);
                res.status(403).json({auth:false, message:"Authentication Failed!"})
            }else{
                req.userId = decoded.id;
                console.log('verify ok');
                next()
            }
        })
    }
} 

module.exports = check