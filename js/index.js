// Matriz que representa el tablero del juego Tic-Tac-Toe
const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

// Puntuación de los jugadores
let player1Score = 0;
let player2Score = 0;

// Elementos del DOM para mostrar la puntuación de los jugadores y los botones de reinicio
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const resetButton = document.getElementById('reset-button');
const resetScoreButton = document.getElementById('reset-score-button');

// Tokens de los jugadores (logos de Angular y React)
const angularLogo = '<img src="images/angular-logo.svg" alt="Angular Logo">';
const reactLogo = '<img src="images/react-logo.svg" alt="React Logo">';

// Turno actual del juego (P1: Jugador 1, P2: Jugador 2)
let gameTurn = "P1";
// Variable para verificar si el juego está en progreso o ha terminado
let gameInProgress = true;

// Obtiene todos los elementos de las casillas del tablero
const boxes = document.querySelectorAll('.game-box');

// Agrega un evento de clic a cada casilla para manejar el juego

boxes.forEach((box, i) => {
    box.addEventListener("click", () => {
        // Si el juego ya ha terminado (hay un ganador o empate), no hacer nada
        if (!gameInProgress || gameBoard[getRowIndex(i)][getColIndex(i)] !== "") return;

        // Coloca el token del jugador actual en la casilla seleccionada
        box.innerHTML = (gameTurn === "P1") ? angularLogo : reactLogo;
        gameBoard[getRowIndex(i)][getColIndex(i)] = gameTurn;

        // Verifica si hay un ganador o si el juego termina en empate
        const winnerPosition = checkWinner();
        if (typeof winnerPosition === "object") {
            // Si hay un ganador, se llama a la función para manejarlo
            winner(winnerPosition);
            return;
        }
        if (winnerPosition === "TIE") {
            // Si hay un empate, muestra una alerta y reinicia el juego
            alert("¡Empate!");
            resetGame();
            return;
        }

        // Cambia al turno del siguiente jugador
        gameTurn = (gameTurn === "P1") ? "P2" : "P1";
    });
});

// Verifica si hay un ganador basado en las combinaciones ganadoras

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[getRowIndex(a)][getColIndex(a)] &&
            gameBoard[getRowIndex(a)][getColIndex(a)] === gameBoard[getRowIndex(b)][getColIndex(b)] &&
            gameBoard[getRowIndex(a)][getColIndex(a)] === gameBoard[getRowIndex(c)][getColIndex(c)]) {
            return [a, b, c]; // Retorna la posición de la combinación ganadora
        }
    }

    // Si todas las casillas están ocupadas y no hay ganador, retorna "TIE" para empate
    if (gameBoard.flat().every(cell => cell !== '')) return "TIE";
    return false; // Si no hay ganador ni empate, retorna false
};

// Función para manejar la victoria de un jugador
const winner = (winnerPosition) => {
    console.log("Winner", winnerPosition);
    
    // Añadir la clase 'winner' a las casillas ganadoras antes de mostrar la alerta
    boxes[winnerPosition[0]].classList.add("winner");
    boxes[winnerPosition[1]].classList.add("winner");
    boxes[winnerPosition[2]].classList.add("winner");

    // Obtén el nombre del jugador ganador para la alerta
    const winnerName = (gameTurn === "P1") ? "angularPlayer" : "reactPlayer";
    // Muestra una alerta con el nombre del ganador
    alert(`${winnerName} ha ganado!`);

    // Actualiza la puntuación del jugador ganador en el marcador
    if (gameTurn === "P1") {
        player1Score++;
        player1ScoreElement.textContent = `angularPlayer: ${player1Score}`;
    } else {
        player2Score++;
        player2ScoreElement.textContent = `reactPlayer: ${player2Score}`;
    }

    // Detén el juego una vez que hay un ganador
    gameInProgress = false;
};

// Obtiene el índice de fila de una casilla en función de su índice global
const getRowIndex = (index) => Math.floor(index / 3);

// Obtiene el índice de columna de una casilla en función de su índice global
const getColIndex = (index) => index % 3;

// Agrega un evento de clic al botón de reinicio para restablecer el juego y el marcador
resetButton.addEventListener('click', resetGame);

// Variable para llevar el conteo de partidas jugadas
let numGamesPlayed = 0;

// Verificar y asignar el turno inicial en la carga de la página
gameTurn = (numGamesPlayed % 2 === 0) ? "P1" : "P2";

// Agrega un evento de click al botón de reinicio para restablecer el juego y el marcador
resetButton.addEventListener('click', () => {
    // Incrementa el número de partidas jugadas al reiniciar el juego
    numGamesPlayed++;
    // Decide el turno inicial basado en si el número de partidas es par o impar
    gameTurn = (numGamesPlayed % 2 === 0) ? "P1" : "P2";
    resetGame();
});

// Función para restablecer el juego
function resetGame() {
    gameBoard.forEach(row => row.fill(''));
    boxes.forEach(box => box.innerHTML = '');
    boxes.forEach(box => box.classList.remove("winner"));
    gameInProgress = true;
}

// Agrega un evento de clic al botón de reinicio de la puntuación
resetScoreButton.addEventListener('click', resetScore);

// Función para restablecer la puntuación
function resetScore() {
    // Restablece las puntuaciones a 0
    player1Score = 0;
    player2Score = 0;

    // Actualiza la puntuación mostrada en el marcador
    player1ScoreElement.textContent = `angularPlayer: ${player1Score}`;
    player2ScoreElement.textContent = `reactPlayer: ${player2Score}`;
}