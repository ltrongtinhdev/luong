const Pool = require('pg').Pool
const pool = new Pool({
  user: 'aozkijpbzjswxv',
  host: 'ec2-52-87-135-240.compute-1.amazonaws.com',
  database: 'dam9s5kbssln2b',
  password: 'ef824206f76783d6166df87cbaaeb4f250bb4b89a2d4dc9b52a0ef845bac4b84',
  port: 5432,
  ssl: { rejectUnauthorized: false }
})

module.exports = {
  pool
}

