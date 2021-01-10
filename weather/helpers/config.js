const e = require("express")

const bodyWinston = (code,message) => {
    let status = ''
    if(code === 0) {
        status = 'SUCCESS'
    }else {
        status = 'ERROR'
    }
    return {
        code,
        message: `[${status}] [${message}] `
    }
}

module.exports = {
    bodyWinston
}