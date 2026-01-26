// crypto.js
const crypto = require('crypto');

let password = crypto.createHash('sha512'/* 암호화방식 */).update('pw1234'/* 암호화할 정보 */).digest('base64'/* 인코딩방식 */);
// console.log(password);

// salting 암호화
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64 /* 바이트 크기 */
      , /* 정상적으로 만들어지면 err == null, but == 만들어진 값 */ (err, buf) => {
      if(err) {
        reject(err)
      }
      resolve(buf.toString('base64')/* buf가 이진수로 된 바이트 값이라서 인코딩해서 글자로 변환 */);
    });
  });
};

// createSalt()
//   .then(res => console.log(res))
//   .catch(err => console.error(err)
// );

const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt();
  
  return new Promise((resolve,reject) => {
    //pbkdf2()가 salt값을 이용해서 평문을 암호화하는 함수
    crypto.pbkdf2(plainPassword
      ,salt
      ,100000 /* 반복수, 많을수록 복호화가 힘들다 */
      ,64 /* 생성되는 암호화 값의 크기 */
      ,'sha512' /* 암호화방식 */
      ,(err, key) /* 만들어지면 나오는 값을 가지고 기능 실행 */ => {
        if(err) {
          reject(err);
        }
        resolve({password: key.toString('base64'), salt});
        // salt 값이 변하는것으로 암호화된 비밀번호가 달라진다.
        // salt 값도 함께 db에 저장하고 특정 id에 접속하려면 그 id가 가지고 있는 salt를 사용해서 입력받은 pw를 암호화하고 db에 있는 암호화되어있는 정보랑 비교해서 로그인을 실패, 성공으로 구분한다.
      }
    ); 
  })
}

createCryptoPassword('pw1234')
  .then(res => console.log(res))
  .catch(err => console.error(err)
);
