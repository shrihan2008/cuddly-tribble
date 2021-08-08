var GAMESTATE=1
var survival=0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var  over,over1
function preload()
{
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 

}



function setup()
{
  createCanvas(displayWidth,displayHeight)
  monkey=createSprite(100,400)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.25
  
  ground=createSprite(500,700,5000,40)
  ground.velocityX=-5

  FoodGroup=new Group()
  obstacleGroup=new Group()
}


function draw()
{
  var x =200;
    var y;
  camera.position.x = displayWidth/2;
  camera.position.y = displayHeight/2
  if(ground.x<0)
    {
      ground.x=ground.width/2
    }
  background("green") 
  if (GAMESTATE===1)
  {  
  
    
    if(monkey.x>1000)
    {
      monkey.x=monkey.width/2
    }
    if(keyDown("space")&&monkey.y<700)
    {    
      monkey.velocityY=-5
    }

    monkey.velocityY=monkey.velocityY+0.12
    if(monkey.isTouching(ground))
    {
      monkey.collide(ground)    
    }


     if(keyDown("a"))
     {
        monkey.velocityX=2    
     }

    bananaMaker();
    obstacles();
    if(monkey.isTouching(FoodGroup))
    {
      survival=survival+1
      FoodGroup.destroyEach()

    }

    if(monkey.isTouching(obstacleGroup))
    {
      GAMESTATE=0
    }
  }
  
  if (GAMESTATE===0)
  {
    monkey.velocityX=0
    monkey.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.destroyEach()
    obstacleGroup.destroyEach()
    FoodGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    text("Game Over",350,350)
  }
  
  
  text("Survival  " +  survival,600,50)
  drawSprites(); 
}

function bananaMaker()
{  
  if (World.frameCount % 60 == 0)
  {
    
    banana = createSprite(100,400,10,40);
    banana.addImage("bun",bananaImage)
    banana.x=Math.round(random(displayWidth,displayWidth))
    banana.y=Math.round(random(displayHeight,displayHeight))
    banana.velocityY=3
    banana.lifetime=100
    banana.scale=0.25
    FoodGroup.add(banana)   
    return 
  }
}
function obstacles()
{
  if (World.frameCount % 150 == 0)
  {
    obstacle = createSprite(700,650,10,40);
    obstacle.velocityX = -4   
    obstacle.addImage("ob", obstacleImage)  
    obstacle.lifetime=300
    obstacle.scale=0.25
    obstacleGroup.add(obstacle)
    return
  }
                        
}




