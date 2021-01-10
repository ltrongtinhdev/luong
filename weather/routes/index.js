const express = require('express');
const fs = require('fs')
const path = require('path');
const router = express.Router();
const {pool} = require('../helpers/db')
const logger = require('../helpers/winston')
const config = require('../helpers/config')
const db = require('../helpers/postgress')
router.get('/', async(req, res, next) => {
    db.pool.query('select * from accounts')
        .then((rs) => {
            res.status(200).json({
                code: 0,
                data: rs.rows
            })
        })
        .catch((e) => {
            res.status(500).json({
                code: 1,
                data: rs.rows
            })
        })
});
router.get('/cache-logs', async(req, res, next) => {
    
    try {
        fs.unlinkSync(path.join(__dirname, '../logs/infos.log'))
        return res.json({
            code: 0
        })
    } catch (error) {
        return res.json({
            code: 1
        })
    }
});
module.exports = router;
