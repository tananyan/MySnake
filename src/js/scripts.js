document.addEventListener("DOMContentLoaded", function () {
  const cvs = document.querySelector("#game"),
    ctx = cvs.getContext("2d");

  // Исходники
  const groundImg = new Image();
  groundImg.src = "../img/Background.svg";

  const foodImg = new Image();
  foodImg.src = "../img/Pizza.svg";

  const foodBigImg = new Image();
  foodBigImg.src = "../img/Pizzabig.svg";

  let box = 25,
    score = 0,
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20 + 2) * box,
    },
    snake = [];

  snake[0] = {
    x: 9 * box,
    y: 11 * box,
  };

  let dir;
  document.addEventListener("keydown", direction);
  function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
      dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
      dir = "up";
    } else if (event.keyCode == 40 && dir != "up") {
      dir = "down";
    } else if (event.keyCode == 39 && dir != "left") {
      dir = "right";
    }
  }

  function eatTail(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x == head.x && array[i].y == head.y) {
        clearInterval(startGame);
        alert(`Вы слопали пицц: ${score} \nпопробуйте еще раз!`);
      }
    }
  }

  function toDraw() {
    ctx.drawImage(groundImg, 0, 0);
    ctx.drawImage(foodBigImg, -8, -9);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i != 0 ? "#007" : "#000";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "50px Consolas";
    ctx.fillText(score, box * 2, box * 1.7, box * 17);

    let snakeX = snake[0].x,
      snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20 + 2) * box,
      };
    } else {
      snake.pop();
    }

    if (
      snakeX < 0 ||
      snakeX > box * 19 ||
      snakeY < box * 2 ||
      snakeY > box * 20 + box
    ) {
      clearInterval(startGame);
      alert(`Вы слопали пицц: ${score} \nпопробуйте еще раз!`);
    }

    if (dir == "left") {
      snakeX -= box;
    } else if (dir == "up") {
      snakeY -= box;
    } else if (dir == "down") {
      snakeY += box;
    } else if (dir == "right") {
      snakeX += box;
    }

    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
  }

  let startGame = setInterval(toDraw, 100);
});
