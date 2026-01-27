// 실습 post2.js
// 상품(상품번호(key역할), 상품명, 가격, 판매자), 상품후기(후기번호(key역할), 후기내용, 상품번호, 작성자)
fetch('products')
  .then(res => res.json())
  .then(result => {
    const tbody = document.querySelector('tbody#list'); 
    result.forEach(elem => {
      const list = `<tr>
        <td>${elem.id}</td>
        <td>${elem.name}</td>
        <td>${elem.price}</td>
        <td>${elem.seller}</td>
      </tr>`
      tbody.insertAdjacentHTML('beforeend', list);
    })
  })
  .catch(err => console.error(err)
);

function reviewInfo(productId) {
  fetch('reviews?productId=' + productId)
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.error(err)
  );
}
reviewInfo(1004);

function addReview(data = {}) {
  fetch('reviews', {
    method: 'POST',
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.error(err)
  );
}

let data = {
  id: 13,
  content: 'test content',
  productId: 1006,
  writer: 'test writer'
}
// addReview(data);