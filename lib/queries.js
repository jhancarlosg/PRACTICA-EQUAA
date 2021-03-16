const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'practica-equaa',
  password: "3Iq`/1*!h+maGU1JS0;81^aD=9Hkx'",
  port: 5432,
});

exports.defaults = pool