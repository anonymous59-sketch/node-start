const fs = require('fs'); // 파일의 입출력을 담당하는 모듈
const console1 = require('console');
// console.log(console1); // 여러 속성이 있는데 그 중에 Console을 가지고 와서 사용하기 위해 변수 선언
const {Console} = require('console');
// stream을 활용해서 file 생성
const output = fs.createWriteStream('./output/stdout.log', {flags:'a'}); // 쓰기 전용 파일 생성
const errOutput = fs.createWriteStream('./output/error.log', {flags:'a'}); // 폴더는 생성해줘야 파일이 생성이 됨
// flags:'a' 옵션은 로그가 누적되어서 쓰이게된다.

const logger = new Console({stdout: output, stderr: errOutput}); // standard output
logger.log("[" + new Date() + "] hello, world"); // stdout 속성의 값인 output에 값을 입력하여 저장하는 방식. // 콘솔에 적히는 로그를 파일로 저장하기 위해 사용하는 방식
// .log ; 서버의 실행이력이나 기타 등등을 로그형식으로 출력
logger.error(`[${new Date()}] error log`); // 에러형식 출력

let count = 1;
const job = setInterval(() => {
  logger.log(`현재 카운트는 [${count}]`)
  count++;
  if(count > 10) {
    clearInterval(job);
  }
}, 1000)