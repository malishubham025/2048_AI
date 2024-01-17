var board;
var score = 0;
var rows = 4;
var columns = 4;


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
          //const randomNumber = Math.random();
          
              board[r][c] = 2;
            
          

          found = true;
      }
  }
}
function filterZero(row){
  return row.filter(num => num != 0); //create new array of all nums != 0
}
function displayBoard() {
  for (let r = 0; r < rows; r++) {
      console.log(board[r].join("\t"));
  }
  console.log("Score: " + score);
}
function slide2(row) {
  //[0, 2, 2, 2] 
  row = filterZero(row); //[2, 2, 2]
  for (let i = 0; i < row.length-1; i++){
      if (row[i] == row[i+1]) {
          row[i] *= 2;
          row[i+1] = 0;
          
      }
  } //[4, 0, 2]
  row = filterZero(row); //[4, 2]
  //add zeroes
  while (row.length < columns) {
      row.push(0);
  } //[4, 2, 0, 0]
  return row;
}
function slide(row) {
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
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}
function slideLeft() {
  for (let r = 0; r < rows; r++) {
  let row = board[r];
  row = slide(row);
  board[r] = row;
}
}
function slideRight(){
  for (let r = 0; r < rows; r++) {
  let row = board[r];         //[0, 2, 2, 2]
  row.reverse();              //[2, 2, 2, 0]
  row = slide(row)            //[4, 2, 0, 0]
  board[r] = row.reverse();   //[0, 0, 2, 4];

}
} 
function SlideUp(){
  for (let c = 0; c < columns; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row = slide(row);
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < rows; r++){
          board[r][c] = row[r];

      }
  }
}
function slideDown(){
  for (let c = 0; c < columns; c++) {
  let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
  row.reverse();
  row = slide(row);
  row.reverse();
  // board[0][c] = row[0];
  // board[1][c] = row[1];
  // board[2][c] = row[2];
  // board[3][c] = row[3];
  for (let r = 0; r < rows; r++){
      board[r][c] = row[r];
  }
}
}

function slideLeftOne(board) {
  for (let r = 0; r < rows; r++) {
  let row = board[r];
  row = slide2(row);
  board[r] = row;
}
}
function slideRightOne(board){
  for (let r = 0; r < rows; r++) {
  let row = board[r];         //[0, 2, 2, 2]
  row.reverse();              //[2, 2, 2, 0]
  row = slide2(row)            //[4, 2, 0, 0]
  board[r] = row.reverse();   //[0, 0, 2, 4];

}
} 
function slideUpOne(board){
  for (let c = 0; c < columns; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row = slide2(row);
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < rows; r++){
          board[r][c] = row[r];

      }
  }
}
function slideDownOne(board){
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
  }
}
}
// Rest of your functions as provided

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    setTwo();
    setTwo();
    console.log("initial board:");
    displayBoard();
}
function GenerateRandomAndfindavg(originalBoard, depth) {
  if (depth === 0) {
      // Base case: return the heuristic value of the current state
      return snakeHeuristic(originalBoard);
  }

  var avg = 0;
  var count = 0;

  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
          if (originalBoard[r][c] === 0) {
              originalBoard[r][c] = 2;

              let L = cloneBoard(originalBoard);
              let R = cloneBoard(originalBoard);
              let T = cloneBoard(originalBoard);
              let B = cloneBoard(originalBoard);

              slideLeftOne(L);
              slideRightOne(R);
              slideUpOne(T);
              slideDownOne(B);

              // Recursively calculate the average heuristic for each direction
              let avgL = GenerateRandomAndfindavg(L, depth - 1);
              let avgR = GenerateRandomAndfindavg(R, depth - 1);
              let avgT = GenerateRandomAndfindavg(T, depth - 1);
              let avgB = GenerateRandomAndfindavg(B, depth - 1);

              // Calculate the maximum of the four directions
              const max = Math.max(avgL, avgR, avgT, avgB);
              avg += max;
              count++;

              originalBoard[r][c] = 0;
          }
      }
  }

  return avg / count;
}

const PERFECT_SNAKE = [
  [2**2, 2**2, 2**3, 2**4],
  [2**8, 2**7, 2**6, 2**5],
  [2**9, 2**10, 2**11, 2**12],
  [2**16, 2**15, 2**14, 2**13]
];
function snakeHeuristic(board) {
  let h = 0;
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          h += board[i][j] * PERFECT_SNAKE[i][j];
      }
  }
  return h;
}
// You will need a cloneBoard function to create a copy of the board
function cloneBoard(board) {
  return board.map(row => [...row]);
}

// Make sure you have the slideLeftOne, slideRightOne, slideUpOne, and slideDownOne functions defined
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
function cango(b1,b2){
    for(let i=0;i<rows;i++){
      for(let j=0;j<columns;j++){
          if(b1[i][j]!=b2[i][j]){
            return true;

          }

      }
    }
    return false;
}
function ex(depth, board) {
    if (depth <= 0) {
        return;
    }

    var L = cloneBoard(board);
    var R = cloneBoard(board);
    var U = cloneBoard(board);
    var D = cloneBoard(board);

    slideLeftOne(L);
    slideRightOne(R);
    slideUpOne(U);
    slideDownOne(D);
    //console.log(U);
    // console.log(cango(board,U));
    let m1=0,m2=0,m3=0,m4=0;
    if(cango(board,L)){
     m1 = GenerateRandomAndfindavg(L, depth - 1);
    }
    if(cango(board,R)){
      m2 = GenerateRandomAndfindavg(R, depth - 1);
    }
    if(cango(board,U)){
     m3 = GenerateRandomAndfindavg(U, depth - 1);

    }
    if(cango(board,D)){
     m4 = GenerateRandomAndfindavg(D, depth - 1);
    }
    

    const max = Math.max(m1, m2, m3, m4);
    
    if (max === m1) {
        slideLeft();
        setTwo();
    } else if (max === m2) {
        slideRight();
        setTwo();
    } else if (max === m3) {
        SlideUp();
        setTwo();
    } else if (max === m4) {
        slideDown();
        setTwo();
    }

    displayBoard();
    if(CheckWon(board)){
        console.log("YOU WON !");
    }
    else if (!isGameOver()) {
        setTimeout(() => ex(depth, board), 10); // Continue the game
    } else {
        console.log("Game over!");
    }
}

function CheckWon(board){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            if(board[i][j]==2048){
                return true;
            }
        }
    }
    return false;

}

setGame();
ex(2, board);
