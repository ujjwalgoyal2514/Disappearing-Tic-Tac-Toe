var color;
var WHITE = -1;
var NOT_CHOSEN = -2;
var playerRed;
var playerBlue;
var WINNINGCOMBO = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var turn = 0;

window.onload = function () {
    document.getElementById("game-container").style.display = "none";
}

function startGame() {
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;

    document.getElementById("form-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    color = new Array();
    for (var i = 0; i < 9; ++i) {
        color[i] = WHITE;
    }

    playerRed = new Array();
    for (var i = 0; i < 3; ++i) {
        playerRed[i] = NOT_CHOSEN;
    }

    playerBlue = new Array();
    for (var i = 0; i < 3; ++i) {
        playerBlue[i] = NOT_CHOSEN;
    }

    document.getElementById("turn-indicator").innerText = player1Name + "'s turn";
}

function drawSymbol(canvas, symbol) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "100px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";

    if (symbol === 'X') {
        context.fillStyle = "#FF4500";
        context.shadowColor = "rgba(0, 0, 0, 0.5)";
        context.shadowBlur = 5;
        context.fillText("X", canvas.width / 2, canvas.height / 2);
    } else if (symbol === 'O') {
        context.fillStyle = "#1E90FF";
        context.shadowColor = "rgba(0, 0, 0, 0.5)";
        context.shadowBlur = 5;
        context.fillText("O", canvas.width / 2, canvas.height / 2);
    }
}

function canvasClicked(canvasNumber) {
    var clickedCanvas = document.getElementById("canvas" + canvasNumber);
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;

    if (color[canvasNumber] == WHITE) {
        var disappearingCNum;
        var disappearingCanvas;

        if (turn % 2 == 0) {
            var turn0 = turn / 2;

            disappearingCNum = playerRed[turn0 % 3];
            if (disappearingCNum != NOT_CHOSEN) {
                disappearingCanvas = document.getElementById("canvas" + disappearingCNum);
                disappearingCanvas.classList.add('fade-out');
                setTimeout(function () {
                    var disappearingContext = disappearingCanvas.getContext("2d");
                    disappearingContext.clearRect(0, 0, disappearingCanvas.width, disappearingCanvas.height);
                    disappearingCanvas.classList.remove('fade-out');
                    color[disappearingCNum] = WHITE;
                }, 1000); // Delay in milliseconds
            }

            color[canvasNumber] = 0;
            playerRed[turn0 % 3] = canvasNumber;
            drawSymbol(clickedCanvas, 'X');
            document.getElementById("turn-indicator").innerText = player2Name + "'s turn";
        } else {
            var turn1 = (turn - 1) / 2;

            disappearingCNum = playerBlue[turn1 % 3];
            if (disappearingCNum != NOT_CHOSEN) {
                disappearingCanvas = document.getElementById("canvas" + disappearingCNum);
                disappearingCanvas.classList.add('fade-out');
                setTimeout(function () {
                    var disappearingContext = disappearingCanvas.getContext("2d");
                    disappearingContext.clearRect(0, 0, disappearingCanvas.width, disappearingCanvas.height);
                    disappearingCanvas.classList.remove('fade-out');
                    color[disappearingCNum] = WHITE;
                }, 1000); // Delay in milliseconds
            }

            color[canvasNumber] = 1;
            playerBlue[turn1 % 3] = canvasNumber;
            drawSymbol(clickedCanvas, 'O');
            document.getElementById("turn-indicator").innerText = player1Name + "'s turn";
        }
        ++turn;
        checkForWinners(color[canvasNumber]);
    } else {
        alert("That space is already taken.");
    }
}

function checkForWinners(playerNumber) {
    var winnerName;
    if (playerNumber === 0) {
        winnerName = document.getElementById("player1").value;
    } else {
        winnerName = document.getElementById("player2").value;
    }

    for (var i = 0; i < WINNINGCOMBO.length; ++i) {
        if (color[WINNINGCOMBO[i][0]] == playerNumber
            && color[WINNINGCOMBO[i][1]] == playerNumber
            && color[WINNINGCOMBO[i][2]] == playerNumber) {
            alert(winnerName + " won! 😜😝😎");
            location.reload();
        }
    }
}

function restart() {
    turn = 0;
    color = new Array();
    for (var i = 0; i < 9; ++i) {
        color[i] = WHITE;
    }
    playerRed = new Array();
    for (var i = 0; i < 3; ++i) {
        playerRed[i] = NOT_CHOSEN;
    }
    playerBlue = new Array();
    for (var i = 0; i < 3; ++i) {
        playerBlue[i] = NOT_CHOSEN;
    }

    for (var i = 0; i < 9; ++i) {
        var canvas = document.getElementById("canvas" + i);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var player1Name = document.getElementById("player1").value;
    document.getElementById("turn-indicator").innerText = player1Name + "'s turn";

    return false;
}

function goHome() {
    turn = 0;
    color = new Array();
    for (var i = 0; i < 9; ++i) {
        color[i] = WHITE;
    }
    playerRed = new Array();
    for (var i = 0; i < 3; ++i) {
        playerRed[i] = NOT_CHOSEN;
    }
    playerBlue = new Array();
    for (var i = 0; i < 3; ++i) {
        playerBlue[i] = NOT_CHOSEN;
    }

    for (var i = 0; i < 9; ++i) {
        var canvas = document.getElementById("canvas" + i);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    document.getElementById("game-container").style.display = "none";
    document.getElementById("form-container").style.display = "block";

    document.getElementById("turn-indicator").innerText = "";
}
