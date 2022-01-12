function animal(name, type){
  this.name = name;
  this.type = type;
}

animal.prototype.info = function(){
  for(let key in this){
    console.log(`Key: ${key}, Value: ${this[key]}`);
  }
}

function fish(){
  this.swim = function(){
    console.log(`${this.name} can swim.`);
  }
}

function bird(){
  this.fly = function(){
    console.log(`${this.name} can fly.`);
  }
}

fish.prototype = Object.create(animal.prototype);
bird.prototype = Object.create(animal.prototype);

let flappy = new bird("flappy", "bird");
flappy.info();
flappy.fly();

let bubbles = new fish("bubbles", "fish");
bubbles.info();
bubbles.swim();

