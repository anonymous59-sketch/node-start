const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/test/:msg', (req, res) => {
  const message = req.params.msg
  // test.txt 작성
  fs.writeFile('./test.txt', message, 'utf-8', (err, buf) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(buf);
  });
  res.send('/test 페이지 호출')
})

router.get('/read', (req, res) => {
  const text = fs.readFileSync('./test.txt', 'utf-8'/* , (err, buf) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(buf);
    res.send(buf);
  } */)
   res.send(text);
})

// http://localhost:3000/sample => sample.html이 화면에 출력
router.get('/sample', (req, res) => {
  const sample = fs.readFileSync('./etc/sample.html', 'utf-8')
  res.send(sample);
  // res.redirect('/read'); // 현재 페이지를 지정된 페이지로 이동
  // res.render(); // 정적 페이지를 동적페이지로 변환하여 그리는 방식.
  // res.sendStatus(200); // 200 정상, 404 페이지없음, 500 예외발생으로 에러,
})

module.exports = router;