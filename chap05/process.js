// process.js
const process = require('process');
const os = require('os');
console.log(os.totalmem() / (1024**3), os.freemem() / (1024**3));
// for(let i = 1; i <= 10; i++) {
//   console.log(`i의 값은 ${i}`);
//   if(i == 5) {
//     process.exit(); // 실행되고있는 프로세스 종료
//   }
// }
// console.log(process.env.Path.split(';'));