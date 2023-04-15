const grid = document.querySelector('.grid');
const text = document.querySelector('.color');
const nextBtn = document.querySelector('.btn button');
const count = document.querySelector('.count');
const result = document.querySelector('.result');
const secends = document.querySelector('.timer');


let totalQuestion = 10;
let time = 15;
let randomColor;
let boxs;
let colors = [];
let questionNumber = 1;
let wrong = 0;
let right = 0;
//When page get loaded
window.addEventListener('load',load);

function load () {
   grid.innerHTML = '';
   count.innerText = `${questionNumber}/${totalQuestion}`;
  for(let i = 0; i < 4; i++) {
    //random Color
    const clr = '#' + Math.floor(Math.random() * 12345678).toString(16);
    const box = document.createElement('div');
    //check And xmark Icons
    box.innerHTML = `
    <i class="fa-solid fa-check"></i>
    <i class="fa-solid fa-xmark"></i>`;
    box.setAttribute('data-clr',clr);
    box.classList = 'box';
    box.style.background = clr;
    grid.append(box);
    
    //adding hex code in color array
    colors.push(clr);
    
  }
  
  //geting all boxs and looping 
  boxs = grid.querySelectorAll('.box');
  boxs.forEach( box => {
    box.addEventListener('click',checkColor);
  });
  
  //randmizing colors
  randomColor = colors.sort( clr =>  Math.random() - 0.5);
  //set color in the DOM
  text.innerText = randomColor[0];
  
  //Disable nest btn if none selected
  nextBtn.disabled = true;
  
}

//matching
function checkColor (e) {
  //remove Disable
  nextBtn.disabled = false;
  
  //dataset of target element
  const hex = e.target.dataset.clr;

  //matching both color 
  if (randomColor[0] === hex) {
    right++;
    e.target.style.border = '2px solid #fff';
    //Display check icon when answer is right
    e.target.children[0].style.display = 'inline'
    e.target.children[0].style.color = '#fff'
    //remove listner to all boxs
    boxs.forEach(box => {
      box.removeEventListener('click', checkColor);
    });
    
  }else {
    wrong++;
    e.target.style.border = '2px solid red';
    //Display xmark icon when answer is wrong
    e.target.children[1].style.display = 'inline'
    e.target.children[1].style.color = 'red'
    //remove listner to all boxs
    boxs.forEach(box => {
      box.removeEventListener('click',checkColor);
   });
   
  };
  
}


nextBtn.addEventListener('click',next);

function next () {
  //restart time
  time = 15;
  
  //increment count
  questionNumber++;
  count.innerText = `${questionNumber}/${totalQuestion}`;
  
  colors = []
  //add listner to all
  boxs.forEach(box => {
    box.addEventListener('click', checkColor);
  });
  //call load function to load next question
  load();
  
  if (questionNumber > totalQuestion) {
    end()
  };
  
}

//end function
function end () {
  //show result after end
  result.style.display = 'flex';
  document.querySelector('.main').style.display = 'none';
  
  //right answer
  result.children[0].innerText = `Right Answer ${right}`;
  //wrong answer
  result.children[1].innerText = `Wrong Answer ${wrong}`;
  
  //listner to restart Btn
  result.querySelector('.restartBtn').addEventListener('click',restart);

}

//restart function
function restart (e) {
  document.querySelector('.result')
  .style.display = 'none';
  document.querySelector('.main')
    .style.display = 'flex';
  questionNumber = 1;
  wrong = 0;
  right = 0;
  load()
}

//timer of 15 secend
setInterval(() => {
  if (time < 0) {
    time = 15;
    questionNumber++;
    load();
  }else {
    secends.innerText = time < 10?  '0'+ time + 's':  time +'s';
    time--;
  };
}, 1000);

//Kshapi