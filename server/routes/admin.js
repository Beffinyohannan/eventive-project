const { AdminLogin, users, blockUser, unblockUser, Companies, blockCompany, unblockCompany, posts, blockPost, unblockPost, postGraphInfo } = require('../controller/adminController')
const check = require('../middleware/authToken')

const router = require('express').Router()

router.post('/login',AdminLogin)
router.get('/users',users)
router.post('/block-user/:id',blockUser)
router.post('/unblock-user/:id',unblockUser)

router.get('/companies',Companies)
router.post('/block-company/:id',blockCompany)
router.post('/unblock-company/:id',unblockCompany)

router.get('/posts',posts)
router.post('/block-post/:id',blockPost)
router.post('/unblock-post/:id',unblockPost)

router.get('/postGraphInfo',postGraphInfo)

router.post('/verify',check,(req,res)=>{
    console.log('helooooooooooooo');
    res.json({verified:true})
})

module.exports= router