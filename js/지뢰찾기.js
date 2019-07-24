// 전역변수
var tbody = document.querySelector('#table tbody');
var 중단플래그 = false;
var 열은칸 = 0;
var dataset = []; // 데이터생성 2차원 배열
var hor;
var ver;
var mine;

document.querySelector('#exec').addEventListener('click', function () {
  // tbody안 초기화
  tbody.innerHTML = '';
  중단플래그 = false;
  열은칸 = 0;
  // dataset 초기화
  dataset = [];
  // result 결과 초기화
  document.querySelector('#result').textContent = '';

  hor = parseInt(document.querySelector('#hor').value);
  ver = parseInt(document.querySelector('#ver').value);
  mine = parseInt(document.querySelector('#mine').value);


  // 원하는 숫자 랜덤하게 뽑기 처음은 원래배열을 썩는것이다. 피셔에이치 셔플 
  // 원하는 개수만큰 지뢰 심기
  var 셔플 = randomPull(hor * ver, mine, true);


  // 화면생성 및 데이터 생성
  // tbody안 tr, td 생성
  for (var i = 0; i < hor; i += 1) {
    var arr = [];
    var tr = document.createElement('tr');
    for (var j = 0; j < ver; j += 1) {
      arr.push(0);
      var td = document.createElement('td');
      // td.textContent = i + ',' + j;
      tr.appendChild(td);
    }
    dataset.push(arr);
    tbody.appendChild(tr);
  } // for tr end

  // tbody안에 tr td 생성완료후 컨텐스트(오른클릭) 이벤트 붙여줌
  contextFunction();
  // tbody안에 tr td 생성완료후 왼클릭 주변지뢰개수 이벤트
  showMineNum();

  //지뢰심기
  for (var k = 0; k < 셔플.length; k++) {
    var 가로 = Math.floor(셔플[k] / ver);
    var 세로 = 셔플[k] % ver;

    tbody.children[가로].children[세로].textContent = 'X';
    dataset[가로][세로] = 'X';
  }

  // console.log(dataset);
}); // 실행 클릭하면


// td에 우클릭시 작동하는 함수
function contextFunction() {
  tbody.querySelectorAll('td').forEach(function (td) {
    td.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var 부모tr = e.currentTarget.parentNode;
      var 부모tbody = e.currentTarget.parentNode.parentNode;
      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
      var 칸 = Array.prototype.indexOf.call(부모tr.children, td);

      if (중단플래그 || dataset[줄][칸] === 1) {
        return
      }

      if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
        tbody.children[줄].children[칸].textContent = '!';
        tbody.children[줄].children[칸].className = '';
        tbody.children[줄].children[칸].classList.toggle('exclamation');
      } else if (e.currentTarget.textContent === '!') {
        tbody.children[줄].children[칸].textContent = '?';
        tbody.children[줄].children[칸].className = '';
        tbody.children[줄].children[칸].classList.toggle('question');
      } else if (e.currentTarget.textContent === '?') {
        tbody.children[줄].children[칸].className = '';
        if (dataset[줄][칸] === 'X') {
          tbody.children[줄].children[칸].textContent = 'X';
          dataset[줄][칸] = 'X';
        } else {
          tbody.children[줄].children[칸].textContent = '';
        }
      }
    })
  }); // tboy안에 td들을 우클릭하면
} // contextFunction

// td에 왼쪽클릭해서 주변8칸 지뢰개수 알려주기
function showMineNum() {
  tbody.querySelectorAll('td').forEach(function (td) {
    td.addEventListener('click', function (e) {
      if (중단플래그) {
        return
      }
      var 부모tr = e.currentTarget.parentNode;
      var 부모tbody = e.currentTarget.parentNode.parentNode;
      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
      var 칸 = Array.prototype.indexOf.call(부모tr.children, td);

      // 왼쪽클릭이 화면상 빈칸일때 x
      // 왼클릭이 데이터상 0일때
      // if (tbody.children[줄].children[칸].textContent === '') {
      if (dataset[줄][칸] === 0 && tbody.children[줄].children[칸].textContent === '') {
        열은칸 += 1;
        console.log(열은칸);
        if (열은칸 === hor * ver - mine) {
          중단플래그 = true;
          document.querySelector('#result').textContent = "성공 앙기모리 ^^";
          setTimeout(function () {
            alert('게임성공!');
          }, 1000)
        }
        e.currentTarget.classList.add('opened');
        dataset[줄][칸] = 1; // 연칸들  데이터 1
        // console.log('좌', tbody.children[줄].children[칸]);
        var 주변칸배열 = [];
        var 주변칸td = [];
        for (var i = -1; i < 2; i++) {
          for (var j = -1; j < 2; j++) {
            if (줄 + i > -1 && 칸 + j > -1 && 줄 + i < hor && 칸 + j < ver) {
              if (i == 0 && j == 0) {} else {
                주변칸배열.push(dataset[줄 + i][칸 + j]);
                주변칸td.push(tbody.children[줄 + i].children[칸 + j]);
              }
            }
          }
        } // 2중 for
        function mineCount() {
          var tempCount = [];
          주변칸배열.forEach(function (item, i) {
            if (item === 'X') {
              tempCount.push(i);
            }
          })
          return tempCount.length;
        } // mineCount

        var 주변지뢰개수 = mineCount();
        // 거짓인 값: false, '', 0, null, undefined, NaN
        e.currentTarget.textContent = 주변지뢰개수 || '';

        // 내가클릭한곳의 주변지뢰가 없을경우 0 일경우
        if (주변지뢰개수 === 0) {
          // 주변 8칸 동시 오픈(재귀 함수)
          주변칸td.forEach(function (옆칸) {
            setTimeout(function () {
              var 부모tr = 옆칸.parentNode;
              var 부모tbody = 옆칸.parentNode.parentNode;
              var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
              var 칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
              if (dataset[줄][칸] !== 1) {
                옆칸.click();
              }
            }, 0)
          });
        }

        // //내가클릭한 곳이 0 이면 주변 8칸 오픈 대축제~
        // if(e.currentTarget.textContent === '0'){
        //   주변칸td.forEach(function(item){
        //     // setTimeout(function(){
        //       if(item.classList.contains('opened') && item.textContent != ''){

        //       }else{                        
        //         item.click();
        //       }   
        //     //}, 0)
        //     // td가  이미 오픈해서 class opened 를 가지고있으면 클릭안함      
        //   });
        // }

        // console.log(주변칸배열);
        // console.log(주변칸td);
        // console.log(mineCount());        
      } else if (tbody.children[줄].children[칸].textContent === 'X') {
        중단플래그 = true;
        e.currentTarget.textContent = '펑!';
        document.querySelector('#result').textContent = "실패~ 앙기모리~";
      }

    }) // click
  }) // forEach
} // showMineNum