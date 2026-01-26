// console_global.js
console.time('time check');
for(let i = 1; i <= 100000; i++) {

}
console.timeEnd('time check');

console.log('Hello, Choi');
console.error('error 발생!');

const ary = [
  {name: "홍길동", age: 20},
  {name: "김길동", age: 22}
]

console.table(ary); // 배열일 경우 table로 만들어서 출력

// 자바스크립트에서 객체의 depth를 5단계로 예제를 만들어줘
const exampleObject = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: {
            message: "여기가 depth 5 입니다!",
            value: 42
          }
        }
      }
    }
  }
};
console.dir(exampleObject, {depth : 6}); // 객체의 구조를 파악하기 위해선 dir이 좋다.

