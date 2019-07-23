# javascript_ex02
 무료자바스크립트 두번째연습
<hr>

8-2<br>

NodeList, HTMLCollection<br>
getElementsByName()과 getElementsByTagName()은 NodeList 객체를 반환하며,<br>document.images와 document.forms는 HTMLCollection 객체를 반환한다. 이 <br>객체들은 둘 다 읽기 전용의 유사 배열 객체이다. 즉 length 속성이 있고, 진짜 <br>배열처럼 접근할 수 있다. 따라서 다음처럼 자바스크립트의 일반적인 반복문으로 <br>NodeList나 HTMLCollection의 내용을 순회할 수 있다. <br>
출처: https://iamawebdeveloper.tistory.com/50 [나는 웹개발자!]
<hr>

엘리먼트객체.children => HTMLcollection 객체배열 (배열로 나오지만 배열 아니다)<br>
cf. tbody.children<br>
Array.isArray(tbody.children) => false<br>
forEach 사용불가능
<hr>

엘리먼트객체.childNodes => NodeList 객체배열 (배열로 나오지만 배열 아니다)<br>
cf. tbody.childNodes<br>
Array.isArray(tbody.childNodes) => false<br>
forEach 사용가능 
<hr>

