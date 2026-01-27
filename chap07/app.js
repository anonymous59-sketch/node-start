// app.js
const express = require('express');
// const fs = require('fs');
const app = express(); // 인스턴스 생성
const sampleRoute = require('./routes/sample.route.js')
// 서버 실행 포트 설정
const SERVER_PORT = 3000;

// 라우팅; url : 실행함수
app.get('/', (req,res) => {
  res.send(`/페이지 호출`);
});

app.use('/sample', sampleRoute);

//서버 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버 실행 http://localhost:${SERVER_PORT}`)
});

