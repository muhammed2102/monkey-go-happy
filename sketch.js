var monkey,monkeyRun;

var bananaImage,bananaGroup;

var obstaclesImage,obstacleGroup;

var PLAY = 1;
var END = 0;
gamestate = 1;

var invisibleground;

var score = 0;

var gameover = "gameover";

function preload(){
  monkeyRun = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
  
  
}

function setup(){
  createCanvas(400,400);
  
  monkey = createSprite(50,340,20,20);
  monkey.addAnimation("running",monkeyRun);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  invisibleground = createSprite(200,375,400,3);
  invisibleground.visible = true;
  
  
}

function draw(){
  background("white")
  if (gamestate === 1){
  if (keyDown("space")&& monkey.y >= 320){
    monkey.velocityY = -4;
  }
  
  if (monkey.y <230){
    monkey.velocityY = monkey.velocityY+1
  }
  
  spawnObstacles();
  spawnbanana();
  
  monkey.collide(invisibleground);
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score+1;
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gamestate = 0;
      
    }
  }else if(gamestate === 0){
    
    obstacleGroup.setLifetimeEach (-1);
    bananaGroup.setLifetimeEach (-1);
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    text(gameover,200,200)
    
    
  }
  text("score:"+score,340,30)
  drawSprites();
}


function spawnbanana(){
  if (frameCount % 60 === 0){
    banana = createSprite(410,Math.round(random(230,260)),20,20);
    banana.velocityX = -6;
    banana.addImage(bananaImage);
    banana.scale =0.1;
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount % 80 ===0){
    obstacle = createSprite(410,356,20,20);
    obstacle.addImage(obstaclesImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6
    obstacleGroup.add(obstacle);
  }
  
}