(function () {
    "use strict";

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
        ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL * 0.35, 0, Math.PI * 2);
        ctx.fill();

        snake.forEach((seg, i) => {
            const pad = i === 0 ? 2 : 3;
            ctx.fillStyle = i === 0 ? "#5ee4a4" : "#3ecf8e";
            ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
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

    requestAnimationFrame(loop);
})();