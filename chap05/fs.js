//fs.js
const fs = require('fs');

fs.readFile('./path.js', // 읽을 파일
  'utf-8', // 읽을 때 인코딩 방식
  (err, data) /* 콜백함수 */ => {
    if(err) {
      console.error(err);
    }
    console.log(data);
  }
) // 비동기 방식으로 처리된다.

console.log('end');

// 동기방식
const txt = fs.readFileSync('./process.js', 'utf-8');
console.log(txt);

console.log('txt end');