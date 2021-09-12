const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground
var engine;
var world;
var rope;
var fruit;
var fruitlink;
var backgroundImg;
var fruitImg;
var bunnyImg, bunny;
var button;

function preload(){

  bunnyImg = loadImage("Rabbit-01.png")
  backgroundImg = loadImage("background.png")
  fruitImg = loadImage("melon.png")
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(224, 30);
  button.size(40, 40);
  button.mouseClicked(drop);

 bunny = createSprite(340, 610, 40, 40)
 bunny.addImage("bunny", bunnyImg)
 bunny.scale = 0.2
 
  var render = Render.create({

    element: document.body,
    engine: engine,
    options: {
      width: 500,
      height: 700,
      wireframes: false,
    }
  });

  Render.run(render)
  ground = new Ground(250,  690, 500, 20);
  rope = new Rope(6, {x: 246, y: 30})

  var fruit_options = {
       density: 0.001
  }
  fruit =  Bodies.circle(246, 300, 20, fruit_options);

  Matter.Composite.add(rope.body, fruit);

  fruitlink = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

 //World.add(world, fruit) 
 

function draw() 
{
  background(51);
      
  image(backgroundImg, 0, 0)
 
  Engine.update(engine);
   ground.display();
   rope.show();
  
   push();
   if(fruit!= null)
   {
    image(fruitImg, fruit.position.x -25, fruit.position.y-50, 60, 60)  
   }
    pop();
//ellipse(fruit.position.x,fruit.position.y,20,20)
drawSprites()
}


//user defined function
function drop()
{
     rope.break();
     fruitlink.detach();
     fruitlink = null;
}

