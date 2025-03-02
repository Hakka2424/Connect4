// Track how many pieces are placed in each column
const columnHeights = { c1: 1, c2: 1, c3: 1, c4: 1, c5: 1, c6: 1, c7: 1 };

// Track whose turn it is (1 = red, 2 = yellow)
let turn = 1;

/**
 * Check if a player has won the game.
 */
function checkWin(player) {
    setTimeout(() => {
        // Check vertical wins
        for (let col = 1; col <= 7; col++) {
            for (let row = 1; row <= 3; row++) {
                if (isWinningSequence(player, [`c${col}r${row}`, `c${col}r${row + 1}`, `c${col}r${row + 2}`, `c${col}r${row + 3}`])) {
                    announceWinner(player);
                    return;
                }
            }
        }

        // Check horizontal wins
        for (let row = 1; row <= 6; row++) {
            for (let col = 1; col <= 4; col++) {
                if (isWinningSequence(player, [`c${col}r${row}`, `c${col + 1}r${row}`, `c${col + 2}r${row}`, `c${col + 3}r${row}`])) {
                    announceWinner(player);
                    return;
                }
            }
        }

        // Check diagonal (↘) wins
        for (let col = 1; col <= 4; col++) {
            for (let row = 1; row <= 3; row++) {
                if (isWinningSequence(player, [`c${col}r${row}`, `c${col + 1}r${row + 1}`, `c${col + 2}r${row + 2}`, `c${col + 3}r${row + 3}`])) {
                    announceWinner(player);
                    return;
                }
            }
        }

        // Check diagonal (↙) wins
        for (let col = 1; col <= 4; col++) {
            for (let row = 6; row >= 4; row--) {
                if (isWinningSequence(player, [`c${col}r${row}`, `c${col + 1}r${row - 1}`, `c${col + 2}r${row - 2}`, `c${col + 3}r${row - 3}`])) {
                    announceWinner(player);
                    return;
                }
            }
        }
    }, 200);
}

/**
 * Check if four pieces in a row belong to the player.
 */
function isWinningSequence(player, positions) {
    return positions.every(pos => document.getElementById(pos).style.backgroundColor === player);
}

/**
 * Show the winner and restart the game.
 */
function announceWinner(player) {
    alert(`${player.toUpperCase()} wins!`);
    resetGame();
}

// Add click event to each column
document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("click", () => {
        const columnId = column.id;
        let rowNumber = columnHeights[columnId];

        // If column is not full, place a piece
        if (rowNumber <= 6) {
            let color = turn % 2 === 1 ? "red" : "yellow";
            let cell = document.getElementById(`${columnId}r${rowNumber}`);
            cell.style.backgroundColor = color;
            cell.classList.add("placed");

            // Update column height and switch turn
            columnHeights[columnId]++;
            turn++;

            // Check if someone won
            checkWin(color);

            // Update turn text
            document.getElementById("whosturn").innerText = turn % 2 === 1 ? "Red's Turn" : "Yellow's Turn";
        }
    });
});

// Restart Game Function
document.getElementById("restart-btn").addEventListener("click", resetGame);

function resetGame() {
    document.querySelectorAll(".column p").forEach(cell => cell.style.backgroundColor = "white");
    Object.keys(columnHeights).forEach(key => columnHeights[key] = 1);
    turn = 1;
    document.getElementById("whosturn").innerText = "Red's Turn";
}

/**
 * Create twinkling stars with slight movement.
 */
function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        // Random position
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;

        // Random animation duration for variation
        let duration = Math.random() * 3 + 2; // Between 2s and 5s
        star.style.animationDuration = `${duration}s, 10s`;

        document.body.appendChild(star);
    }
}

// Create 50 moving twinkling stars
createStars(50);
