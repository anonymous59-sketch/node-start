// 환경변수는 최상위로 두어서 제일 먼저 실행하는 것
require('dotenv').config({ silent: true });

// app.js
const express = require('express');
// const fs = require('fs');
const app = express(); // 인스턴스 생성
const sampleRoute = require('./routes/sample.route.js');
const multer = require('multer');
const path = require('path');
const pool = require('./db.js');
const crypto = require('crypto');
const fs = require('fs');
const transporter = require('./extentions/nodemailer.js');
const cron_job = require('./extentions/nodecron.js');
// console.log(process.env);
// 서버 실행 포트 설정
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정
const storage = multer.diskStorage({
  // 첫번째는 저장경로
  destination: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
    cb(null, 'public/images'/* 파일을 업로드 했을 때 첫번째 값은 에러값, 두번째 값은 파일의 저장 위치 */)
  },
  // 두번째는 overwrite가 되면 안되니까 파일 이름 설정
  filename: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
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
// multer를 여러번 사용하고싶으면 인스턴스를 여러개 사용하기.

// multer 분리, 메일 업로드용
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/mail')
  },
  filename: (req, file, cb) => {
    const file_encoding_name =  Buffer.from(file.originalname, 'latin1').toString('utf-8');
    const ext = path.extname(file_encoding_name);
    const fn = path.parse(file_encoding_name).name;
    const fileName = path.basename(file_encoding_name);
    cb(null, fileName);
  }
});
const upload1 = multer({storage: storage1});

// 정적페이지를 url로 접근할 수 있도록 하는 모듈
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json()); // json형태 통신을 위해서는 모듈 사용 필수
app.use(express.urlencoded({extended : true})); // application/x-www-form-urlencoded 라는 타입의 처리 post요청일 경우에만 사용

// 라우팅; url : 실행함수
app.get('/', (req,res) => {
  res.send(`/페이지 호출`);
});

// 라우팅 사용
app.use('/sample', sampleRoute);

app.get('/start', (req, res) => {
  cron_job.start();
  res.send('메일 발송 시작됨');
})

app.get('/end', (req, res) => {
  cron_job.stop();
  res.send('메일 발송 종료됨');
})

// 메일 발송 
app.post('/mail_send', upload1.array('attachment'), (req, res) => {
  const {to, subject, html} = req.body;
  // console.log(path.join(__dirname, 'public/images/'));
  // console.log(req.files);
  transporter.sendMail({
    from: process.env.FROM + '@daum.net',
    to,
    subject,
    html,
    attachments: req.files.map(file => ({
      filename: file.filename,
      path: path.join(__dirname, 'public/mail/', file.filename)
    }))
    // attachments: [{/* 여러 건 첨부가 가능해서 배열안의 객체 형식, */
    //   filename: req.file.filename,
    //   path: path.join(__dirname, 'public/mail/' + req.file.filename)
    // }],
  }, (err, info) => {
    if(err) {
      console.log('오류발생', err);
      res.json({retCode: 'NG', retMsg : err});
    }
    // console.log(`sendmail OK : `, info);
    req.files.forEach(delFile => {
      const path1 = path.join(__dirname, 'public/mail', delFile.filename);
      fs.unlink(path1, err => err /* ? console.error(`메일 보낸 후 파일 삭제 실패`) : console.log('메일 보낸 후 파일 삭제 성공') */)
    })

    res.json({retCode: "OK", retMsg : info});
    // console.dir(info, {depth:5})
  });

// console.log('sendmail start ==> ') // 비동기처리라서 확인용도
});

