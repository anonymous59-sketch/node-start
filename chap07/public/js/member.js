//member.js
const role = localStorage.role;
const uId = localStorage.uId;

// textnode를 사용하려면 DOM 객체가 필요하다.
let roleText = document.createTextNode('(당신은 손님입니다)');
if(role || uId) {
  // alert(`${uId}의 권한은 ${role}입니다.`)
   roleText = document.createTextNode(`(${uId}의 권한은 ${role}입니다.)`);
  }
document.querySelector('h3').appendChild(roleText);

fetch('/list')
  .then(res => res.json())
  .then(result => {
    // console.log(result);
    const tbody = document.querySelector('tbody#list');
    result.forEach(elem => {
      const html = `<tr id="${elem['user_id']}">
        <td>${elem['user_id']}</td>
        <td>${elem['user_name']}</td>
        <td><img src="images/${elem.user_img}" alt="userImg"></td>
        <td>${elem['responsibility']}</td>
        <td class="delete-td"><span class="btn-delete" onclick="deleteMember('${elem['user_id']}')">삭제</span></td>
      </tr>`
      tbody.insertAdjacentHTML('beforeend', html);
    });
    if(role != "Admin") {
      document.querySelectorAll('.btn-delete').forEach(elem =>{
        elem.classList.add('disable');
        elem.onclick = null;
      });
    }
  })
  .catch(err => console.error(err)
);


function deleteMember(delId) {
  if(role == 'Admin') {
    if(confirm('삭제하시겠습니까?')) {
      // console.log(delId);
      fetch(`/delete/${delId}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        // console.log(document.querySelector(`tr[id="${delId}"]`));
        if(result.retCode == 'OK') {
          document.querySelector(`tr[id="${delId}"]`).remove();
          alert('삭제되었습니다.');
        } else if (result.retCode == 'deleteNG') {
          alert('삭제하는데 실패 했습니다.')
        } else {
          alert('삭제처리 중 서버 통신 오류');
        }
      })
      .catch(err => console.error(err)
    );
    }
  } else {
    alert('삭제권한이 없습니다.')
  }
}

