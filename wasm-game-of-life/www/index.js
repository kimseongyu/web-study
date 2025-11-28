import init, { Universe as WasmUniverse, Cell } from "wasm-game-of-life";

// Performance tracker class for tick timing
class PerformanceTracker {
  constructor(elementId, name) {
    this.element = document.getElementById(elementId);
    this.name = name;
    this.tickTimes = [];
    this.maxSamples = 100;
  }

  recordTickTime(timeMs, tickCount) {
    const timePerTick = timeMs / tickCount;
    this.tickTimes.push(timePerTick);
    if (this.tickTimes.length > this.maxSamples) {
      this.tickTimes.shift();
    }
  }

  render() {
    if (this.tickTimes.length === 0) {
      this.element.textContent = `${this.name}:\n  No data yet`;
      return;
    }

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.tickTimes.length; i++) {
      sum += this.tickTimes[i];
      min = Math.min(this.tickTimes[i], min);
      max = Math.max(this.tickTimes[i], max);
    }
    const mean = sum / this.tickTimes.length;
    const total = sum;
    const tickRate = 1000 / mean; // ticks per second

    this.element.textContent = `${this.name}:
Time per tick:
         latest = ${this.tickTimes[this.tickTimes.length - 1].toFixed(3)} ms
  avg (last ${this.tickTimes.length}) = ${mean.toFixed(3)} ms
  min (last ${this.tickTimes.length}) = ${min.toFixed(3)} ms
  max (last ${this.tickTimes.length}) = ${max.toFixed(3)} ms
Tick rate: ${tickRate.toFixed(1)} ticks/sec`;
  }

  getAverageTime() {
    if (this.tickTimes.length === 0) return 0;
    const sum = this.tickTimes.reduce((a, b) => a + b, 0);
    return sum / this.tickTimes.length;
  }
}

// JavaScript implementation of Game of Life
const CellState = {
  Dead: 0,
  Alive: 1,
};

class JSUniverse {
  constructor() {
    this.width = 64;
    this.height = 64;
    this.cells = new Uint8Array(this.width * this.height);

    // Initialize with same pattern as Rust version
    for (let i = 0; i < this.width * this.height; i++) {
      if (i % 2 === 0 || i % 7 === 0) {
        this.cells[i] = CellState.Alive;
      } else {
        this.cells[i] = CellState.Dead;
      }
    }
  }

  getIndex(row, column) {
    return row * this.width + column;
  }

  liveNeighborCount(row, column) {
    let count = 0;

    const north = row === 0 ? this.height - 1 : row - 1;
    const south = row === this.height - 1 ? 0 : row + 1;
    const west = column === 0 ? this.width - 1 : column - 1;
    const east = column === this.width - 1 ? 0 : column + 1;

    count += this.cells[this.getIndex(north, west)];
    count += this.cells[this.getIndex(north, column)];
    count += this.cells[this.getIndex(north, east)];
    count += this.cells[this.getIndex(row, west)];
    count += this.cells[this.getIndex(row, east)];
    count += this.cells[this.getIndex(south, west)];
    count += this.cells[this.getIndex(south, column)];
    count += this.cells[this.getIndex(south, east)];

    return count;
  }

  tick() {
    const next = new Uint8Array(this.cells);

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const idx = this.getIndex(row, col);
        const cell = this.cells[idx];
        const liveNeighbors = this.liveNeighborCount(row, col);

        let nextCell;
        if (cell === CellState.Alive) {
          if (liveNeighbors < 2) {
            nextCell = CellState.Dead;
          } else if (liveNeighbors === 2 || liveNeighbors === 3) {
            nextCell = CellState.Alive;
          } else {
            nextCell = CellState.Dead;
          }
        } else {
          if (liveNeighbors === 3) {
            nextCell = CellState.Alive;
          } else {
            nextCell = CellState.Dead;
          }
        }

        next[idx] = nextCell;
      }
    }

    this.cells = next;
  }

  width() {
    return this.width;
  }

  height() {
    return this.height;
  }

  toggleCell(row, column) {
    const idx = this.getIndex(row, column);
    this.cells[idx] =
      this.cells[idx] === CellState.Dead ? CellState.Alive : CellState.Dead;
  }
}

