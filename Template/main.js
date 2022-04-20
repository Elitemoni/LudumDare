//http://localhost:5500/

/*
About
DOM Object-Oriented template for web games
*/

/*
Reminders
document.documentElement.style.getPropertyValue("--playerScale");
document.documentElement.style.setProperty("--playerScale", 3);
*/

/*
Todo
Movement
Collisions
*/

const Delay = 2;
const DiagScalar = 0.707;
//const dt = 1 //alter this later
let t = Date.now();
let dt;
let objs = [];

class GameObject{
   constructor(o,v,a){
      this.id = o.id;
      this.p = {x: o.style.left, y: o.style.top};
      this.v = {x: v.x, y: v.y};
      this.a = {x: a.x, y: a.y};
   }

   die(){
      alert(this.name + ' died');
   }
}

function physicsStep(o){ //make this simulatenous instead of sequential by adding to a virtual space
   //o.p.x = o.p.x + (o.v.x)*dt + (o.a.x)*dt*dt/2
   o.v.x = o.v.x + o.a.x;
   o.p.x = o.p.x + o.v.x;
   document.getElementById(o.id).style.left = o.p.x + 'px';
}

function step(){
   for (let i = 0; i < objs.length; i++){
      physicsStep(objs[i]);
   }
}

function update(){
   step();
   //checkOverlap();
}

player = document.getElementById("player");
playerO = new GameObject(player,{x:2,y:2},{x:0,y:0});
objs.push(playerO);
console.log(player);
console.log(player.style);
console.log(player.style.left);
console.log(objs[0]);

dt = (Date.now() - t)/1000;
//setInterval(update, Delay);
player.style.left = 300+'px';