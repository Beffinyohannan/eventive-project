const { AdminLogin, users, blockUser, unblockUser, Companies, blockCompany, unblockCompany, posts, blockPost, unblockPost, postGraphInfo } = require('../controller/adminController')
const check = require('../middleware/authToken')

const router = require('express').Router()

router.post('/login',AdminLogin)
router.get('/users',check,users)
router.post('/block-user/:id',check,blockUser)
router.post('/unblock-user/:id',check,unblockUser)

router.get('/companies',check,Companies)
router.post('/block-company/:id',check,blockCompany)
router.post('/unblock-company/:id',check,unblockCompany)

router.get('/posts',check,posts)
router.post('/block-post/:id',check,blockPost)
router.post('/unblock-post/:id',check,unblockPost)

router.get('/postGraphInfo',check,postGraphInfo)

// router.post('/verify',check,(req,res)=>{
//     console.log('helooooooooooooo');
//     res.json({verified:true})
// })

module.exports= router