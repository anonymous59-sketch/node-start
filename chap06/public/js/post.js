//post.js
fetch('/comments?userId=2&postId=1') // http://localhost:3001/posts를 가지고 와야하는데 지금 index.html의 경로가 http://localhost:3001이라서 굳이 앞의 url을 사용할 필요가 없다
// url 뒤에 ?를 붙이고 원하는 조건을 넣어서 조건에 만족하는 데이터만 가지고 올 수 있다.
// &를 통해 조건을 더 넣을 수 있다.
  .then(res => res.json())
  .then(result => console.log(result))
  .catch(err => console.error(err)
);