const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".start").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".start").addClass("pressed");

    setTimeout(function () {
      $(".start").removeClass("pressed");
    }, 100);
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

var checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    console.log("wrong");

    startOver();
  }
};

var nextSequence = function () {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
};
const playSound = function (name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

const startOver = function () {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
};
