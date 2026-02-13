let turn = true;
let numTurns = 0;
let grid = [["","",""],["","",""],["","",""]];
let winner = "";
let xScore = 0;
let oScore = 0;
let rounds = 0;

function playerWon(winner) {
    if (winner == "x") {
        xScore += 1;
    }

    else if (winner == "o") {
        oScore += 1;
    }

    window.alert(winner + " won. The score is X: " + JSON.stringify(xScore) + " O: " + JSON.stringify(oScore));

    for (i=0;i<9;i++) {
        document.body.children[i].innerHTML = "";
    }
    
    grid = [["","",""],["","",""],["","",""]];
    numTurns = 0;
    turn = true
}

function buttonClicked(button) {

    numTurns += 1

    if (turn && button.innerHTML == "") {
        button.innerHTML = "X";
        grid[Number(button.id[0])][Number(button.id[1])] = "X";
        turn = !turn;
    }

    else if (button.innerHTML == "") {
        button.innerHTML = "O";
        grid[Number(button.id[0])][Number(button.id[1])] = "O";
        turn = !turn;
    }

    if (JSON.stringify(grid[0]) == JSON.stringify(["X","X","X"]) || JSON.stringify(grid[1]) == JSON.stringify(["X","X","X"])|| grid[2] == JSON.stringify(["X","X","X"])) {
        playerWon("x")
    }

    else if (grid[0][0] == "X" && grid[1][0] == "X" && grid[2][0] == "X" || grid[0][1] == "X" && grid[1][1] == "X" && grid[2][1] == "X" || grid[0][2] == "X" && grid[1][2] == "X" && grid[2][2] == "X") {
        playerWon("x")
    }

    else if (grid[0][0] == "X" && grid[1][1] == "X" && grid[2][2] == "X" || grid[0][2] == "X" && grid[1][1] == "X" && grid[2][0] == "X") {
        playerWon("x")
    }

    else if (JSON.stringify(grid[0]) == JSON.stringify(["O","O","O"]) || JSON.stringify(grid[1]) == JSON.stringify(["O","O","O"])|| grid[2] == JSON.stringify(["O","O","O"])) {
        playerWon("o")
    }

    else if (grid[0][0] == "O" && grid[1][0] == "O" && grid[2][0] == "O" || grid[0][1] == "O" && grid[1][1] == "O" && grid[2][1] == "O" || grid[0][2] == "O" && grid[1][2] == "O" && grid[2][2] == "O") {
        playerWon("o")
    }

    else if (grid[0][0] == "O" && grid[1][1] == "O" && grid[2][2] == "O" || grid[0][2] == "O" && grid[1][1] == "O" && grid[2][0] == "O") {
        playerWon("o")
    }

    else if (numTurns == 9) {
        playerWon("nobody")
    }

    
    
}