
// 바둑에서 쓸 현재 흰색돌(검은돌) 주변에 남은 
// 좌표배열 중복 제거후 length 및 기타 리턴
function returnUniqeLength() {
  var temp = [];
  var final = [];

  // 2차배열을 문자열 배열(1차)로 만들어줌
  for (var i = 0; i < test.length; i++) {
    temp = temp.concat(test[i].join());
    for (var j = 0; j < test[i].length; j++) {

    } //for
  } //for

  // 중복값 제거
  final = temp.filter(function (item, index) {
    return temp.indexOf(item) === index;
  });

  return {
    orign: temp,
    orign_length: temp.length,
    unique: final,
    unique_length: final.length
  };
}