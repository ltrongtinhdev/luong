const express = require('express');
const router = express.Router();

const {
    update,
    tuoitreRSS,
    vnexpressRSS,
    h24RSS,showNews,
    insertSeen,
    vnexpressRSSOld
} = require('../controllers/linkController');
router.get('/', async(req, res, next) => {
    res.status(200).json({
        code: 1,
        message: 'No commit'
    })
});
router.post('/update',update)
router.get('/tt',tuoitreRSS)
router.get('/vne',vnexpressRSS)
router.get('/h24',h24RSS)
router.post('/news-old',showNews)
router.post('/news-insert',insertSeen)
router.post('/old-vne',vnexpressRSSOld)
module.exports = router;
