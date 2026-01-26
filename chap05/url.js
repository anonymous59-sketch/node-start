//url.js
const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
console.log(myURL);

console.log(myURL.hash);
myURL.hash = 'text';
console.log(myURL.href);
const testURL = new URL('https://example.org/?user=abc&query=xyz');
console.log(testURL);
console.log(testURL.searchParams.get('user'));
console.log(testURL.searchParams.has('user'));
console.log(testURL.searchParams.keys());
console.log(testURL.searchParams.values());
testURL.searchParams.append('user', 'admin');
console.log(testURL, testURL.searchParams.keys(), testURL.searchParams.values());
console.log(testURL.searchParams.getAll('user'));
testURL.searchParams.set('user', 'admin');
console.log(testURL);
testURL.searchParams.delete('user');
console.log(testURL);
console.log(testURL.searchParams.toString());
console.clear();

const url = require('url');
console.log(url.parse('https://user:pass@sub.example.example.com:8080/p/a/t/h?query=string#hash'));