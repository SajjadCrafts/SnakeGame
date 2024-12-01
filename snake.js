const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

// Define the snake's initial state
let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = generateFood();
let gridSize = 20;
let score = 0;

// Key control for snake movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    }
    if (e.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    }
    if (e.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Function to update snake's position
function moveSnake() {
    const head = Object.assign({}, snake[0]);

    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    // Snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove last segment
    }

    snake.unshift(head); // Add new head to snake

    // Detect collisions with wall or itself
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
        resetGame();
    }
}

// Function to generate new food at random positions
function generateFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x: foodX, y: foodY };
}

// Function to render everything
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'lime' : 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Function to update the game logic
function gameLoop() {
    moveSnake();
    render();
    setTimeout(gameLoop, 100); // Run game loop every 100ms
}

// Function to reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    score = 0;
    food = generateFood();
}

// Start the game loop
gameLoop();
