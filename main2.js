let result = Array.from(document.querySelectorAll('.board__text'))
// console.log(result[0])
let buttons= Array.from(document.querySelectorAll('.game-keyboard .key-btn'))
// let buttons = document.querySelectorAll('.game-keyboard .key-btn')
// let btnArr = [...buttons]
//     console.log(btnArr)
const alpahbet = 'abcdefghijklmnopqrstuvwxyz'
const chosenWord = 'apple'
// console.log(chosenWord[0])
// console.log(chosenWord[1])
// console.log(chosenWord[2])
const wordsSubmitted = []

let gameOver = false;

let currentWord = ''; // 현재 입력하고 있는 키보드

buttons.map( btn => {
  btn.addEventListener('click', e => {
    // console.log(e)
    // console.log(e.target)
    // console.log(e.target.innerText)
    // console.log(wordsSubmitted)
    // console.log(currentWord)
    const {target} = e
    if(currentWord.length < 5 && 
      alpahbet.includes(target.innerText)){
        updateWord(target.innerText);
    } 
    else if( target.innerText === 'Enter'){
      wordsSubmitted.push(currentWord)
      currentWord = ''
      console.log(wordsSubmitted)
      if(wordsSubmitted[0] === chosenWord){
        console.log('victory')
      }
    }
    // const pushText = e.target.innerText
    
    // if(wordsSubmitted.length >= 5){
    //   console.log(wordsSubmitted)
    //   return
    // }
    // else{
    //   console.log(wordsSubmitted)
    //   wordsSubmitted.push(pushText)
    //   result[0].innerText = wordsSubmitted[0]
    //   result[1].innerText = wordsSubmitted[1]
    //   result[2].innerText = wordsSubmitted[2]
    //   result[3].innerText = wordsSubmitted[3]
    //   result[4].innerText = wordsSubmitted[4]
    //   currentWord = currentWord + pushText
    //   console.log(currentWord)
    // }
  })
})

// else if(wordsSubmitted.length = 1 ){
//   wordsSubmitted.push(pushText)
//   result[0].innerText = wordsSubmitted[0]
// }



const whichCell = () => {
  const row = wordsSubmitted.length
  const cell = currentWord.length
  return [cell, row]
}



const updateWord = (letter) => {
  const [cell, row] = whichCell()
  const rowText = Array.from( document.querySelectorAll('.game-board')).find(_row => _row.dataset['row'] === `${row}`)
  // console.log(rowText)
  const cellText = Array.from(rowText.querySelectorAll('.board__text')).find(_cell => _cell.dataset['cell'] === `${cell}` )
  // console.log(cellText)
  cellText.innerHTML = letter
  currentWord = currentWord + letter;
  // console.log(rowText)
  console.log()
}

document.addEventListener('keydown',e => {
  if(gameOver) return;
  const {key} = e; // event에서 key값 구조분해
  if(currentWord.length < 5 && alpahbet.includes(key.toLowerCase())){
    updateWord(key);
    // console.log(wordsSubmitted)
    // console.log(currentWord.length)
  } 
  else if(key === 'Enter'){
    wordsSubmitted.push(currentWord)
    // console.log(wordsSubmitted)
    // console.log(currentWord.length)
    updateGame()
    if(wordsSubmitted[0] === chosenWord){
      console.log('victory')
      
    }
  }
  
  function updateGame(){
    let correct = 0;
    for(let i=0; i<currentWord.length; i++){
      let answer = result[i].innerText;
      console.log(result[i])
      console.log(answer)
      if(chosenWord[i] === answer.toLowerCase()){
        result[i].classList.add('correct');
        correct ++;
      }
      else if(chosenWord.includes(answer.toLowerCase())){
        result[i].classList.add('present');
      }
      else {
        result[i].classList.add('absent')
      }
    }
  }
  // else if( key === 'Enter'){
  //   // checkforLength();
  //   // checkWordExists();
  //   if(isCorrectLength){
      
  //     if(isWord){
  //       wordsSubmitted.push(currentWord);
  //       currentWord = ''
        
  //       if (currentWord === chosenWord){
  //         // victory()
  //       }
  //       else if (wordsSubmitted.length === 5){
  //         // gameOver()
  //       }
  //     }
      
  //   }
  // }
})