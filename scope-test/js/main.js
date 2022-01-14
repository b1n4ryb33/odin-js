function logSomething(something){
    console.log(something);
}

// gets invoked and not added as eventlistener cause of function arguments
document.querySelector('h1').addEventListener('click', logSomething('Im a heading.'), false);
// gets added to eventlisteners cause of bind which allows function arguments
document.querySelector('h1').addEventListener('click', logSomething.bind(undefined, 'Im a heading.'), false);

let module = (function(){
    var myModule ={};

    var _privateMethod = function(){console.log('yeah baby 🚀')};
    myModule.publicMethod = function(){_privateMethod();};

    return myModule;
})();

module.publicMethod();
module._privateMethod();