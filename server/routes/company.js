const { companySignup, companyLogin, uploadPost, inboxView, acceptForm, rejectFrom, getCompanyProfile, getProfilePost, quotation, getCompany, deletePost, editProfile, postView, addEvent, eventView, singleEventPosts, eventDetails, postUpload, newPostUpload } = require('../controller/companyController')
const multer = require('../helper/multer');
const upload= require('../helper/multer')
const check = require('../middleware/authToken');

const router = require('express').Router()
var type = multer.single('image');

router.post('/signup',companySignup)
router.post('/login',companyLogin)
// router.post('/post-upload',type,uploadPost)
router.post('/post/upload',upload.single('file'),postUpload)
router.post('/newPost/upload',check,newPostUpload)

router.get('/inbox/:id',check,inboxView)
router.put('/accept-form/:id',check,acceptForm)
router.put('/reject-form/:id',check,rejectFrom)
router.get('/profile/:id',check,getCompanyProfile)
router.get('/profile-post/:id/:userId',check,getProfilePost)
router.post('/eventQuotation',check,quotation)
router.get('/postView',check,postView)

router.get('/:id',getCompany)
router.delete('/delete-post/:id',check,deletePost)
// router.post('/edit-profile/:id',multer.single("profilePicture"),editProfile)
router.post('/edit-profile/:id',check,editProfile)

router.post('/addEvent',type,addEvent)
router.get('/view/event',check,eventView)
router.get('/event/singlePost/:id',check,singleEventPosts)
router.get('/event/details/:id',check,eventDetails)


module.exports= router 