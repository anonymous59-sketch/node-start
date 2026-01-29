const pool = require('../db.js');
const crypto = require('crypto');

// excel.js
const xlsx = require('xlsx');
const workbook = xlsx.readFile('../uploads/엑셀연습2.xlsx')
const firstSheetName = workbook.SheetNames[0];
const firstSheet= workbook.Sheets[firstSheetName];

let result = xlsx.utils.sheet_to_json(firstSheet);
// console.log(result);
// console.log(firstSheet['C2'].t);
// result = xlsx.utils.sheet_to_formulae(firstSheet);
// console.log(result);

// firstSheet['A2'].v = 'user01';
// xlsx.writeFile(workbook, '../uploads/엑셀연습2.xlsx')

// module.exports = result;
for (let elem of result) {
  // console.log(elem);
  const password = crypto.createHash('sha512').update('' + elem['user_password']).digest('base64');
  awaitpool.query(`UPDATE member SET user_name = ? WHERE user_id = ?`, [elem['user_name'], elem['user_id']], (err, data) => {
    if(err) {
      console.log(err);
    }
    console.log(data);
  });
};