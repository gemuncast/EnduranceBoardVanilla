// Knight chess walk

function isMoveValid(x, y, visited) {
  return x >= 0 && x < 7 && y > 0 && y <= 9 && !visited[x][y];
}

function getValidMoves(x, y, visited) {
  const moves = [
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -2, dy: -1 },
    { dx: 1, dy: 2 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: 2 },
    { dx: -1, dy: -2 },
  ];

  return moves.filter((move) => isMoveValid(x + move.dx, y + move.dy, visited));
}

function randomKnightWalk(movements) {
  const visited = Array.from({ length: 7 }, () => Array(9).fill(false));
  let x = Math.floor(Math.random() * 7);
  let y = Math.floor(Math.random() * 9 + 1);

  visited[y][x] = true;
  const moves = [{ x, y }];

  for (let i = 0; i < movements; i++) {
    // You can adjust the number of moves
    const validMoves = getValidMoves(x, y, visited);
    if (validMoves.length === 0) {
      break;
    }

    const randomMove =
      validMoves[Math.floor(Math.random() * validMoves.length)];
    x = x + randomMove.dx;
    y = y + randomMove.dy;
    visited[x][y] = true;
    moves.push({ x, y });
  }

  return moves;
}

// Example usage:

// Function to print object elements every 3 seconds
function printObjectElements(obj) {
  const keys = Object.keys(obj);
  var rndmPr;
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < keys.length) {
      const key = keys[index];
      const value = obj[key];
      console.log(`${String.fromCharCode(65 + value.x)}${value.y}`);
      rndmPr = String.fromCharCode(65 + value.x) + value.y;
      clearCircle();
      randomPair(`${String.fromCharCode(65 + value.x)}${value.y}`);

      index++;
    } else {
      clearInterval(intervalId); // Stop the interval when all elements are printed
    }
  }, 3000);
}

function clearCircle() {
  elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    element.classList.remove("circle");
  });
}

function randomPair(rndmPr) {
  document.getElementById("move").textContent = rndmPr;

  tellMove.text = rndmPr;

  window.speechSynthesis.speak(tellMove);

  //add circle

  document.getElementById(`${rndmPr}`).classList.add("circle");
}

function climb() {
  const randomWalk = randomKnightWalk(
    document.querySelector('input[name="q1"]:checked').value
  );

  console.log(randomWalk);
  printObjectElements(randomWalk);
}
