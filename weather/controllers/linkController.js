const {pool} = require('../helpers/db')
const logger = require('../helpers/winston')
const config = require('../helpers/config')
let Parser = require('rss-parser');
var cheerio = require('cheerio');
const db = require('../helpers/postgress')
let parser = new Parser();
const update = async(req,res,next)=> {
    const {name,link,date,user,title} = req.body
    const query = `
    INSERT INTO news(
        news_name, news_link, created_on, user_name, news_title)
        VALUES (${name}, '${link}', '${date}', ${user},${title});
    `
    db.pool.query(query)
    .then(() => {
        return res.status(200).json({
            code: 0
        })
    }).catch((e) => {
        console.log(e)
        return res.status(500).json({
            code: 1
        })
    })
}
const vnexpressRSSOld = async(req,res,next) => {
    db.pool.query(`
        select * from news
    `).then((rs) => {
        return res.status(200).json({
            data: rs.rows
        })
    }).catch(e => res.status(500).json({code: 1}) )
}
const vnexpressRSS = async(req,res, next) => {
    
    Promise.all(
        [
            parser.parseURL('https://vnexpress.net/rss/giai-tri.rss'),
            parser.parseURL('https://vnexpress.net/rss/thoi-su.rss')
        ]
        
    ).then(([feed1,feed2]) => {
        
        const dataArr1 = feed1.items.map((e,i) => {
            if(i < 13) {
                var $ = cheerio.load(e.content)
                let headContents=$('img')[0].attribs.src; 
                return {
                    ...e,
                    img: headContents
                }
           }
        })
        return res.json({
            code: 0,
            data: dataArr1.filter(Boolean)
        })
    }).catch((e) => {
        next(e)
    })

  
}
const h24RSS = async(req,res, next) => {
    
    Promise.all(
        [
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/thoitranghitech.rss'),
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/suckhoedoisong.rss'),
            parser.parseURL('https://cdn.24h.com.vn/upload/rss/lamdep.rss')
        ]
    ).then(([feed,feed1,feed2]) => {
        const dataArr = feed.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr1 = feed1.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr2 = feed2.items.map((e,i) =>{
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataRs = dataArr.concat(dataArr1).concat(dataArr2).filter(Boolean)
        logger.info(config.bodyWinston(0,JSON.stringify(dataRs)))
        return res.json({
            code: 0,
            data: dataRs
        })
    }).catch((e) => {
        next(e)
    })

  
}
const tuoitreRSS = async(req,res, next) => {
    
    Promise.all(
        [
            parser.parseURL('https://tuoitre.vn/rss/tin-moi-nhat.rss'),
            parser.parseURL('https://tuoitre.vn/rss/nhip-song-so.rss'),
            parser.parseURL('https://tuoitre.vn/rss/the-gioi.rss')
        ]
    ).then(([feed,feed1,feed2]) => {
        

        const dataArr = feed.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr1 = feed1.items.map((e,i) => {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataArr2 = feed2.items.map((e,i) =>  {
            var $ = cheerio.load(e.content)
            let headContents=$('img')[0].attribs.src;
            if(i < 4) {
                delete e.content
                return {
                    ...e,
                    img: headContents
                }
               
            }
        })
        const dataRs = dataArr.concat(dataArr1).concat(dataArr2).filter(Boolean)
        logger.info(config.bodyWinston(0,JSON.stringify(dataRs)))
        return res.json({
            code: 0,
            data: dataRs
        })
    }).catch((e) => {
        next(e)
    })

  
}
const insertSeen = async(req,res,next) => {
    try {
        const {userId,linkId,seenLink,seenContent} = req.body
        const query = `
        INSERT INTO seen(seen_link,seen_content,link_id,user_id) 
        VALUES ('${seenLink}','${seenContent}',${linkId},${userId})
        `
        pool.query(query,
            (err,rows,_) => {
                if(err) {
                    next(err)
                }
                if(rows === undefined || rows.length < 1) {
                    logger.info(config.bodyWinston(2,JSON.stringify("No data")))
                    return res.status(403).json({
                        code: 2
                    }) 
                }
                logger.info(config.bodyWinston(0,JSON.stringify(rows)))
                return res.status(200).json({
                    code: 0
                })
            }    
        )
    } catch (error) {
        next(error)
    }
}
const showNews = async(req,res,next)=> {
    try {
        const {userId, linkId} = req.body
        const query = `
            select * 
            from seen 
            where user_id = ${userId} and link_id = ${linkId} 
        `
        pool.query(query, 
            function(err, rows, fields) {
                if(err) {
                    next(err)
                }
                if(rows.length < 1) {
                    logger.info(config.bodyWinston(2,JSON.stringify("No data")))
                    return res.status(403).json({
                        code: 2
                    }) 
                }
                logger.info(config.bodyWinston(0,JSON.stringify(rows)))
                return res.status(200).json({
                    code: 0,
                    data: rows
                })
            }
        )
    } catch (error) {
        console.log(error)
        next(error)
    }
}
module.exports = {
    update,
    vnexpressRSS,
    tuoitreRSS,
    h24RSS,
    showNews,
    insertSeen,
    vnexpressRSSOld
}