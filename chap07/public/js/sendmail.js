// sendmail.js
// form => submit,
// method : post, url : mail_send, bodyL to, subject, text 값

document.querySelector('form#sendmail').addEventListener('submit', e => {
  e.preventDefault();
  const toObj = document.querySelector('input#to');
  const subjectObj = document.querySelector('input#subject');
  const contentObj = document.querySelector('textarea#content');
  const to = toObj.value;
  const subject = subjectObj.value;
  const html = contentObj.value;
  
  if(!to || !subject || !html) {
    alert('내용을 입력해주세요');
    return;
  }

  fetch('/mail_send', {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      to,
      subject,
      html
    })
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