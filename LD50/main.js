const c = document.getElementById("sceneViewer");
const t = c.getContext("2d");

const Delay = 16; //milliseconds

const rows = 12;
const columns = 9;
const xUnit = c.width/columns;
const yUnit = c.height/rows;

function getRandomColor(){
    return `rgb(${Math.floor(Math.random()*255)},
                ${Math.floor(Math.random()*255)},
                ${Math.floor(Math.random()*255)})`;
}

class CanvasObj {
    constructor(o){
        this.pos = {
            x: o.x ?? 0,
            y: o.y ?? 0
        }
        this.box = {
            w: o.w ?? 0,
            h: o.h ?? 0
        }
        this.scale = o.scale ?? 1;
    }  
}

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

class Cell {
    constructor(o){
        this.obj = new CanvasObj(o);
        this.color = o.color;
        this.player = false;
        this.dirt = true;
        this.bomb = false;
    }
}

class Grid {
    constructor (o){
        this.cells = [];
        this.createGrid();
    }
    createGrid(){
        let color;
        for (let i = 0; i < rows; i++){
            if (i % (rows/4) === 0){
                color = getRandomColor();
            }
            this.cells[i] = new Array(columns);
            for (let j = 0; j < columns; j++){
                this.cells[i][j] = new Cell({x: j*xUnit, y: i*yUnit, w: xUnit, h: yUnit, color: color});
            }
        }
    }
    draw(){
        t.beginPath();
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                t.fillStyle = this.cells[i][j].color ?? 'grey';
                t.fillRect(this.cells[i][j].obj.pos.x, this.cells[i][j].obj.pos.y, xUnit, yUnit);
                t.strokeStyle = 'black';
                t.strokeRect(this.cells[i][j].obj.pos.x, this.cells[i][j].obj.pos.y, xUnit, yUnit);
            }
        }
    }
    update(){
        this.draw();
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
        this.loc = grid.cells[this.obj.pos.x][this.obj.pos.y];
        this.loc.player = true;
        this.loc.dirt = false;
    }
    draw(){
        t.beginPath();
        t.fillStyle = 'teal';
        t.fillRect(this.loc.obj.pos.x, this.loc.obj.pos.y, this.obj.box.w, this.obj.box.h);
    }
    motion(){
        if (this.mover.moving.left){
            this.loc.player = false;
            this.obj.pos.x--;
            this.loc = grid.cells[this.obj.pos.x][this.obj.pos.y];
            this.loc.player = true;
        }
        else if (this.mover.moving.right){
            this.loc.player = false;
            this.obj.pos.x++;
            this.loc = grid.cells[this.obj.pos.x][this.obj.pos.y];
            this.loc.player = true;
        }
        else if (this.mover.moving.up){
            this.loc.player = false;
            this.obj.pos.y--;
            this.loc = grid.cells[this.obj.pos.x][this.obj.pos.y];
            this.loc.player = true;
        }
        else if (this.mover.moving.down){
            this.loc.player = false;
            this.obj.pos.y++;
            this.loc = grid.cells[this.obj.pos.x][this.obj.pos.y];
            this.loc.player = true;
        }
    }
    move(e){
        if (this.mover.moving.left === false && 
            this.mover.moving.right === false &&
            this.mover.moving.up === false &&
            this.mover.moving.down === false){
            switch (e.key){
                case 'ArrowLeft':
                    this.mover.moving.left = true;
                    break;
                case 'ArrowRight':
                    this.mover.moving.right = true;
                    break;
                case 'ArrowUp':
                    this.mover.moving.up = true;
                    break;
                case 'ArrowDown':
                    this.mover.moving.down = true;
                    break;
            }
        }
    }
    stop(e){
        switch (e.key){
            case 'ArrowLeft':
                this.mover.moving.left = false;
                break;
            case 'ArrowRight':
                this.mover.moving.right = false;
                break;
            case 'ArrowUp':
                this.mover.moving.up = false;
                break;
            case 'ArrowDown':
                this.mover.moving.down = false;
                break;
        }
    }
    update(){
        this.draw();
        this.motion();
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

let scenes = {};
scenes.main = [];
let activeScene = scenes.main;

let grid = new Grid();
let player = new Player({x: 3, y: 3, w: xUnit/2, h: yUnit/2, speed: 5});

scenes.main.push(grid);
scenes.main.push(player);

let inputs = {
    playerMove: document.addEventListener('keydown', player.move?.bind(player)),
    playerStop: document.addEventListener('keyup', player.stop?.bind(player)),
}

tick();