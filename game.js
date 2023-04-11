var buttonColors=["red","blue","green","yellow"]

var started=false;
var level=0;

var gamePattern=[];
var userclickedPattern=[];

$(document).keypress(function(){ 
    if (!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userchoosencolor=$(this).attr("id");
    userclickedPattern.push(userchoosencolor);
    playsound(userchoosencolor);
    animatePress(userchoosencolor);
    checkanswer(userclickedPattern.length-1);


});

function checkanswer(currentlevel){
    if (gamePattern[currentlevel]===userclickedPattern[currentlevel]){
        if (gamePattern.length===userclickedPattern.length){
            setTimeout(function(){
                nextsequence()
            },1000);
        }
        
    }else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentcolor).removeClass("pressed");  
    }, 100);

};




function nextsequence(){
    userclickedPattern=[];
    level+=1;
    $("#level-title").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchoosencolor=buttonColors[randomnumber];
    gamePattern.push(randomchoosencolor);
    $("#"+randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchoosencolor);
}

function playsound(colorname){
    var audio=new Audio("sounds\\"+colorname+".mp3");
    audio.play();
}

function startover() { 
    started=false;
    level=0;
    gamePattern=[];
 }