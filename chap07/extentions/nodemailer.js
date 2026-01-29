// nodemailer.js
const nodemailer = require('nodemailer');

// console.log(process.env);

const transporter = nodemailer.createTransport({
  host:'smtp.daum.net',
  port: 465,
  secure: true,
  auth : {
    user: process.env.FROM,
    pass: process.env.PASS,
  }
})

// 메일 발송 메서드
// transporter.sendMail({
//   from: 'rnldudnsguy@daum.net',
//   to: 'swpark9659@naver.com',
//   subject: 'Test Email',
//   text: '메일 발송 연습중입니다.',
// }, (err, info) => {
//   if(err) {
//     console.log('오류발생');
//     console.error(err);
//     return;
//   }
//   console.dir(`sendmail OK : ${info}`)
//   // console.dir(info, {depth:5})
// });

// console.log('sendmail start ==> ') // 비동기처리라서 확인용도

module.exports = transporter;