// ### Business Logic - Model ###
function book(title, author, pages, wasRead){
    let self = this;
    self.title = title;
    self.author = author;
    self.pages = pages;
    self.wasRead = wasRead;

    self.info = function(){
        return  `title: ${this.title}\n` +
                `author: ${this.author}\n` +
                `pages: ${this.pages}\n` +
                `Already Readed: ${this.wasRead ? "yes" : "no"}`;
    }
}

function library(books=[]){
  let self = this;

  self.books = books;
  
  self.addBook = function(book){
    self.books.push(book);
  }

  self.addBookByData = function(title, author, pages, wasRead){
    self.addBook(new book(title, author, pages, wasRead));
  }

  self.addBookByJSON = function(book){
    self.addBookByData(book.title, book.author, book.pages, book.wasRead);
  }

  self.deleteBook = function(book){
    self.books = removeFromArray(self.books, book);
  }

  self.deleteBookByTitle = function (bookTitle){
    self.books = self.books.filter(book => book.title != bookTitle);
  }

  self.applyHandlers = function(newBookSelector, deleteBookSelector, libraryController, bookFormController){

    document.querySelector(newBookSelector).addEventListener('click', (e) => {
      e.preventDefault();
      
      self.addBookByData(document.querySelector('#book-creation-form-title').value,
                      document.querySelector('#book-creation-form-author').value,
                      document.querySelector('#book-creation-form-pages').value,
                      document.querySelector('#book-creation-form-was-read').value);
      
      bookFormController.closeModal();
      libraryController.displayLibrary(self);
    });

    let deletebuttons = document.querySelectorAll(deleteBookSelector);
    
    deletebuttons.forEach(deletebtn => { 
      deletebtn.addEventListener('click', (e) => {
        e.preventDefault();
        self.deleteBookByTitle(e.target.parentNode.dataset.key);
        libraryController.displayLibrary(self);
    })});
  }

}

// ### Controller ### 
function libraryController(libraryNodeSelector='body'){
  let self = this;

  self.libraryNodeSelector = libraryNodeSelector;

  self.displayLibrary = function(library=new library(), nodeSelector=self.libraryNodeSelector){
    if(!library.books){
      throw new Error('Library has no books array.');
    }
    document.querySelector(nodeSelector).innerHTML = "";
    library.books.forEach(book => self.addBookToDisplay(book, nodeSelector));
  }

  self.addBookToDisplay = function(book, nodeSelector=self.libraryNodeSelector){
    let template = `<div class="book" data-key="${book.title}">`+
                   `<h3>${book.title}</h3><span class="close">&times;</span>`+
                   `<div class="book-meta"><p>Author: ${book.author}, Pages: ${book.pages}</p></div></div>`;
    
    document.querySelector(nodeSelector).innerHTML += template;
  }

}

function bookFormController(modalSelector='body', openSelector, closeSelector){
  let self = this;

  self.bookModal = document.querySelector(modalSelector);
  self.openSelector = openSelector;
  self.closeSelector = closeSelector;

  self.init = function(){

    document.querySelector(self.openSelector).addEventListener('click', ()=>{
      self.openModal();
    });

    document.querySelector(self.closeSelector).addEventListener('click', ()=>{
      self.closeModal();
    });

    window.addEventListener("click", (event)=>{
      if(event.target ==  self.bookModal){
        self.closeModal();
      }
    });
  }

  self.closeModal = function(){
    self.bookModal.style.display = "none";
  }

  self.openModal = function(){
    self.bookModal.style.display = 'block';
  }
}

// ### Helper functions ###
const removeFromArray = function(...args) {
  const array = args[0];
  return array.filter(value => !args.includes(value));    
}

// ### DATA ###
let books_data = [{title: "Kuenstliche Intelligenz", author: "Richard David Precht", pages: 320, wasRead: true}, {title: "Wer bin ich und wenn ja wieviele?", author: "Richard David Precht", pages: 550, wasRead: true}, {title: "Don Quijote", author: "Miguel de Cervantes", pages: 410, wasRead: false}, {title: "Oliver Twist", author: "Charles Dickens", pages: 210, wasRead: false}, {title: "Web Security", author: "idk", pages: 560, wasRead: false}];

// ### GLOBAL VARIABLES ###
let myLibrary = new library();
let myLibraryController = new libraryController('.books-container');
let myBookFormController = new bookFormController('#add-new-book-formular',
                                '.open-new-book-modal-btn',
                                '#add-new-book-formular span.close');

// ### EXECUTION ###
// ## READ DATA ##
books_data.forEach(book => {
  myLibrary.addBookByJSON(book);
});

// ## Initial Display ##
myBookFormController.init();
myLibraryController.displayLibrary(myLibrary);

myLibrary.applyHandlers('.add-new-book-btn', 'div.book span.close', myLibraryController, myBookFormController);
