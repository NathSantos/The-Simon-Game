var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Fução que define o próximo botão da sequência
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Definindo o próximo botão aleatoriamente
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Sinalizando o botão com um flash
    $("#" + randomChosenColour).fadeOut(130).fadeIn(130);

    playSound(randomChosenColour);
}

// Escutando quando o usuário clicar em algum botão
$(".btn").click(function() {
    // Guardando o id do botão que o usuário clicar
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // passando a última resposta para verificação
    checkAnswer(userClickedPattern.length - 1);
})

// Verifica quando uma tecla foi pressionada para começar o jogo
$(document).keydown(function() {
    // verifica se é a primeira vez que alguma tecla é apertada
    if(started == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// Função que verifica se a resposta está correta ou não
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Reseta algumas variáveis pra recomeçar o jogo
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Aplicando um som específico ao botão
function playSound(name) {
    var mySound = new Audio("sounds/" + name + ".mp3");
    mySound.play();
}

// Adicionando animação ao pressionar um botão
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

