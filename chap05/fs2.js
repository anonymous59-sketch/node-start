// fs2.js
const fs = require('fs');

let data = '데이터 쓰기 실습';

fs.writeFile('./output/stdout.log', data, 'utf-8', err => {
  if(err) {
    console.error(err);
  }
  console.log('완료');
})

data = '테스트 데이터'
fs.writeFileSync('./output/stdout.log', data, 'utf-8');