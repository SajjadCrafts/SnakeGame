const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

// Set the grid size for the game
const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Initial snake setup
let snake = [{ x: 100, y: 100 }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;

// Key event listener for controlling the snake's direction
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (e.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Function to move the snake
function moveSnake() {
    const head = Object.assign({}, snake[0]);

    // Move the head in the current direction
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    // If the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Generate new food after eating
    } e
