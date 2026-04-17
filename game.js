(function () {
    "use strict";

    // ===== CONFIG =====
    const COLS = 20;
    const ROWS = 20;
    const CELL = 20;

    // ===== DOM =====
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const elScore = document.getElementById("score");
    const elStatus = document.getElementById("status");

    // ===== STATE =====
    let snake = [];
    let direction = { dx: 1, dy: 0 };
    let food = null;
    let score = 0;
    let gameOver = false;

    // ===== INIT =====
    function init() {
        console.log("Game init...");
        // TODO: init snake, food
    }

    // ===== GAME LOOP =====
    function update() {
        // TODO: update snake position
        // TODO: handle collision
    }

    function draw() {
        // TODO: draw grid
        // TODO: draw snake
        // TODO: draw food
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    // ===== EVENT =====
    document.addEventListener("keydown", (e) => {
        // TODO: handle input
    });

    // ===== START =====
    init();
    loop();
})();