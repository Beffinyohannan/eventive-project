const { login, signup, viewCompanies, viewPosts, likePost, commentPost, uncommentPost, viewComments, follow, getProfile, eventEnquire, inboxView, cancelEnquiry, getUserDetail, getQuotation, approveQutations, rejectQutations, reportPost, sendUserOtp, resendOtp, verifyOtp, userProfileEdit, searchCompany } = require('../controller/userController')
const multer = require('../helper/multer')

const router = require('express').Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/view-companies',viewCompanies)
router.get('/viewPosts/:id',viewPosts)
router.put('/post/like/:id',likePost)

router.put('/post/comment/:id',commentPost)
router.put('/post/uncomment/:id',uncommentPost)
router.get('/post/viewcomments/:id',viewComments)

router.put('/follow/:id',follow)
router.get('/profile/:id',getProfile)

router.post('/eventEnquire',eventEnquire)
router.get('/inbox/:id',inboxView)
router.put('/cancelEnquiry/:id',cancelEnquiry)

router.get('/inbox/quotations/:id',getQuotation)
router.put('/accept-quotation/:id',approveQutations)
router.put('/reject-quotation/:id',rejectQutations)

router.get('/userDetail/:id',getUserDetail)
router.post('/report-post/:id',reportPost)

router.post('/signup/sendOtp',sendUserOtp)
router.post('/signup/otp/resend',resendOtp)
router.post('/singnUp/otp/verify',verifyOtp)

router.post('/edit-profile/:id',multer.single("profilePicture"),userProfileEdit)
router.get('/user/search/:id',searchCompany)

module.exports= router