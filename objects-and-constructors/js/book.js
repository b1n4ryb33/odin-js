// ### DEFINITIONS ###
function Book(title, author, pages, wasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;

    this.info = function(){
        return `title: ${this.title}
author: ${this.author}
pages: ${this.pages}
Already Readed: ${this.wasRead ? "yes" : "no"}`;
    }
}

Book.prototype.print = function print_to_console(){
    console.log(this.info());
}

function addBookToLibrary(book, library){
  library.push(new Book(book.title, book.author, book.pages, book.wasRead));
}

function addBookToPage(book, nodeSelector){
  let new_book_node = document.createElement("div");
  new_book_node.classList.add("book");
  
  let book_title_node = document.createElement("h3");
  book_title_node.appendChild(document.createTextNode(book.title));

  let book_meta_node = document.createElement("div");
  book_meta_node.classList.add("book-meta");
  book_meta_node.appendChild(document.createTextNode(`Author: ${book.author}, Pages: ${book.pages}`));

  new_book_node.appendChild(book_title_node);
  new_book_node.appendChild(book_meta_node);
  document.querySelector(nodeSelector).appendChild(new_book_node);
}

// ### DATA ###
let books_data = [{title: "Kuenstliche Intelligenz", author: "Richard David Precht", pages: 320, wasRead: true}, {title: "Wer bin ich und wenn ja wieviele?", author: "Richard David Precht", pages: 550, wasRead: true}, {title: "Don Quijote", author: "Miguel de Cervantes", pages: 410, wasRead: false}, {title: "Oliver Twist", author: "Charles Dickens", pages: 210, wasRead: false}, {title: "Web Security", author: "Unknown", pages: 560, wasRead: false}];

// ### GLOBAL VARIABLES ###
let myLibrary = [];

// ### EXECUTION ###
// ## READ DATA ##
books_data.forEach(book => {
  addBookToLibrary(book, myLibrary);
})

myLibrary.forEach(book =>{
  addBookToPage(book, ".books-container");
  book.print();
})

// ## Add EventListener ##
let addNewBookModal = document.querySelector('#add-new-book-formular'); 

document.querySelector('.open-new-book-modal-btn').addEventListener('click', ()=>{
  addNewBookModal.style.display = "block";
});

document.querySelector('#add-new-book-formular span.close').addEventListener('click', ()=>{
  addNewBookModal.style.display = "none";
});

window.addEventListener("click", (event)=>{
  if(event.target == addNewBookModal){
    addNewBookModal.style.display = "none";
  }
});

document.querySelector('.add-new-book-btn').addEventListener('click', (e) => {
  e.preventDefault();
  
  addBookToLibrary(new Book(
                  document.querySelector('#book-creation-form-title').value,
                  document.querySelector('#book-creation-form-author').value,
                  document.querySelector('#book-creation-form-pages').value,
                  document.querySelector('#book-creation-form-was-read').value),
                  myLibrary);
  addBookToPage(myLibrary[myLibrary.length - 1], '.books-container');
  addNewBookModal.style.display = "none";
});