// /members/:guest@email.com
app.get('/members/:to', async (req, res) => {
  const to = req.params.to;
  try {
    const [result, rows] = await pool.query(`SELECT user_id "아이디", user_name "이름", user_img "사진", responsibility "권한" FROM member`)
    // console.log(result);
    let html = `<table border = '1px'>
    <thead>
      <tr>
        <th>아이디</th>
        <th>이름</th>
        <th>사진</th>
        <th>권한</th>
      </tr>
    </thead>
    <tbody>`;
    result.forEach(elem => {
      // console.log(elem['사진']);
      const imgDir = path.join('public/images', elem['사진']) // 경로가 맞지 않음. 웹서버기준 경로라서 로컬 경로는 사용이 안됨
      // const imgDir = `http://192.168.0.16:3000/images/${elem['사진']}`
      html += `<tr>
        <td>${elem['아이디']}</td>
        <td>${elem['이름']}</td>
        <td><img src="${imgDir}" alt="회원이미지"></td>
        <td>${elem['권한']}</td>
      </tr>`
    });
    html += `</tbody></table>`;
    // console.log(html);
    transporter.sendMail({
      from: process.env.FROM + '@daum.net',
      to,
      subject: '회원목록',
      html,
    }, (err, info) => {
      if(err) {
        res.json({retCode: 'NG', retMsg : err});
      }
      res.json({retCode: "OK", retMsg : info});
    })
  } catch(err) {
    console.log(err);
    res.json({retCode: 'error', retMsg : err});
  };
})

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
  const file_name = req.file ? req.file.filename : null;
  console.log(file_name);
  console.log(req.body);
  console.log(req.file);
  // 암호화를 위해 crypto 모듈 import하기
  let password = crypto.createHash('sha512').update(user_pw).digest('base64');
  try{
    let result = await pool.query('INSERT INTO member (user_id, user_pw, user_name, user_img) VALUES (?, ?, ?, ?)', [user_id, password, user_name, file_name]);
    // console.log(result);
    res.json({retCode: 'OK'});
  } catch(err) {
    // console.log(err);
    // 업로드된 이미지 (폴더에 들어간 파일 지우기)
    // path.join 경로를 만들어내기 위한 메서드
    const delFileDir = path.join(__dirname, 'public/images', file_name);
    // fs.unlink 파일 경로를 찾아서 삭제
    fs.unlink(delFileDir, (err) => err ? console.error('파일 삭제 중 에러 ' + err) : console.log('파일삭제 완료 ' + delFileDir));
    res.json({retCode : "NG", retMsg: err.sqlMessage});
  };
})

// member html에 멤버 목록을 가지고 오기 대신 id, name, img가 표현이 되도록 해야하고 img는 html의 src를 이용해서 images의 파일을 가지고 와서 보여주기
app.get('/list', async (req, res) => {
  try {
    const [result, rows] = await pool.query('SELECT user_id, user_name, user_img, responsibility FROM member ORDER BY 1');
    // console.log(result);
    res.json(result)
  } catch(err) {
    // console.log(err);
    res.json({retCode : 'NG'});
  }
})

//로그인 라우팅 , pw는 암호화로 바꾼 다음에 값을 비교하기, 쿼리문은 아이디와 비번 다 확인하기, 조회되면 retCode : OK
app.post('/login', async (req, res) => {
  // console.log(req.body);
  const user_id = req.body.id;
  const user_pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  // console.log(user_id, user_pw);
  try {
    const [result1, rows1] = await pool.query('SELECT count(*) "cnt" FROM member WHERE user_id = ?', [user_id]);
    // console.log(result1[0].cnt);
    const loginIdCode = result1[0].cnt;
    if (loginIdCode) {
      const [result2, rows2] = await pool.query('SELECT count(*) "cnt", user_name, responsibility FROM member WHERE user_id = ? AND user_pw = ?', [user_id, user_pw]);
      // console.log(result2);
      const loginCode = result2[0].cnt
      loginCode ? res.json({retCode:"OK", user_name : result2[0].user_name, role : result2[0].responsibility}) : res.json({retCode:"pwNG"});
    } else {
      res.json({retCode:"idNG"})
    }
  } catch(err) {
    console.log(err);
    res.json({retCode:'loginError'});
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const [data, rows] = await pool.query('SELECT user_img FROM member WHERE user_id =?', [id])
    // console.log(data[0].user_img);
    const fileName = data[0].user_img;
    let delFileDir = '';
    if(fileName) {
      delFileDir = path.join(__dirname, 'public/images', fileName);
    }
    console.log(delFileDir);
    const result = await pool.query('DELETE FROM member WHERE user_id = ?', [id]);
    // console.log(result);
    const resultCode = result[0].affectedRows;
    // console.log(resultCode);
    if (resultCode) {
      if(delFileDir) {
        fs.unlink(delFileDir, (err) => err ? console.error('파일 삭제 중 에러 ' + err) : console.log('파일삭제 완료 ' + delFileDir));
      }
      res.json({retCode:'OK'});
    } else {
      res.json({retCode:'deleteNG'});
    }
  } catch(err) {
    console.log(err);
    res.json({retCode: "deleteERROR"})
  }
})

//서버 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버 실행 http://localhost:${SERVER_PORT}`)
});

