import init, { Universe } from "wasm-game-of-life";

const pre = document.getElementById("game-of-life-canvas");

const start = async () => {
  await init();

  const universe = Universe.new();

  const renderLoop = () => {
    pre.textContent = universe.render();
    universe.tick();
    requestAnimationFrame(renderLoop);
  };

  renderLoop();
};

start();
