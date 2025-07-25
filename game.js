var buttonColors = ["green","red","yellow","blue"];

var userClickedPattern = [];

var gamePattern = [];

var level = 1;

var started = false;




function nextSequence()
{

    userClickedPattern = [];
     $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function animatePress(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){ $("#" + color).removeClass("pressed"); },50 )
}



$(document).keypress( function(){

    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }
   

});


function checkAnswer(currentLevel)
{
    if( userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
            nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
