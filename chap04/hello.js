// hello.js
const {minus, sum} = require('./module.js'); // 모듈을 불러오기

const nodeFnc = () => {
  console.log('Hello World');
}
nodeFnc();

console.log(sum(10, 20));
console.log(minus(10, 30));