//Winning combos
/*012
    345
    678
    036
    147
    258 
    048
    246  */

    const gameFlow = (function () {
        let boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let logMark = function (pos) {
          if (boardArray[pos] != 0) return;
          boardArray[pos] = "x";
          if (checkWin(pos)) {
            gameComplete(true);
            updateBoard();
            return;
          }
          //Computer turn
          let compChoice = computer.random(boardArray);
          boardArray[compChoice] = "o";
          updateBoard();
          if (checkWin(compChoice)) gameComplete(false);
        };
        let checkWin = function (pos) {
          switch (pos) {
            case 0:
              return (
                lineCheck.line1(boardArray) ||
                lineCheck.line4(boardArray) ||
                lineCheck.line7(boardArray)
              );
            case 1:
              return lineCheck.line1(boardArray) || lineCheck.line5(boardArray);
            case 2:
              return (
                lineCheck.line1(boardArray) ||
                lineCheck.line6(boardArray) ||
                lineCheck.line8(boardArray)
              );
            case 3:
              return lineCheck.line2(boardArray) || lineCheck.line4(boardArray);
            case 4:
              return (
                lineCheck.line2(boardArray) ||
                lineCheck.line5(boardArray) ||
                lineCheck.line7(boardArray) ||
                lineCheck.line8(boardArray)
              );
            case 5:
              return lineCheck.line2(boardArray) || lineCheck.line6(boardArray);
            case 6:
              return (
                lineCheck.line3(boardArray) ||
                lineCheck.line4(boardArray) ||
                lineCheck.line8(boardArray)
              );
            case 7:
              return lineCheck.line3(boardArray) || lineCheck.line5(boardArray);
            case 8:
              return (
                lineCheck.line3(boardArray) ||
                lineCheck.line6(boardArray) ||
                lineCheck.line7(boardArray)
              );
          }
        };
      
        let updateBoard = function () {
          for (let i = 0; i < 9; i++) {
            div = document.getElementById(i);
            if (boardArray[i] == "x") div.firstChild.innerText = "close";
            if (boardArray[i] == "o")
              div.firstChild.innerText = "radio_button_unchecked";
          }
        };
      
        let resetBoard = function () {
          boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          document.querySelector(".winner").innerText = "";
        };
      
        let gameComplete = function (playerWin) {
          noListeners = document.querySelector(".squares");
          noListeners.outerHTML = noListeners.outerHTML;
          if (playerWin)
            document.querySelector(".winner").innerText =
              "You Win!  Press restart to play again";
          else
            document.querySelector(".winner").innerText =
              "Better luck next time! Press restart to play again";
        };
        return { logMark, resetBoard };
      })();
      
      /*Check for win on a given line.  
      Line wins are numbered:
      line1 = row1
      ...
      line4 = col1
      ...
      with line 7 and 8 being the two potential diagonal wins*/
      const lineCheck = (function () {
        const line1 = function (arr) {
          return arr[0] == arr[1] && arr[1] == arr[2];
        };
        const line2 = function (arr) {
          return arr[3] == arr[4] && arr[4] == arr[5];
        };
        const line3 = function (arr) {
          return arr[6] == arr[7] && arr[7] == arr[8];
        };
        const line4 = function (arr) {
          return arr[0] == arr[3] && arr[3] == arr[6];
        };
        const line5 = function (arr) {
          return arr[1] == arr[4] && arr[4] == arr[7];
        };
        const line6 = function (arr) {
          return arr[2] == arr[5] && arr[5] == arr[8];
        };
        const line7 = function (arr) {
          return arr[0] == arr[4] && arr[4] == arr[8];
        };
        const line8 = function (arr) {
          return arr[2] == arr[4] && arr[4] == arr[6];
        };
        //Winning combos
        /*012
          345
          678
          036
          147
          258 
          048
          246  */
        return { line1, line2, line3, line4, line5, line6, line7, line8 };
      })();
      
      const gameBoard = (function () {
        const generateTiles = function () {
          gameFlow.resetBoard();
          const board = document.querySelector(".squares");
          board.innerHTML = "";
          const but = document.getElementById("main-button");
          but.innerText = "Restart";
          for (let i = 0; i < 9; i++) {
            div = document.createElement("div");
            div.classList.add("tile");
            div.id = i;
            div.addEventListener("mouseup", function () {
              gameFlow.logMark(i);
            });
            child = document.createElement("div");
            child.classList.add("material-symbols-outlined");
            div.appendChild(child);
            document.querySelector(".squares").appendChild(div);
          }
        };
        return { generateTiles };
      })();
      
      const computer = (function () {
        //Function for the computer to select a random square
        const random = function (arr) {
          let zeroCount = 0;
          //See how many unplayed squares in boardArray
          for (i in arr) {
            if (arr[i] == 0) zeroCount++;
          }
          //Select a random empty square
          pos = Math.floor(Math.random() * zeroCount);
          //Return location computer will play
          for (i in arr) {
            if (arr[i] == 0) {
              if (arr[i] == 0) {
                if (pos == 0) return parseInt(i);
                pos--;
              }
            }
          }
        };
        return { random };
      })();
      /*
      Unused pubsub stuff that was going to be used for multiplayer functionality
      
      var pubsub = {
        events: {},
        subscribe: function (eventName, fn) {
          this.events[eventName] = this.events[eventName] || [];
          this.events[eventName].push(fn);
        },
        unsubscribe: function (eventName, fn) {
          if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
              if (this.events[eventName][i] == fn) {
                this.events[eventName].splice(i, 1);
                break;
              }
            }
          }
        },
        publish: function (eventName, data) {
          if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
              fn(data);
            });
          }
        }
      }; */
      