const c = document.getElementById("sceneViewer");
const t = c.getContext("2d");

const Delay = 16; //milliseconds

class GameObj {
    constructor(o = {}){
        this.pos = {
            x: o.x ?? 0,
            y: o.y ?? 0
        }
        this.box = {
            w: o.w ?? 0,
            h: o.h ?? 0
        }
        this.scale = o.scale ?? 1;
        this.speed = o.speed ?? 0
    }
}

class Mover {
    constructor() {
    }
    moving = {
        left: false,
        right: false,
        up: false,
        down: false
    };
    motion(){};
    move(){};
    stop(){};
}

class Player {
    constructor(o) {
        this.obj = new GameObj(o);
        this.mover = new Mover(o);

    }
}

function updateObjs(){
    for (el of activeScene){
        el.update();
    }
}

function clearAll(){
    t.clearRect(0, 0, c.clientWidth, c.clientHeight);
}

function update(){
    clearAll();
    updateObjs();
}

function tick(){
    update();
    setTimeout(tick, Delay);
}

let inputs = {
    
}

let scenes = {};
scenes.main = [];
let activeScene = scenes.main;

let player = new Player({x: 500, y:500, });
scenes.main.push(player);

tick();