const { login, signup, viewCompanies, viewPosts, likePost, commentPost, uncommentPost, viewComments, follow, getProfile, eventEnquire, inboxView, cancelEnquiry, getUserDetail, getQuotation, approveQutations, rejectQutations, reportPost, sendUserOtp, resendOtp, verifyOtp, userProfileEdit, searchCompany } = require('../controller/userController')
const multer = require('../helper/multer')
const check = require('../middleware/authToken')

const router = require('express').Router()

router.post('/signup',signup)
router.post('/login',login)

router.post('/signup/sendOtp',sendUserOtp)
router.post('/signup/otp/resend',resendOtp)
router.post('/singnUp/otp/verify',verifyOtp)

router.get('/view-companies',check,viewCompanies)
router.get('/viewPosts/:id',check,viewPosts)
router.put('/post/like/:id',check,likePost)

router.put('/post/comment/:id',check,commentPost)
router.put('/post/uncomment/:id',uncommentPost)
router.get('/post/viewcomments/:id',check,viewComments)

router.put('/follow/:id',check,follow)
router.get('/profile/:id',check,getProfile)

router.post('/eventEnquire',check,eventEnquire)
router.get('/inbox/:id',check,inboxView)
router.put('/cancelEnquiry/:id',check,cancelEnquiry)

router.get('/inbox/quotations/:id',check,getQuotation)
router.put('/accept-quotation/:id',check,approveQutations)
router.put('/reject-quotation/:id',check,rejectQutations)

router.get('/userDetail/:id',getUserDetail)
router.post('/report-post/:id',reportPost)



// router.post('/edit-profile/:id',multer.single("profilePicture"),userProfileEdit)
router.post('/edit-profile/:id',check,userProfileEdit)
router.get('/user/search/:id',check,searchCompany)

module.exports= router