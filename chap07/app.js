// app.js
const express = require('express');
// const fs = require('fs');
const app = express(); // 인스턴스 생성
const sampleRoute = require('./routes/sample.route.js')
const multer = require('multer');
const path = require('path');
const pool = require('./db.js');

// 서버 실행 포트 설정
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정
const storage = multer.diskStorage({
  // 첫번째는 저장경로
  destination: (req, file, cb) => {
    // console.log('destination' + req, file);
    cb(null, 'public/images'/* 파일을 업로드 했을 때 첫번째 값은 에러값, 두번째 값은 파일의 저장 위치 */)
  },
  // 두번째는 overwrite가 되면 안되니까 파일 이름 설정
  filename: (req, file, cb) => {
    // console.log('filename' + req, file);
    const file_encoding_name = Buffer.from(file.originalname, 'latin1').toString('utf-8'); // 인코딩 방식이 꼬여서 고침
    const ext = path.extname(file_encoding_name);
    const fn = path.parse(file_encoding_name).name;
    cb(null, fn + Date.now() + ext);
    // const fn = file_encoding_name.substring(0, file_encoding_name.indexOf('.'));
    // const ext = file_encoding_name.substring(file_encoding_name.indexOf('.'));
    // cb(null, fn + "_" + Date.now() + ext);
  }
});

const upload = multer({storage}); // mutler 모듈의 인스턴스

// 정적페이지를 url로 접근할 수 있도록 하는 모듈
app.use(express.static('public'));
app.use(express.static('images'));

// 라우팅; url : 실행함수
app.get('/', (req,res) => {
  res.send(`/페이지 호출`);
});

app.use('/sample', sampleRoute);


app.post('/upload', upload.single("user_img"), (req, res) => {
  // console.clear();
  // console.log(req);
  // console.log(req.body);
  // console.log(req.file.filename);
  const data = req.body;
  const filename = req.file.filename
  res.json({
    user_name: data.user_name,
    user_age: data.user_age,
    filename,
  });
  // res.send('success');
});

// 회원추가
app.post('/create', upload.single('user_img'), async(req, res) => {
  const {user_id, user_pw, user_name} = req.body;
  const file_name = req.file.filename
  let result = await pool.query('INSERT INTO member (user_id, user_pw, user_name, user_img) VALUES (?, ?, ?, ?)', [user_id, user_pw, user_name, file_name]);
  console.log(result);
  res.send('완료');
})

//서버 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버 실행 http://localhost:${SERVER_PORT}`)
});

