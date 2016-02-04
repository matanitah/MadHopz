'use strict'
var canvas = document.getElementById('myCanvas')
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
paper.install(window); //paperscript setup
// paper.setup(canvas);
console.log(window.clientWidth);

class Entity {
  //pos is position, vel is velocity, acc is acceleration, color is color and body is body
  constructor(pos, vel, acc, color, body) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.color = color;
    this.body = body;
  }
  get x() {
    return this.pos[0];
  }
  set x(value) {
    this.pos[0] = value;
  }
  get y() {
    return this.pos[1];
  }
  set y(value) {
    this.pos[1] = value;
  }
  get vx() {
    return this.vel[0];
  }
  set vx(value) {
    this.vel[0] = value;
  }
  get vy() {
    return this.vel[1];
  }
  set vy(value) {
    this.vel[1] = value;
  }
  get ax() {
    return this.acc[0];
  }
  set ax(value) {
    this.acc[0] = value;
  }
  get ay() {
    return this.acc[1];
  }
  set ay(value) {
    this.acc[1] = value;
  }
  update() {

  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx += this.ax;
    this.vy += this.ay;

    this.body.position = new Point(this.x, this.y)
  }
}
class Frog extends Entity {
  constructor() {
    // new Path.Rectangle(new Point(50, 50), new Point(200, 200))
    super([500, 500], [0, 0], [0, 0], '#4de40f', new Path.Rectangle({
      point: [500, 500],
      size: [50, 50],
    }))
    this.body.fillColor = this.color;
  }
  update() {
    //move up when user hits 'up'
    if (Key.isDown('up')) {
      this.vy = -10;
      // this.y += this.vy;
    } else {
      // this.vy = 0; //if not pressing anything, velocity is 0
    }
    //move down when user hits 'down'
    if (Key.isDown('down')) {
      this.vy = 10;
      // this.y += this.vy;
    } else {
      // this.vy = 0; //if not pressing anything, velocity is 0
    }
    //move right when user hits 'right'
    if (Key.isDown('right')) {
      this.vx = 10;
      // this.x += this.vx;
    } else {
      // this.vx = 0; //if not pressing anything, velocity is 0
    }
    if (Key.isDown('left')) {
      this.vx = -10;
      // this.x += this.vx;
    } else {
      // this.vx = 0; //if not pressing anything, velocity is 0
    }
  }
}
class Fly extends Entity {
  constructor() {
    super([Math.random() * 5000, Math.random() * 3000], [0, 0], [0, 0], '#2f2e2f', new Path.Circle(new Point(100, 70), 50));
    this.body.fillColor = this.color;
  }
}
class World {
  constructor() {
    this.entities = [];
    this.numFlies = 10;

    this.makeFlies();
  }

  makeFlies() {
    for (var i = 0; i < this.numFlies; i++) {
      this.entities.push(new Fly());

    }
    this.entities.push(new Frog());
  }

  update(event) {
    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      entity.ay = 0;
      entity.ax = 0;
      entity.move();
      entity.update();
      if (entity.y >= view.height && entity.x >= view.width) {
        console.log('halp');
        entity.y = view.height;
        entity.x = view.width;
      }
    }
  }
}
// var frog = new Frog();
var world = new World();

view.onFrame = function(event) {
  // frog.update(); //calls the function update
  // frog.move(); //calls the function move
  world.update(event);

}
