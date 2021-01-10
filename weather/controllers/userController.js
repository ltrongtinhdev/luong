const {pool} = require('../helpers/db')
const logger = require('../helpers/winston')
const config = require('../helpers/config')
const db = require('../helpers/postgress')
const login = async(req,res,next)=> {
    const {userName,password} = req.body
    const query = `
        select * from accounts where username  = '${userName}'
        and password = '${password}'
    `
    db.pool.query(query)
        .then((result) => {
            if(result.rows < 1) {
                logger.error(config.bodyWinston(2,JSON.stringify("No accounts")))
                return res.status(403).json({
                    code: 2
                })
            }
            logger.error(config.bodyWinston(0,JSON.stringify(result.rows)))
            return res.status(200).json({
                code: 0,
                data: result.rows
            })

        })
        .catch((e) => {
            next(e)
        })
}
const register = async(req,res,next)=> {
    try {
        const {userName,password,fullName} = req.body
        const query = `
            select * 
            from accounts 
            where username = '${userName}'
        `
        const queryInsert = `
        INSERT INTO accounts(
            username, full_name, password)
            VALUES ('${userName}','${fullName}','${password}');
        `
        db.pool.query(query)
            .then((res1) => {
                if(res1.rowCount > 0) {
                    logger.error(config.bodyWinston(2,JSON.stringify("accounts ton tai")))
                    return res.status(403).json({
                        code: 2
                    })
                }
                db.pool.query(queryInsert)
                    .then(() => {
                        
                        logger.error(config.bodyWinston(0,JSON.stringify("success")))
                        return res.status(200).json({
                            code: 0
                        })
                    })
                    .catch(e => {
                        next(e)
                    })
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    login,
    register
}