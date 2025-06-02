let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let player1Name = "O";
let player2Name = "X";

document.getElementById('start-game').addEventListener('click', function() {

    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;

    if (player1Name === "" || player2Name === "") {
        alert("Please enter names for both players!");
        return;
    }

    document.getElementById('setup-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';

});



const winningPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>  {
    box.addEventListener("click", () => {
       if(turnO){
        box.innerText="O";
        box.classList.add('o');
        turnO=false;
       }
       else{
        box.innerText="X";
        box.classList.add('x')
        turnO=true;
       }
       box.disabled = true;
       count++;

       let isWinner = checkWinner();
   
       if (count === 9 && !isWinner) {
         gameDraw();
       }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};
  

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
   for(let box of boxes)
   {
    box.disabled = false;
    box.innerText = "";
   }
};
const showWinner = (winner)=>{
    msg.innerText = "Congratulations, Winner is " + winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winningPatterns){
       let pos1Val = boxes[pattern[0]].innerText;
       let pos2val = boxes[pattern[1]].innerText;
       let pos3val = boxes[pattern[2]].innerText;
       if(pos1Val!="" && pos2val!="" && pos3val!="")
       {
        if(pos1Val === pos2val && pos2val === pos3val)
        {
            if(player1Name === pos1Val){
                showWinner(player1Name);
            }else{
                showWinner(player2Name)
            }
            return true;
        }
       }
    }
    return false
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);
