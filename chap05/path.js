// 파일의 경로, 확장자, 파일명
const path = require('path'); // 현재 실행하고 있는 파일의 경로 정보
console.log(__dirname);
console.log(__filename);

console.log(path.isAbsolute(__filename));
// path, url 모듈은 집에서 해보기
