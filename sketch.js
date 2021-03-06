var GAMESTATE=1
var survival=0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var  over,over1
function preload()
{b1=loadImage("jungle.png")
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
  over1=loadImage("over.jpg")

}



function setup()
{
  createCanvas(1800,900)
  
  FoodGroup=new Group()
  obstacleGroup=new Group()
  bg=createSprite(2000,600,2500,550)
  bg.addImage(b1)
  bg.scale=1.55  
  ground=createSprite(4000,900,5000,40)
  ground.velocityX=-60
  monkey=createSprite(100,400)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.25
}


function draw()
{
  background(b1)
  bg.velocityX=-4
  if(bg.x<0){
    bg.x=bg.width*1.1
  }
  
  if(ground.x<0)
  {
    ground.x=ground.width/2
  }
  
  if (GAMESTATE===1)
  {  
    if(monkey.x>1000)
    {
      monkey.x=monkey.width/2
    }
    
    if((keyIsDown(UP_ARROW))&&(monkey.y<1000))
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
    textSize(50)
    bg.remove()
    fill("orange")
   text("GAME OVER",500,200)
  }

  if(monkey.isTouching(FoodGroup))
    {
      survival=survival+1
      FoodGroup.destroyEach()

    }
  
  //textSize(45)
 // text("HELLO",200,200)
 fill("red")
  text("Survival  " +  survival,500,100)
  drawSprites(); 
}

function bananaMaker()
{  
  if (World.frameCount % 60 == 0)
  {
    
    banana = createSprite(100,400,10,40);
    banana.addImage("bun",bananaImage)
    banana.x=Math.round(random(100,700))
    banana.y=Math.round(random(400,700))
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
    obstacle = createSprite(700,850,10,40);
    obstacle.velocityX = -4   
    obstacle.addImage("ob", obstacleImage)  
    obstacle.lifetime=300
    obstacle.scale=0.25
    obstacleGroup.add(obstacle)
    return
  }
                        
}




