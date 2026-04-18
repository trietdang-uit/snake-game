(function () {
    "use strict";

    const COLS = 20;
    const ROWS = 20;
    const CELL = 20;
    const TICK_MS = 110;

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const elScore = document.getElementById("score");
    const elStatus = document.getElementById("status");
    const elFinalScore = document.getElementById("final-score");
    const overlayStart = document.getElementById("overlay-start");
    const overlayOver = document.getElementById("overlay-over");
    const btnStart = document.getElementById("btn-start");
    const btnRestart = document.getElementById("btn-restart");

    const DIR = {
        up: { dx: 0, dy: -1 },
        down: { dx: 0, dy: 1 },
        left: { dx: -1, dy: 0 },
        right: { dx: 1, dy: 0 },
    };

    let snake;
    let direction;
    let inputQueue;
    let food;
    let score;
    let gameOver;
    let paused;
    let playing;
    let lastTick;
    let acc;

    function resetGame() {
        const midX = Math.floor(COLS / 2);
        const midY = Math.floor(ROWS / 2);
        snake = [
            { x: midX + 1, y: midY },
            { x: midX, y: midY },
            { x: midX - 1, y: midY },
        ];
        direction = { ...DIR.right };
        inputQueue = [];
        score = 0;
        gameOver = false;
        paused = false;
        lastTick = 0;
        acc = 0;
        spawnFood();
        elScore.textContent = String(score);
        elStatus.textContent = "";
        overlayOver.classList.remove("visible");
    }

    function spawnFood() {
        const taken = new Set(snake.map((s) => s.x + "," + s.y));
        let x;
        let y;
        do {
            x = Math.floor(Math.random() * COLS);
            y = Math.floor(Math.random() * ROWS);
        } while (taken.has(x + "," + y));
        food = { x, y };
    }

    function refDirection() {
        return inputQueue.length ? inputQueue[inputQueue.length - 1] : direction;
    }

    function enqueueDirection(dx, dy) {
        const ref = refDirection();
        if (dx === -ref.dx && dy === -ref.dy) return;
        if (inputQueue.length >= 2) return;
        inputQueue.push({ dx, dy });
    }

    function step() {
        if (gameOver || paused || !playing) return;

        if (inputQueue.length) {
            const next = inputQueue.shift();
            if (!(next.dx === -direction.dx && next.dy === -direction.dy)) {
                direction = next;
            }
        }

        const head = snake[0];
        const nx = head.x + direction.dx;
        const ny = head.y + direction.dy;

        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
            endGame();
            return;
        }

        if (snake.some((seg) => seg.x === nx && seg.y === ny)) {
            endGame();
            return;
        }

        const ate = nx === food.x && ny === food.y;
        snake.unshift({ x: nx, y: ny });
        if (ate) {
            score += 1;
            elScore.textContent = String(score);
            spawnFood();
        } else {
            snake.pop();
        }
    }

    function endGame() {
        gameOver = true;
        playing = false;
        acc = 0;
        elFinalScore.textContent = String(score);
        overlayOver.classList.add("visible");
        elStatus.textContent = "";
    }

    function drawGrid() {
        ctx.strokeStyle = "rgba(46, 64, 90, 0.35)";
        ctx.lineWidth = 1;
        for (let x = 0; x <= COLS; x++) {
            ctx.beginPath();
            ctx.moveTo(x * CELL + 0.5, 0);
            ctx.lineTo(x * CELL + 0.5, ROWS * CELL);
            ctx.stroke();
        }
        for (let y = 0; y <= ROWS; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * CELL + 0.5);
            ctx.lineTo(COLS * CELL, y * CELL + 0.5);
            ctx.stroke();
        }
    }

    function draw() {
        ctx.fillStyle = "#0c1218";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid();

        ctx.fillStyle = "#ff6b6b";
        ctx.beginPath();
        ctx.arc(
            food.x * CELL + CELL / 2,
            food.y * CELL + CELL / 2,
            CELL * 0.35,
            0,
            Math.PI * 2
        );
        ctx.fill();

        snake.forEach((seg, i) => {
            const pad = i === 0 ? 2 : 3;
            ctx.fillStyle = i === 0 ? "#5ee4a4" : "#3ecf8e";
            ctx.fillRect(
                seg.x * CELL + pad,
                seg.y * CELL + pad,
                CELL - pad * 2,
                CELL - pad * 2
            );
            if (i === 0) {
                ctx.strokeStyle = "rgba(255,255,255,0.25)";
                ctx.lineWidth = 1;
                ctx.strokeRect(
                    seg.x * CELL + pad,
                    seg.y * CELL + pad,
                    CELL - pad * 2,
                    CELL - pad * 2
                );
            }
        });
    }

    function loop(ts) {
        if (!lastTick) lastTick = ts;
        const dt = ts - lastTick;
        lastTick = ts;
        if (playing && !gameOver && !paused) {
            acc += dt;
            while (acc >= TICK_MS) {
                acc -= TICK_MS;
                step();
            }
        }
        draw();
        requestAnimationFrame(loop);
    }

    function startFromMenu() {
        overlayStart.classList.remove("visible");
        resetGame();
        playing = true;
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === " " || e.code === "Space") {
            e.preventDefault();
            if (!playing || gameOver) return;
            paused = !paused;
            elStatus.textContent = paused ? "Tạm dừng" : "";
            return;
        }

        if ((e.key === "r" || e.key === "R") && gameOver) {
            overlayOver.classList.remove("visible");
            resetGame();
            playing = true;
            return;
        }

        const keyMap = {
            ArrowUp: DIR.up,
            ArrowDown: DIR.down,
            ArrowLeft: DIR.left,
            ArrowRight: DIR.right,
        };
        const d = keyMap[e.key];
        if (!d) return;
        e.preventDefault();
        if (!playing || gameOver) return;
        enqueueDirection(d.dx, d.dy);
    });

    document.querySelectorAll(".dpad button[data-dir]").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!playing || gameOver) return;
            const d = DIR[btn.getAttribute("data-dir")];
            if (d) enqueueDirection(d.dx, d.dy);
        });
    });

    btnStart.addEventListener("click", startFromMenu);
    btnRestart.addEventListener("click", () => {
        overlayOver.classList.remove("visible");
        resetGame();
        playing = true;
    });

    resetGame();
    playing = false;

    requestAnimationFrame(loop);
})();
