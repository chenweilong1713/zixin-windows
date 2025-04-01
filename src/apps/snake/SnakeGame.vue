<template>
  <div class="snake-game">
    <h1>贪吃蛇游戏</h1>
    <div class="game-info">
      <span>分数: {{ score }}</span>
      <button @click="startGame" v-if="!isPlaying">开始游戏</button>
      <button @click="pauseGame" v-else>暂停</button>
    </div>
    <div class="game-container" ref="gameContainer">
      <div
          class="snake-segment"
          v-for="(segment, index) in snake"
          :key="index"
          :style="{
          left: `${segment.x * gridSize}px`,
          top: `${segment.y * gridSize}px`,
          backgroundColor: index === 0 ? '#4CAF50' : '#8BC34A'
        }"
      ></div>
      <div
          class="food"
          v-if="food"
          :style="{
          left: `${food.x * gridSize}px`,
          top: `${food.y * gridSize}px`
        }"
      ></div>
    </div>
    <div class="game-over" v-if="gameOver">
      <h2>游戏结束!</h2>
      <p>最终得分: {{ score }}</p>
      <button @click="resetGame">再玩一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gridSize = 20;
const gameSpeed = 150; // 毫秒

const snake = ref([{ x: 5, y: 5 }]);
const direction = ref('right');
const nextDirection = ref('right');
const food = ref(null);
const score = ref(0);
const isPlaying = ref(false);
const gameOver = ref(false);
const gameContainer = ref(null);
const gameLoopInterval = ref(null);

// 初始化游戏
const initGame = () => {
  snake.value = [{ x: 5, y: 5 }];
  direction.value = 'right';
  nextDirection.value = 'right';
  score.value = 0;
  gameOver.value = false;
  generateFood();
};

// 开始游戏
const startGame = () => {
  if (isPlaying.value) return;
  initGame();
  isPlaying.value = true;
  gameLoopInterval.value = setInterval(gameLoop, gameSpeed);
};

// 暂停游戏
const pauseGame = () => {
  isPlaying.value = false;
  clearInterval(gameLoopInterval.value);
};

// 重置游戏
const resetGame = () => {
  pauseGame();
  initGame();
  startGame();
};

// 游戏主循环
const gameLoop = () => {
  if (!isPlaying.value) return;

  direction.value = nextDirection.value;
  moveSnake();

  if (checkCollision()) {
    gameOver.value = true;
    pauseGame();
    return;
  }

  checkFood();
};

// 移动蛇
const moveSnake = () => {
  const head = { ...snake.value[0] };

  switch (direction.value) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  snake.value.unshift(head);

  // 如果没有吃到食物，移除尾部
  if (!food.value || head.x !== food.value.x || head.y !== food.value.y) {
    snake.value.pop();
  }
};

// 检查是否吃到食物
const checkFood = () => {
  const head = snake.value[0];

  if (food.value && head.x === food.value.x && head.y === food.value.y) {
    score.value += 10;
    generateFood();
  }
};

// 生成食物
const generateFood = () => {
  const maxX = Math.floor(gameContainer.value.clientWidth / gridSize) - 1;
  const maxY = Math.floor(gameContainer.value.clientHeight / gridSize) - 1;

  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };

    isOnSnake = snake.value.some(segment =>
        segment.x === newFood.x && segment.y === newFood.y
    );
  } while (isOnSnake);

  food.value = newFood;
};

// 检查碰撞
const checkCollision = () => {
  const head = snake.value[0];
  const maxX = Math.floor(gameContainer.value.clientWidth / gridSize);
  const maxY = Math.floor(gameContainer.value.clientHeight / gridSize);

  // 检查墙壁碰撞
  if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
    return true;
  }

  // 检查自身碰撞
  for (let i = 1; i < snake.value.length; i++) {
    if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
      return true;
    }
  }

  return false;
};

// 键盘控制
const handleKeyDown = (e) => {
  if (!isPlaying.value) return;

  switch (e.key) {
    case 'ArrowUp':
      if (direction.value !== 'down') nextDirection.value = 'up';
      break;
    case 'ArrowDown':
      if (direction.value !== 'up') nextDirection.value = 'down';
      break;
    case 'ArrowLeft':
      if (direction.value !== 'right') nextDirection.value = 'left';
      break;
    case 'ArrowRight':
      if (direction.value !== 'left') nextDirection.value = 'right';
      break;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  generateFood();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  clearInterval(gameLoopInterval.value);
});
</script>

<style scoped>
.snake-game {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
}

.game-info {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.game-container {
  position: relative;
  width: 100%;
  height: 400px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  overflow: hidden;
}

.snake-segment {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #8BC34A;
  border: 1px solid #689F38;
  box-sizing: border-box;
  z-index: 1;
}

.food {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #FF5722;
  border-radius: 50%;
  z-index: 2;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 3;
}
</style>