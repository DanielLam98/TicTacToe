const gameBoard = (() => {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  //sets inital player marker
  let playerMarker = "X";
  //resets gameboard array
  const resetBoard = () => {
    gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
  // grabs gameboard array and dynamically creates a table.
  const showBoard = () => {
    let i = 0;
    const gameBoardID = document.querySelector("#gameBoard");
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    gameboard.forEach((rowData) => {
      let row = document.createElement("tr");
      rowData.forEach((cellData) => {
        let cell = document.createElement("td");
        //assigns dataset keys for each td
        cell.dataset.key = i++;
        cell.textContent = cellData;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    gameBoardID.appendChild(table);
  };
  const startGame = () => {
    const td = document.querySelectorAll("td");
    //assigns values to the gameboard array
    td.forEach((element) =>
      element.addEventListener("click", function (e) {
        if (element.textContent == "") {
          element.textContent = playerMarker;
          let datakey = element.dataset.key;
          if (datakey > 2 && datakey < 6) {
            gameboard[1][datakey - 3] = playerMarker;
          } else if (datakey > 5) {
            gameboard[2][datakey - 6] = playerMarker;
          } else gameboard[0][datakey] = playerMarker;
          //returns true if there is a winner and grabs the names to display to user.
          playerMarker = setPlayer(playerMarker);
          if (checkWinner("X") == true) {
            announceWinner(document.querySelector("#p1").textContent);
          }
          if (checkWinner("O") == true) {
            announceWinner(document.querySelector("#p2").textContent);
          }
        }
        if (isTie() == true) {
          TieGame();
        }
      })
    );
    //checks if it is a tie
    function isTie() {
      const td = document.querySelectorAll("td");
      let returnValue = true;
      for (let value of td) {
        if (value.textContent == "") returnValue = false;
      }
      return returnValue;
    }
    //result is tie so it displays the tie screen
    function TieGame() {
      displayWinner = document.querySelector("#displayWinner");
      winnerScreenWrapper = document.querySelector("#winnerScreenWrapper");
      bodyWrapper = document.querySelector(".gameWrapper");
      bodyWrapper.classList.add("bodyContainer");
      displayWinner.textContent = `Tie Game, Play Again Player 1 and Player 2?`;
      winnerScreenWrapper.style.display = "block";
      winnerScreenWrapper.style.pointerEvents = "auto";
      displayController.playAgain();
    }
    //if a player wins, this will announce the winner.
    function announceWinner(player) {
      displayWinner = document.querySelector("#displayWinner");
      winnerScreenWrapper = document.querySelector("#winnerScreenWrapper");
      bodyWrapper = document.querySelector(".gameWrapper");
      bodyWrapper.classList.add("bodyContainer");
      displayWinner.textContent = `congrats ${player}, you are the winner!`;
      winnerScreenWrapper.style.display = "block";
      winnerScreenWrapper.style.pointerEvents = "auto";
      playerMarker = "X";
      displayController.playAgain();
    }
  };
  //checks horizontally
  function checkWinner(marker) {
    const allEqual = (arr) => arr.every((v) => v === marker);
    for (let i = 0; i < 3; i++) {
      if (allEqual(gameboard[i])) {
        return true;
      }
    }
    //checks vertically
    for (let i = 0; i < 3; i++) {
      if (
        gameboard[0][i] == gameboard[1][i] &&
        gameboard[1][i] == gameboard[2][i] &&
        gameboard[0][i] == marker
      ) {
        return true;
      }
    }
    //checks diagonally
    if (
      (gameboard[0][0] == gameboard[1][1] &&
        gameboard[1][1] == gameboard[2][2] &&
        gameboard[0][0] == marker) ||
      (gameboard[0][2] == gameboard[1][1] &&
        gameboard[1][1] == gameboard[2][0] &&
        gameboard[0][2])
    ) {
      return true;
    }
    return false;
  }
  function setPlayer(playerMarker) {
    if (playerMarker == "X") {
      return "O";
    } else if (playerMarker == "O") {
      return "X";
    }
  }
  showBoard();
  return { showBoard: showBoard, startGame: startGame, resetBoard: resetBoard };
})();

const displayController = (() => {
  const playerSubmit = () => {
    const playBtn = document.querySelector("#playBtn");
    playBtn.addEventListener("click", addPlayers);
  };
  const addPlayers = () => {
    const player1input = document.querySelector("#playerOne").value;
    const player2input = document.querySelector("#playerTwo").value;
    if (player1input != "" && player2input != "") {
      const player1 = player(player1input, "X");
      const player2 = player(player2input, "O");
      const bodyWrapper = document.querySelector(".bodyContainer");
      const popupWrapper = document.querySelector("#popupWrapper");
      popupWrapper.style.pointerEvents = "none";
      popupWrapper.style.display = "none";
      bodyWrapper.classList.remove("bodyContainer");
      displayPlayerNames(player1.getName(), player2.getName());
      gameBoard.startGame();
    }
  };
  function displayPlayerNames(p1Name, p2Name) {
    const p1 = document.querySelector("#p1");
    const p2 = document.querySelector("#p2");
    p1.textContent = p1Name;
    p2.textContent = p2Name;
  }
  const playAgain = () => {
    playAgainBtn = document.querySelector("#playAgainBtn");
    playAgainBtn.addEventListener("click", (e) => {
      gameBoard.resetBoard();
      const bodyWrapper = document.querySelector(".gameWrapper");
      const winnerScreenWrapper = document.querySelector(
        "#winnerScreenWrapper"
      );
      winnerScreenWrapper.style.pointerEvents = "none";
      winnerScreenWrapper.style.display = "none";
      bodyWrapper.classList.remove("bodyContainer");
      console.log("called");
      const table = document.querySelectorAll("td");
      table.forEach((element) => (element.textContent = ""));
      gameBoard.startGame();
    });
  };
  playerSubmit();
  return { playAgain: playAgain };
})();

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};
