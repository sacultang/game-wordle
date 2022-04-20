let buttons= Array.from(document.querySelectorAll('.game-keyboard .key-btn'))

let word = 'APPLE' // 정답 단어
// console.log(word.length)
let gameOver = false;

let boardRow = 0; // 보드 줄 초기값
let tileNum = 0; // 보드 칸 초기값

// // 현재 줄의 데이터 값
let rowArr = document.querySelectorAll('.game-board')
console.log(rowArr)
// 현재 줄 안의 칸 데이터 값
// let tileArr = Array.from(document.querySelectorAll('.board__text'))


document.addEventListener('keyup', e =>{
  // console.log(e.code)
  // console.log(e.code[3])
  // console.log(e.key.toUpperCase())
  
  if(gameOver) return;
  if('KeyA' <= e.code && 'KeyZ' >= e.code){
    // console.log(e.code)
    if(tileNum < word.length){ // 보드칸의 넘버가 단어 길이보다 작을 경우
      let currTile = rowArr[boardRow].children[tileNum] // 현재 타일
      if(currTile.innerText === ''){
        currTile.innerText = e.code[3]
        tileNum += 1;
        console.log(currTile)
      }
    }
    // console.log(tileNum)
  }
  else if('Backspace' === e.code ){
    if(tileNum > 0 && tileNum <= word.length){
      tileNum -= 1;
      console.log(tileNum)
    }
    let currTile = rowArr[boardRow].children[tileNum]
    currTile.innerText = ''
    
  }
  else if('Enter' === e.code && tileNum === word.length){
    gameCheck()
    boardRow += 1;
    tileNum = 0;
    let currRow = rowArr[boardRow] 
    console.log(currRow)
    
  }
})

// console.log(word[0])
function gameCheck(){
  let wordCheck = 0;
  
  for(let text = 0; text < word.length; text++){
    let currTile = rowArr[boardRow].children[text]
    let answer = currTile.textContent;
    console.log(answer)
    if(word[text] === answer){
      // console.log('good')
      currTile.classList.add('good');
      wordCheck += 1;
      console.log(wordCheck)
    }
    else if(word.includes(answer)){
      // console.log('some good')
      currTile.classList.add('littlegood');
    }
    else {
      // console.log('bad')
      currTile.classList.add('bad');
    }
    console.log(rowArr[boardRow].dataset['row'])
    // 성공 여부 체크 
    if(wordCheck === word.length){
      gameOver = true;

      //modal 생성
      let modal = document.querySelector('.popup')
      modal.innerHTML = `
      정답
      <button class="popup--btn">reset</button>
      `
      modal.classList.add('display-flex')

      // btn reload
      const resetBtn = document.querySelector('.popup--btn')
      resetBtn.addEventListener('click',()=>{
        window.location.reload()
      })
    }
    
    // 실패 여부 체크
    else if(wordCheck < word.length && rowArr[boardRow].dataset['row'] === '4'){
      gameOver = true;
      //modal 생성
      let modal = document.querySelector('.popup')
      modal.innerHTML = `
      실패
      <button class="popup--btn">reset</button>
      `
      modal.classList.add('display-flex')

      // btn reload
      const resetBtn = document.querySelector('.popup--btn')
      resetBtn.addEventListener('click',()=>{
        window.location.reload()
      })
    }
  }
}
