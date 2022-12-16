const { addMessage, getMessages } = require('../controller/messageController')

const router = require('express').Router()

router.post('/',addMessage)
router.get('/:chatId',getMessages)

module.exports = router