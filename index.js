var buttoncolors = ["green", "red", "yellow", "blue"];
var gamepattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("level " + level);
    nextsequence();
    start = true;
  }}
);  

$(".btn").click(function () {

  var userchoosen = $(this).attr("id");
  userClickedPattern.push(userchoosen);

  playSoundname(userchoosen);
  animatePress(userchoosen);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playSoundname("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


const nextsequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomnumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttoncolors[randomnumber]
  gamepattern.push(randomChosenColour)


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSoundname(randomChosenColour)

}

  function playSoundname(name) {
    var aud = new Audio("sounds/" + name + ".mp3")
    aud.play();
  }
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
  }

function startOver() {
  level = 0;
  gamePattern = [];
  start= false;
}
