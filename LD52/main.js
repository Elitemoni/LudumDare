//Game By Elitemoni
/*
TODO:
Tree shoots out acorns
Hawk enemy coming from tree nests
Acorn shooting from player
html add dom element
divide into multiple files (js and css)
*/
//--------------------------------------------------------------------------------
function say(x){
   console.log(x);
}

function Id(x){
   return document.getElementById(x);
}

let mPos = {x:0,y:0};
const gameScene = Id('gameScene');
let gameSceneDim = {w:parseInt(getComputedStyle(gameScene).width, 10),
                    h:parseInt(getComputedStyle(gameScene).height, 10)};
let score = 0;

class GameObject {
   constructor(c, o, p, r, s, a=0){
      this.c = c;
      this.o = o;
      this.p = {x: p.x, y: p.y};
      this.r = r;
      this.s = s;
      this.a = a;

      [o.point.style.left, o.point.style.top] = [p.x + 'px', p.y + 'px'];

      [o.image.style.left, o.image.style.top] = [-r + 'px', -r + 'px'];
      [o.image.style.width, o.image.style.height] = [2*r + 'px', 2*r + 'px'];
   }

   update(){
      this.c.move();
      this.c.shoot();
      this.updatePoint();
   }

   updatePoint(){
      this.o.point.style.left = this.p.x + 'px';
      this.o.point.style.top  = this.p.y + 'px';
   }
}

class Player {
   constructor(o,p,r,s){
      this.g = new GameObject(this,o,p,r,s);
   }

   move(){
      let dx = mPos.x - this.g.p.x;
      let dy = mPos.y - this.g.p.y;
      let d = Math.sqrt(dx**2 + dy**2);
      //prevent jiggle
      if (Math.abs(d) > 1){
         //get the angle a
         this.g.a = Math.acos(dx/d);
         if (dy < 0){
            if (dx < 0){
               this.g.a += 2*Math.atan(dy/dx);
            }
            else {
               this.g.a = 3*Math.PI/2 - Math.atan(dx/dy);
            }
         }

         let newX = this.g.p.x + Math.cos(this.g.a) * this.g.s;
         let newY = this.g.p.y + Math.sin(this.g.a) * this.g.s;

         //Don't go out of bounds
         if (newX > 0 + this.g.r && newX < gameSceneDim.w - this.g.r){
            this.g.p.x = newX;
         }
         if (newY > 0 + this.g.r && newY < gameSceneDim.h - this.g.r){
            this.g.p.y = newY;
         }
      }
   }

   shoot(){null;}

   collide(c){
      score++;
      say('score: ' + score);
   }
} 

class Tree {
   constructor(o,p,r,s){
      this.g = new GameObject(this, o, p, r, s);
   }

   move(){
      null;
   }

   shoot(){
      if (Date.now() - epoch > 5000){
         
         epoch = Date.now();
      }
   }
}

class Acorn {
   constructor(o,p,r,s){
      this.g = new GameObject(this,o,p,r,s);
   }

   move(){null;}

   shoot(){null;}

   collide(c){
      this.g.o.image.style.opacity = 0;
      say('acorn hit by ' + player.image.id);
      delete objs.acorn1;
   }
}

function distance(c1,c2){
   return Math.sqrt((c1.g.p.x - c2.g.p.x)**2 +
                    (c1.g.p.y - c2.g.p.y)**2);
}

function circleCollisionCheck(c1,c2){
   let d = distance(c1,c2);
   if (c1.g.r + c2.g.r > d){
      c1.collide(c2);
      c2.collide(c1);
   }
}

function AllCircleCollisionCheck(){
   let arr = Object.values(objs); 
   for (i = 0; i < arr.length; i++){
      for (k = i+1; k < arr.length; k++){
         circleCollisionCheck(arr[i],arr[k]);
      }
   }
}

function update(){
   for (el of Object.values(objs)){
      el.g.update();
   }
   AllCircleCollisionCheck();
}

function createNewGameObject(PI, II, PC="",IC=""){
   let elPoint = document.createElement("div");
   elPoint.setAttribute("class", PC);
   elPoint.setAttribute("id", PI);
   document.body.insertBefore(elPoint, document.getElementById("insert"));

   let elImage = document.createElement("div");
   elImage.setAttribute("class", IC);
   elImage.setAttribute("id", II);
   elPoint.appendChild(elImage);

   domObjs.push();
}

const player = {point: Id('playerPoint'), image: Id('playerImage')};
const tree   = {point: Id('treePoint' + 1), image: Id('treeImage' + 1)};
const acorn1 = {point: Id('acornPoint' + 1), image: Id('acornImage' + 1)};
let domObjs = [player, tree, acorn1];

let objs = {};
objs.player = new Player(player,{x:100,y:100},25,1);
objs.tree   = new Tree(tree,{x:400,y:400},50,0);
objs.acorn1 = new Acorn(acorn1,{x:200,y:200},25,1);
say(Object.keys(objs));
//say(typeof player.point.id);

createNewGameObject('a', 'b');

const acorn2 = {point: document.createElement("div"),
                image: document.createElement("div")};

let epoch = Date.now();
const Delay = 2;
setInterval(update, Delay);

document.addEventListener('mousemove', 
(e)=>([mPos.x, mPos.y] = [e.clientX, e.clientY]));