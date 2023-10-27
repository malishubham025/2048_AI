var board;
var score = 0;
var rows = 4;
var columns = 4;


function cloneBoard(board) {
    const clone = [];

    for (let r = 0; r < board.length; r++) {
        clone[r] = board[r].slice();
    }

    return clone;
}
function GenerateRandomAndfindavg(originalBoard){
    var arr=[];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (originalBoard[r][c] === 0) {
                // If the tile is empty, set it to 2 and calculate the product sum
                originalBoard[r][c] = 2;

                // Calculate the product sum for the board with the added tile
                const productSum = calculateProductSum(originalBoard);
                arr.push(productSum);
                // You can use or store this productSum as needed

                // Reset the tile to 0 for the next iteration
                originalBoard[r][c] = 0;
            }
        }
    }
    var avg=findAverage(arr);
    return avg;
}

// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
const PERFECT_SNAKE = [
    [2, 2**2, 2**3, 2**4],
    [2**8, 2**7, 2**6, 2**5],
    [2**9, 2**10, 2**11, 2**12],
    [2**16, 2**15, 2**14, 2**13]
];
function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            // score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    
    //add zeroes
    while (row.length < columns) {
        row.push(0);
        
    } //[4, 2, 0, 0]
    return row;
}
function slide2(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}
function findBestScore(scores) {
    let maxScore = -Infinity;

    for (const move in scores) {
        if (scores[move] > maxScore) {
            maxScore = scores[move];
        }
    }

    return maxScore;
}
function calculateProductSum(board){
    var L=cloneBoard(board);
    var R=cloneBoard(board);
    var U=cloneBoard(board);
    var B=cloneBoard(board);
    //UP
    for (let c = 0; c < columns; c++) {
        let row = [U[0][c], U[1][c], U[2][c], U[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            U[r][c] = row[r];
        }
    }
    //left
    for (let r = 0; r < rows; r++) {
        let row = L[r];
        row = slide(row);
        L[r] = row;
    }
    //right
    for (let r = 0; r < rows; r++) {
        let row = R[r];
        row.reverse();
        row = slide(row);
        R[r] = row.reverse();
    }
    //BOTTOM
    for (let c = 0; c < columns; c++) {
        let row = [B[0][c], B[1][c], B[2][c], B[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            B[r][c] = row[r];
        }
    }
    
    var  right=snakeHeuristic(R);
    var  left=snakeHeuristic(L);
    var  up= snakeHeuristic(U);
    var  down= snakeHeuristic(B);
    var maxi=[right,left,up,down];
    var x=-Infinity;
    for(var move in maxi){
        if(x<move){
            x=move;
        }
    }
    return x;
    

}
function findAverage(arr) {
    if (arr.length === 0) {
      return 0; // Handle the case of an empty array to avoid division by zero.
    }
  
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
  
    const average = sum / arr.length;
    return average;
  }
  function slideLeftOne() {
        for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide2(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
  }
function slideLeft() {
    var originalBoard = cloneBoard(board);
    // console.log("hi",originalBoard);
    for (let r = 0; r < rows; r++) {
        let row = originalBoard[r];
        row = slide(row);
        originalBoard[r] = row;
    }
    var avg=GenerateRandomAndfindavg(originalBoard);
    return avg;
}
function slideRightOne(){
        for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide2(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
} 
function slideRight() {
    var originalBoard = cloneBoard(board);
    for (let r = 0; r < rows; r++) {
        let row = originalBoard[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        originalBoard[r] = row.reverse();   //[0, 0, 2, 4];

    }
    var avg=GenerateRandomAndfindavg(originalBoard);
    return avg;

    
}
function SlideUpOne(){
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide2(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
        // for (let r = 0; r < rows; r++){
        //     board[r][c] = row[r];

        // }
    }
}
function slideUp() {
    var originalBoard = cloneBoard(board);
    for (let c = 0; c < columns; c++) {
        let row = [originalBoard[0][c], originalBoard[1][c], originalBoard[2][c], originalBoard[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            originalBoard[r][c] = row[r];

        }
    }
    var avg=GenerateRandomAndfindavg(originalBoard);
    return avg;
}
function slideDownOne(){
        for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide2(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    var originalBoard = cloneBoard(board);
    for (let c = 0; c < columns; c++) {
        let row = [originalBoard[0][c], originalBoard[1][c], originalBoard[2][c], originalBoard[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            originalBoard[r][c] = row[r];
        }
    }
    var avg=GenerateRandomAndfindavg(originalBoard);
    return avg;

}
function isGameOver() {
    // Check if there are empty cells
    if (hasEmptyTile()) {
        return false; // The game is not over
    }

    // Check if there are adjacent cells with the same value
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const currentValue = board[r][c];
            // Check horizontally
            if (c < columns - 1 && board[r][c + 1] === currentValue) {
                return false; // The game is not over
            }
            // Check vertically
            if (r < rows - 1 && board[r + 1][c] === currentValue) {
                return false; // The game is not over
            }
        }
    }

    return true; // The game is over
}

function setTwo() {
    
    if (!hasEmptyTile()) {
        
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}
function hasEmptyTile() {
    // let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
function snakeHeuristic(board) {
    let h = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            h += board[i][j] * PERFECT_SNAKE[i][j];
        }
    }
    return h;
}
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}
function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0,0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
    // console.log("initial board :");
    displayBoard();
}
function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}
function displayBoard() {
    // for (let r = 0; r < rows; r++) {
    //     console.log(board[r].join("\t"));
    // }
    // console.log("Score: " + score);
    document.querySelector("#score").innerHTML=score;
}
// setGame();
var v;
function play() {
    // while(true){
        var a1=slideLeft();
        // console.log(a1);
        var a2=slideRight();
        var a3=slideUp();
        var a4=slideDown();
        // console.log(a1," ",a2," ",a3," ",a4);
        v=setTimeout(() => {
            const max = Math.max(a1, a2, a3, a4);
            if (max === a1) {
                slideLeftOne();
                setTwo();
            } else if (max === a2) {
                slideRightOne();
                setTwo();
            } else if (max === a3) {
                SlideUpOne();
                setTwo();
            } else if (max === a4) {
                slideDownOne();
                setTwo();
            }
    
            displayBoard();
    
            if (!isGameOver()) {
                play(); // Continue the game
            } else {
                alert("Game Over !");
                console.log("Game over!");
                rl.close();
            }
        }, 1000); 
       

}
setGame();
var b=false;
document.querySelector("#score").innerHTML=score;
document.querySelector(".but").addEventListener("click",function(){
    b = !b;
    if (b) {
        alert("started !");
        console.log("started");
        play();
    }
    else{
        alert("Stopped !");
        console.log("stopped");
        clearTimeout(v);
    }
})

