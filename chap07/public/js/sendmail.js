// sendmail.js
// form => submit,
// method : post, url : mail_send, bodyL to, subject, text 값

document.querySelector('form#sendmail').addEventListener('submit', e => {
  e.preventDefault();
  const toObj = document.querySelector('input#to');
  const subjectObj = document.querySelector('input#subject');
  const contentObj = document.querySelector('textarea#content');
  const fileObj = document.querySelector('input#attachment');
  const to = toObj.value;
  const subject = subjectObj.value;
  const html = contentObj.value;
  // console.log(fileObj.files);
  const file = fileObj.files;

  if(!to || !subject || !html) {
    alert('내용을 입력해주세요');
    return;
  }
  // 첨부파일도 넘기기 위해서 multipart로 형식 전환
  const formData = new FormData();
  formData.append('to', to);
  formData.append('subject', subject);
  formData.append('html', html);
  
  if(fileObj.files.length > 0) {
    for(let i = 0; i < fileObj.files.length; i++)
    formData.append('attachment', file[i]);
  }
  
  fetch('/mail_send', {
    method: "POST",
    // headers: {'Content-Type': 'application/json'}, 
    // body: JSON.stringify({
    //   to,
    //   subject,
    //   html
    // })
    body : formData
  })
    .then(res => res.json())
    .then(result => {
      const code = result.retCode;
      if(code == 'OK') {
        alert('메일발송 성공');
        toObj.value = '';
        subjectObj.value = '';
        contentObj.value = '';
        toObj.focus();
      } else {
        alert('메일발송 문제');
      }
    })
    .catch(err => console.error(err)
  );
})