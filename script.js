var playerBlue = "B";
var PlayerGreen = "G";
var currPlayer = playerBlue;
var gameOver = false;
var board;

var rows = 6;
var cols = 7;

var currCols;

window.onload = function(){
    setGame();
}
function setGame(){
    board=[];
    currCols = [5,5,5,5,5,5,5];
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<cols;c++){
            row.push(' ');
            let tile = document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
function setPiece(){
    if(gameOver){
        return;
    }
    
    let coords = this.id.split("-");  //["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r=currCols[c];
    if(r<0){
        return;
    }
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString()+"-"+c.toString());
    if(currPlayer==playerBlue){
        tile.classList.add("blue-piece");
        currPlayer=PlayerGreen;
    }
    else{
        tile.classList.add("green-piece");
        currPlayer=playerBlue;
    }

    r-=1;
    currCols[c]=r;
    checkWinner();
}

function checkWinner(){
    //sliding window

    //horizontally
    for(r=0;r<rows;r++){
        for(c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //vertically
    for(r=0;r<rows-3;r++){
        for(c=0;c<cols;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c] && board[r][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //diagonal check
    //anti-diagonal
    for(r=0;r<rows-3;r++){
        for(c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //diagonal
    for(r=3;r<rows;r++){
        for(c=0;c<cols-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r-1][c+1] && board[r][c] == board[r-2][c+2] && board[r][c] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c){
    let winner = document.getElementById("winner");
    if(board[r][c]==playerBlue){
        winner.innerText=" BLUE WINS!!";
    }
    else{
        winner.innerText=" GREEN WINS!!";
    }

    gameOver=true;
}