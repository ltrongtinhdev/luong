const express = require('express');
const router = express.Router();

const {login,register} = require('../controllers/userController');
router.get('/', async(req, res, next) => {
    res.status(200).json({
        code: 1
    })
});
router.post('/login',login)
router.post('/register',register)
module.exports = router;
