const booksContainer = document.querySelector("#books-container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
}

function addBookToLibrary(e, title, author, pages, isRead) {
  e.preventDefault(); 
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  booksContainer.innerHTML = "";

  myLibrary.map((book) => {
    const bookCard = document.createElement('div')
    const titleHeading = document.createElement("h2");
    const authorPara = document.createElement("p");
    const pagesPara = document.createElement("p");
    const readPara = document.createElement("p");

    titleHeading.textContent = book.title;
    authorPara.textContent = `Author: ${book.author}`;
    pagesPara.textContent = `Pages: ${book.pages}`;
    readPara.textContent = `Read: ${book.read}`;

    bookCard.appendChild(titleHeading);
    bookCard.appendChild(authorPara);
    bookCard.appendChild(pagesPara);
    bookCard.appendChild(readPara);
    booksContainer.appendChild(bookCard);
  })
}

form.addEventListener("submit", (e) => {
  const isRead = readInput.checked ? "Yes" : "No";
  addBookToLibrary(e, titleInput.value, authorInput.value, pagesInput.value, isRead);
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;
})

