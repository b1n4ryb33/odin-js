// Delegatenprototyp über Klassen
// Nicht zu empfehlen, da es einige drawbacks hat
// Erstellt eine Funktion mit einer Property name
// Setzt den Prototypen auf Object der Konstruktorfunktion Klasse Greeter
// Der Prototyp hat die shared function hello

let classDelegationPrototyp = function(){
    class Greeter {
        constructor (name) {
            this.name = name || 'John Doe';
        }
        hello () {
            return `Hello, my name is ${ this.name }`;
        }
    }
    
    const george = new Greeter('George');
    
    const msg = george.hello();
    
    console.dir(george);
    console.log(msg); // Hello, my name is George
}

classDelegationPrototyp();

// Delegatenprototyp über ES5 constructor Funktionen
// Nicht zu empfehlen, da es einige drawbacks hat
// Erstellt eine Funktion mit einer Property name
// Setzt den Prototypen auf Object mit der Konstruktorfunktion Greeter
// Der Prototyp hat die shared function hello

let es5ConstructorDelegeationPrototyp = function(){   
    function Greeter (name) {
        this.name = name || 'John Doe';
    }
    
    Greeter.prototype.hello = function hello () {
        return 'Hello, my name is ' + this.name;
    }
    
    var george = new Greeter('George');
    
    var msg = george.hello();
    
    console.dir(george);
    console.log(msg); // Hello, my name is George
}

es5ConstructorDelegeationPrototyp();

// Delegatenprototyp über Factory Funktionen
// Der präferierte Weg
// Erstellt ein Objekt mit der Property name
// Setzt den Prototypen auf Objekt ohne Konstruktorfunktion
// Prototyp hat die shared function hello

let factoryFunctionDelegeationPrototyp = function () {
    // Objekt von dem wir erben wollen
    const proto = {
        hello() {
            return `Hello, my name is ${this.name}`;
        }
    };

    // factory function, die aus dem Prototypen und einer eigenen property ein neues Objekt macht.
    const greeter = (name) => Object.assign(Object.create(proto), {name});

    const george = greeter('george');

    const msg = george.hello();
    console.dir(george);
    console.log(msg);
}

factoryFunctionDelegeationPrototyp();

let concatenativeInheritance= function (){
    const proto = {
        hello: function hello() {
          return `Hello, my name is ${ this.name }`;
        }
      };
      
      const george = Object.assign({}, proto, {name: 'George'});
      
      const msg = george.hello();
      
      console.dir(george);
      console.log(msg); // Hello, my name is George
}

concatenativeInheritance();

let functionalMixin = function () {
    // import Events from 'eventemitter3';

    const rawMixin = function () {
        const attrs = {};

        // Objekt wird erzeugt aus this, methoden, event.prototype
        return Object.assign(this, {
            set (name, value) {
            attrs[name] = value;

            this.emit('change', {
                prop: name,
                value: value
            });
            },

            get (name) {
                return attrs[name];
            }
        }, Events.prototype);
    };

    const mixinModel = (target) => rawMixin.call(target);

    const george = { name: 'george' };
    const model = mixinModel(george);

    model.on('change', data => console.log(data));

    model.set('name', 'Sam');
}

// functionalMixin();