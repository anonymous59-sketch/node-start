require('dotenv').config({path: "../.env"})
const cron = require('node-cron');
const transporter = require('./nodemailer.js')

const cron_job = () => {
  return cron.schedule(`*/2 * * * * *`/* 초, 분, 시간, 일, 월, 요일 *\/2라는 식으로 적으면 2초마다 실행한다라는 식으로 가능 */, () => {
    console.log(new Date() + ' => 작업물');
    // transporter.sendMail({
    //   from:process.env.FROM + '@daum.net',
    //   to: 'swpark9659@naver.com',
    //   subject: "cron 연습",
    //   text: `스케쥴러 메일 발송 연습 ${new Date()}`
    // }, err => {
    //   if(err) {
    //     console.log(err);
    //   }
    //   console.log('발송완료');
    // })
    // console.log('메일발송 시작');
  }, {scheduled: false});
  
  // const cron_job = cron.schedule('* * * * * *', () => {
  //   console.log('작업중');
  // }, {scheduled: false});
}
module.exports = cron_job;