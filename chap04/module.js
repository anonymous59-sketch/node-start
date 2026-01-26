// 모듈화, 원하는 기능만 보낼 수 있다.
const sum = (a, b) => {
  return a + b;
}

const minus = (a, b) => {
  return a - b;
}
// 외부 모듈에서 사용할 수 있도록 내보내기가 필요
module.exports = {sum, minus}; // node.js 환경에서 자바스크립트를 모두 모듈화 해서 사용하기 위해 module 메서드를 사용 