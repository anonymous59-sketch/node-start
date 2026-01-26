// 파일의 경로, 확장자, 파일명
const path = require('path'); // 현재 실행하고 있는 파일의 경로 정보
console.log(__dirname);
console.log(__filename);

console.log(path.isAbsolute(__filename));
// path, url 모듈은 집에서 해보기
console.log(path.basename(__filename, '.js'));
console.clear();
console.log(path.delimiter);
console.log(process.env.path.split(path.delimiter));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.clear();
console.log(__filename);
console.log(path.format({
	root: '/',
	dir: 'E:/programming/node-start/chap05/',
	base: 'path.js'
}));

console.log(path.format({
	root: '/',
	base: 'file.txt',
	ext: 'ignored'
}));

console.log(path.format({
	root: '/',
	name: 'file',
	ext: '.txt'
}));

console.clear();
console.log(path.parse('E:/programming/node-start/chap05/path.js'));

console.log(path.sep);