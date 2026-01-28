// db.js
const mysql = require('mysql2/promise');

// pool 많은 접속자를 처리하기위한 최적화 작업
const pool = mysql.createPool({
  host: '192.168.0.16',
  user: 'dev01',
  password: 'dev01',
  database: 'dev', 
});

module.exports = pool;