// Common constants
const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// Drawing utilities
function drawGrid(ctx, width, height) {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

function drawCellsWasm(ctx, universe, wasm, width, height) {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(wasm.memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;
      if (cells[idx] !== Cell.Alive) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;
      if (cells[idx] !== Cell.Dead) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}

function drawCellsJS(ctx, universe, width, height) {
  ctx.beginPath();

  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;
      if (universe.cells[idx] !== CellState.Alive) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;
      if (universe.cells[idx] !== CellState.Dead) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}

const start = async () => {
  const wasm = await init();

  // Initialize WASM universe
  const wasmUniverse = WasmUniverse.new();
  const width = wasmUniverse.width();
  const height = wasmUniverse.height();

  // Initialize JavaScript universe with same dimensions
  const jsUniverse = new JSUniverse();

  // Setup WASM canvas
  const wasmCanvas = document.getElementById("game-of-life-canvas-wasm");
  wasmCanvas.height = (CELL_SIZE + 1) * height + 1;
  wasmCanvas.width = (CELL_SIZE + 1) * width + 1;
  const wasmCtx = wasmCanvas.getContext("2d");

  // Setup JavaScript canvas
  const jsCanvas = document.getElementById("game-of-life-canvas-js");
  jsCanvas.height = (CELL_SIZE + 1) * height + 1;
  jsCanvas.width = (CELL_SIZE + 1) * width + 1;
  const jsCtx = jsCanvas.getContext("2d");

  // Setup performance trackers
  const wasmPerf = new PerformanceTracker("fps-wasm", "WASM");
  const jsPerf = new PerformanceTracker("fps-js", "JavaScript");

  const comparisonInfo = document.getElementById("comparison-info");
  const ticksPerFrameInput = document.getElementById("ticks-per-frame");

  let ticksPerFrame = 5000;

  // Reset performance trackers when ticks per frame changes
  ticksPerFrameInput.addEventListener("change", () => {
    wasmPerf.tickTimes = [];
    jsPerf.tickTimes = [];
    comparisonInfo.textContent =
      "Performance tracking reset. New data will appear shortly.";
  });

  // Canvas click handlers
  wasmCanvas.addEventListener("click", (event) => {
    const boundingRect = wasmCanvas.getBoundingClientRect();
    const scaleX = wasmCanvas.width / boundingRect.width;
    const scaleY = wasmCanvas.height / boundingRect.height;
    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;
    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const column = Math.min(
      Math.floor(canvasLeft / (CELL_SIZE + 1)),
      width - 1
    );

    wasmUniverse.toggle_cell(row, column);
    jsUniverse.toggleCell(row, column);

    drawGrid(wasmCtx, width, height);
    drawCellsWasm(wasmCtx, wasmUniverse, wasm, width, height);
    drawGrid(jsCtx, width, height);
    drawCellsJS(jsCtx, jsUniverse, width, height);
  });

  jsCanvas.addEventListener("click", (event) => {
    const boundingRect = jsCanvas.getBoundingClientRect();
    const scaleX = jsCanvas.width / boundingRect.width;
    const scaleY = jsCanvas.height / boundingRect.height;
    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;
    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const column = Math.min(
      Math.floor(canvasLeft / (CELL_SIZE + 1)),
      width - 1
    );

    wasmUniverse.toggle_cell(row, column);
    jsUniverse.toggleCell(row, column);

    drawGrid(wasmCtx, width, height);
    drawCellsWasm(wasmCtx, wasmUniverse, wasm, width, height);
    drawGrid(jsCtx, width, height);
    drawCellsJS(jsCtx, jsUniverse, width, height);
  });

  let animationId = null;

  const updateComparisonInfo = () => {
    const wasmAvg = wasmPerf.getAverageTime();
    const jsAvg = jsPerf.getAverageTime();

    if (wasmAvg === 0 || jsAvg === 0) {
      comparisonInfo.textContent = "Collecting performance data...";
      return;
    }

    const ratio = jsAvg / wasmAvg;
    const speedup = ratio.toFixed(2);
    const percentage = ((ratio - 1) * 100).toFixed(1);

    if (ratio > 1) {
      comparisonInfo.textContent =
        `Performance Comparison:\n` +
        `WASM is ${speedup}x faster than JavaScript\n` +
        `JavaScript is ${percentage}% slower\n` +
        `WASM avg: ${wasmAvg.toFixed(3)} ms/tick\n` +
        `JavaScript avg: ${jsAvg.toFixed(3)} ms/tick`;
    } else {
      comparisonInfo.textContent =
        `Performance Comparison:\n` +
        `JavaScript is ${(1 / ratio).toFixed(2)}x faster than WASM\n` +
        `WASM is ${((1 / ratio - 1) * 100).toFixed(1)}% slower\n` +
        `WASM avg: ${wasmAvg.toFixed(3)} ms/tick\n` +
        `JavaScript avg: ${jsAvg.toFixed(3)} ms/tick`;
    }
  };

  const renderLoop = () => {
    // Get ticks per frame from input
    ticksPerFrame = parseInt(ticksPerFrameInput.value) || 5000;

    // Measure WASM tick time
    const wasmStartTime = performance.now();
    for (let i = 0; i < ticksPerFrame; i++) {
      wasmUniverse.tick();
    }
    const wasmEndTime = performance.now();
    const wasmTickTime = wasmEndTime - wasmStartTime;
    wasmPerf.recordTickTime(wasmTickTime, ticksPerFrame);
    wasmPerf.render();

    // Measure JavaScript tick time
    const jsStartTime = performance.now();
    for (let i = 0; i < ticksPerFrame; i++) {
      jsUniverse.tick();
    }
    const jsEndTime = performance.now();
    const jsTickTime = jsEndTime - jsStartTime;
    jsPerf.recordTickTime(jsTickTime, ticksPerFrame);
    jsPerf.render();

    // Update comparison info
    updateComparisonInfo();

    // Draw both canvases
    drawGrid(wasmCtx, width, height);
    drawCellsWasm(wasmCtx, wasmUniverse, wasm, width, height);
    drawGrid(jsCtx, width, height);
    drawCellsJS(jsCtx, jsUniverse, width, height);

    animationId = requestAnimationFrame(renderLoop);
  };

  const isPaused = () => {
    return animationId === null;
  };

  const playPauseButton = document.getElementById("play-pause");

  const play = () => {
    playPauseButton.textContent = "⏸";
    renderLoop();
  };

  const pause = () => {
    playPauseButton.textContent = "▶";
    cancelAnimationFrame(animationId);
    animationId = null;
  };

  playPauseButton.addEventListener("click", () => {
    if (isPaused()) {
      play();
    } else {
      pause();
    }
  });

  // Benchmark function
  const benchmarkBtn = document.getElementById("benchmark-btn");
  benchmarkBtn.addEventListener("click", async () => {
    if (!isPaused()) {
      pause();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    benchmarkBtn.disabled = true;
    benchmarkBtn.textContent = "Running Benchmark...";
    comparisonInfo.textContent = "Running benchmark... Please wait.";

    // Create fresh universes for benchmarking
    const benchWasmUniverse = WasmUniverse.new();
    const benchJsUniverse = new JSUniverse();

    const benchmarkTicks = 10000;
    const iterations = 5;

    // Warm up
    for (let i = 0; i < 1000; i++) {
      benchWasmUniverse.tick();
      benchJsUniverse.tick();
    }

    // Benchmark WASM
    const wasmTimes = [];
    for (let iter = 0; iter < iterations; iter++) {
      const start = performance.now();
      for (let i = 0; i < benchmarkTicks; i++) {
        benchWasmUniverse.tick();
      }
      const end = performance.now();
      wasmTimes.push(end - start);
      await new Promise((resolve) => setTimeout(resolve, 10)); // Small delay between iterations
    }

    // Benchmark JavaScript
    const jsTimes = [];
    for (let iter = 0; iter < iterations; iter++) {
      const start = performance.now();
      for (let i = 0; i < benchmarkTicks; i++) {
        benchJsUniverse.tick();
      }
      const end = performance.now();
      jsTimes.push(end - start);
      await new Promise((resolve) => setTimeout(resolve, 10)); // Small delay between iterations
    }

    // Calculate statistics
    const wasmAvg = wasmTimes.reduce((a, b) => a + b, 0) / iterations;
    const wasmMin = Math.min(...wasmTimes);
    const wasmMax = Math.max(...wasmTimes);
    const wasmAvgPerTick = wasmAvg / benchmarkTicks;

    const jsAvg = jsTimes.reduce((a, b) => a + b, 0) / iterations;
    const jsMin = Math.min(...jsTimes);
    const jsMax = Math.max(...jsTimes);
    const jsAvgPerTick = jsAvg / benchmarkTicks;

    const ratio = jsAvgPerTick / wasmAvgPerTick;

    comparisonInfo.textContent =
      `Benchmark Results (${benchmarkTicks} ticks, ${iterations} iterations):\n\n` +
      `WASM:\n` +
      `  Total time: ${wasmAvg.toFixed(2)} ms (min: ${wasmMin.toFixed(
        2
      )}, max: ${wasmMax.toFixed(2)})\n` +
      `  Time per tick: ${wasmAvgPerTick.toFixed(4)} ms\n` +
      `  Ticks per second: ${(1000 / wasmAvgPerTick).toFixed(0)}\n\n` +
      `JavaScript:\n` +
      `  Total time: ${jsAvg.toFixed(2)} ms (min: ${jsMin.toFixed(
        2
      )}, max: ${jsMax.toFixed(2)})\n` +
      `  Time per tick: ${jsAvgPerTick.toFixed(4)} ms\n` +
      `  Ticks per second: ${(1000 / jsAvgPerTick).toFixed(0)}\n\n` +
      `WASM is ${ratio.toFixed(2)}x faster than JavaScript\n` +
      `(${((ratio - 1) * 100).toFixed(1)}% improvement)`;

    benchmarkBtn.disabled = false;
    benchmarkBtn.textContent = "Run Benchmark";
  });

  // Initial render
  drawGrid(wasmCtx, width, height);
  drawCellsWasm(wasmCtx, wasmUniverse, wasm, width, height);
  drawGrid(jsCtx, width, height);
  drawCellsJS(jsCtx, jsUniverse, width, height);

  comparisonInfo.textContent =
    "Performance comparison will appear here.\n" +
    "Adjust 'Ticks per frame' to see how performance scales.\n" +
    "Click 'Run Benchmark' for detailed comparison.";

  play();
};

start();
