const { createChat, userChats, findChat } = require('../controller/chatController')

const router = require('express').Router()


router.post('/',createChat)
router.get('/:userId',userChats)
router.get('/find/:firstId/:secondId',findChat)

module.exports= router 