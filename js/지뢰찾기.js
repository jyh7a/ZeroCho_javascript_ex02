document.querySelector('#exec').addEventListener('click', function () {
  var tbody = document.querySelector('#table tbody');
  // tbody안 초기화
  tbody.innerHTML = '';

  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);  

  // 데이터생성 2차원 배열
  var dataset = [];


  // 원하는 숫자 랜덤하게 뽑기 처음은 원래배열을 썩는것이다. 피셔에이치 셔플 
  var 셔플 = randomPull(hor * ver, mine, true);

  console.log(셔플);

  // 화면생성 및 데이터 생성
  // tbody안 tr, td 생성
  for (var i = 0; i < hor; i += 1) {
    var arr = [];
    var tr = document.createElement('tr');
    for (var j = 0; j < ver; j += 1) {
      arr.push(1);
      var td = document.createElement('td');
      td.textContent = i + ',' + j;
      tr.appendChild(td);
    }
    dataset.push(arr);
    tbody.appendChild(tr);
  } // for tr end


  //지뢰심기
  for (var k = 0; k < 셔플.length; k++) {
    var 가로 = Math.floor(셔플[k] / ver);
    var 세로 = 셔플[k] % ver;     

    tbody.childNodes[가로].childNodes[세로].textContent = 'X';
  }

}); // 실행 클릭하면