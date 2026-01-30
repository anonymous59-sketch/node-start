const input = document.querySelector('input#excelUpload');
input.addEventListener('change', () => {
  const fileText = document.querySelector('.file-text');
  const fileSubText = document.querySelector('.file-subtext');
  const fileIcon = document.querySelector('.file-icon');
  const label = document.querySelector('.file-label');
  if (input.files.length > 0) {
    const fileName = input.files[0].name;

    fileText.textContent = fileName;
    fileSubText.textContent = '파일 선택됨';
    fileIcon.textContent = '✅';

    label.style.borderColor = '#22c55e';
    label.style.backgroundColor = '#f0fdf4';
  }
});

document.querySelector('button.upload-button').addEventListener('click', e => {
  if(input.files.length > 0) {
    // console.log(input.files[0]);
    const excelFile = input.files[0]
    const formData = new FormData();
    formData.append('file', excelFile);

    fetch('/update/member', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        const errCode = result.retCode;
        if(errCode == 'OK') {
          alert('처리되었습니다');
          input.value = '';
            const fileText = document.querySelector('.file-text');
            const fileSubText = document.querySelector('.file-subtext');
            const fileIcon = document.querySelector('.file-icon');
            const label = document.querySelector('.file-label');

            fileText.innerHTML = '엑셀 파일을 선택하거나<br/>여기에 드래그하세요';
            fileSubText.textContent = '(.xls, .xlsx)';
            fileIcon.textContent = '📊';
            label.style.borderColor = '#cbd5e1';
            label.style.backgroundColor = '#f8fafc';
        } else {
          alert(errCode);
        }
      })
      .catch(err => console.error(err)
    );

  }
})

