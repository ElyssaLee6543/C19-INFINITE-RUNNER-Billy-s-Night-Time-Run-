var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, groundImage;
var invisibleGround;
var rock1, rock, rockImage1;
var rocksGroup, rock1;
var billy, billy_running;

var gameOver, gameOverImage;
var score = 0;

function preload(){
  groundImage = loadImage("Night_Background..jpg");
  billy_running = loadAnimation("Billy_Running.png");
  gameOverImage = loadImage("gameOver.png");
  rockImage1 =loadAnimation("rock1.png");
}

function setup() {
    createCanvas(400,400)
    invisibleGround = createSprite(300,390,600,10);
    invisibleGround.visible = false;

    billy = createSprite(100,370,50,50);
    billy.addAnimation("Billy Running", billy_running);
    billy.scale= 0.05;

    ground = createSprite(200,180,400,20);
    ground.addAnimation("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(200,200,50,50);
    gameOver.addAnimation("game over",gameOverImage);
    gameOver.scale = 0.5;

    rock = createSprite(400,370,50,50);
    rock.addAnimation("rock", rockImage1);
    rock.scale = 0.08;
    rocksGroup = createGroup();
    rocksGroup = createGroup();
    rocksGroup.add(rock);
    score = 0;
}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score,200,50,50,50);
    
    console.log("this is ",gameState);
    
    if(gameState === PLAY){
      //move the ground
      gameOver.visible = false;
      ground.velocityX = -4;
      rock.velocityX = -4;
      //scoring
      score = score + Math.round(frameCount/60);
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& billy.y >=100) {
          billy.velocityY = -13;
      }
      
      //add gravity
      billy.velocityY = billy.velocityY + 0.8;
    
      //spawn rocks on the ground
      spawnRocks();
      if(rocksGroup.isTouching(billy)){
        gameState = END;
    }
    }
  
     if (gameState === END) {
      ground.velocityX = 0;
     rocksGroup.setLifetimeEach(-1);
     rocksGroup.setVelocityXEach(0);
     billy.velocityY= 0;
     gameOver.visible = true;
   }
     if (frameCount % 30 === 0){
        rock1 = createSprite(600,165,10,40);
        rock1.velocityX = -6;
        rock1.scale = 0.5;
        rock1.lifetime = 300;
     }
    //stop billy from falling down
    billy.collide(invisibleGround);
    ground.depth = billy.depth;
    billy.depth = billy.depth + 1;
    
    rock.depth = billy.depth;
    rock.depth = rock.depth + 1;
    
    gameOver.depth = rock.depth;
    gameOver.depth = gameOver.depth+1;

    score.depth = gameOver.depth;
    score.depth = score.depth +1;
    if(rock.x<0){
        reset();
    }
    
    drawSprites();
}

function spawnRocks(){
    if (frameCount % 60 === 0){
      rock1 = createSprite(400,165,10,40);
      rock1.velocityX = -(6 + 3*score/100);
      rock1.velocityX = -6;
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: rock1.addAnimation(rockImage1);
                 break;
         case 2: rock1.addAnimation(rockImage1);
                 break;
         case 3: rock1.addAnimation(rockImage1);
                 break;
         case 4: rock1.addAnimation(rockImage1);
                 break;
         case 5: rock1.addAnimation(rockImage1);
                 break;
         case 6: rock1.addAnimation(rockImage1);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       rock1.scale = 0.5;
       rock1.lifetime = 300;
      
      //add each obstacle to the group
       rocksGroup.add(rock1);
    }
   }

   function reset(){
    gameState = PLAY;
    rock.x = 400;
  }
