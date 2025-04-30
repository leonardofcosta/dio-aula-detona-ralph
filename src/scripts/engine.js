const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        totalLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        contDownTimerid: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.contDownTimerid);
        clearInterval(state.actions.timerId);
        alert("Game Over! O tempo acabou. \n\n O seu resultado foi: " + state.values.result + "\n\n ==> O jogo será reiniciado. <==");
        restartGame();
    }

    if (state.view.lives.textContent <= 0) {
        clearInterval(state.actions.contDownTimerid);
        clearInterval(state.actions.timerId);
        alert("Game Over! O número de vidas acabaram. \n\n O seu resultado foi: " + state.values.result + " \n\n ==> O jogo será reiniciado. <==");
        restartGame();
    }
}

function restartGame() {
    location.reload();
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                playSound("hit.m4a");
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            } else {
                state.values.totalLives--;
                state.view.lives.textContent = state.values.totalLives;
                playSound("perdeu-vida.mp3");
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();