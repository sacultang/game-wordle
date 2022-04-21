let buttons= Array.from(document.querySelectorAll('.game-keyboard .key-btn'))
// console.log(buttons)
const delBtn = document.querySelector('.del')
// console.log(delBtn)
const enterBtn = document.querySelector('.enter')

let word = 'APPLE' // 정답 단어

let gameOver = false;

let boardRow = 0; // 보드 줄 초기값
let tileNum = 0; // 보드 칸 초기값

// // 현재 줄의 데이터 값
let rowArr = document.querySelectorAll('.game-board')
// console.log(rowArr[0].children[3])
// 현재 줄 안의 칸 데이터 값
// let tileArr = Array.from(document.querySelectorAll('.board__text'))
// console.log()


/* 버튼 이벤트 */
buttons.map(e => {
  e.addEventListener('click',(btn)=>{
    // console.log(btn.target)
    let btnTarget = btn.target
    // console.log(btnTarget)
    let btnText = btn.target.textContent
    let upperCaseBtn = btnText.toUpperCase()
    // console.log(upperCaseBtn)
    if(btnTarget !== delBtn && btnTarget !== enterBtn){
      if(tileNum < word.length){
        let currTile = rowArr[boardRow].children[tileNum] 
        if(currTile.textContent === ''){
          currTile.textContent = upperCaseBtn
          tileNum += 1;
        }
      }
    }
    else if (btnTarget === delBtn){
      if(tileNum > 0 && tileNum <= word.length){
        tileNum -=1;
        console.log(tileNum)
      }
      let currTile = rowArr[boardRow].children[tileNum]
      currTile.textContent = ''
    } 
    else if (btnTarget === enterBtn && tileNum === word.length){
      gameCheck()
      boardRow += 1;
      tileNum = 0;
      // let currRow = rowArr[boardRow] 
      
    }
  })
})




/* 키보드 이벤트 */
document.addEventListener('keyup', e =>{
  // console.log(e.key)
  // console.log(e.code)
  // console.log(e.code[3])
  // console.log(e.key.toUpperCase())
  
  if(gameOver) return; // gameover 시 리턴


  if('a' <= e.key && 'z' >= e.key){ // keycode 범위 지정해서 a-z까지만 누를수있게 지정한다
    // console.log(e.key)
    if(tileNum < word.length){ // 보드칸의 넘버가 단어 길이보다 작을 경우
      let currTile = rowArr[boardRow].children[tileNum] // 현재 타일 
      if(currTile.textContent === ''){
        currTile.textContent = e.key.toUpperCase()
        tileNum += 1;
        // console.log(currTile)
      }
      // console.log(tileNum)
    }
    // console.log(tileNum)
  }
  else if('Backspace' === e.key ){
    if(tileNum > 0 ){
      tileNum -= 1;
      // console.log(tileNum)
      let currTile = rowArr[boardRow].children[tileNum]
      currTile.textContent = ''
    }
    
  }
  else if('Enter' === e.key && tileNum === word.length){
    gameCheck()
    boardRow += 1;
    tileNum = 0;
    // let currRow = rowArr[boardRow] 
    // console.log(currRow)
  }
})

// console.log(word[0])
function gameCheck(){
  let wordCheck = 0;
  
  for(let i = 0; i < word.length; i++){
    let currTile = rowArr[boardRow].children[i]
    let answer = currTile.textContent;
    // console.log(answer)
    if(word[i] === answer){
      // console.log('good')
      currTile.classList.add('good');
      wordCheck += 1;
      // console.log(wordCheck)
    }
    else if(word.includes(answer)){
      // console.log('some good')
      currTile.classList.add('littlegood');
    }
    else {
      // console.log('bad')
      currTile.classList.add('bad');
    }
    console.log(rowArr[boardRow].dataset.row)
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
