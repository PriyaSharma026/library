const booksContainer = document.querySelector("#books-container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const form = document.querySelector("form");

let myLibrary = [];

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

function handleDelete(id) {
  if(confirm("Are you sure you want to delete this book?")) {
    myLibrary = myLibrary.filter((book) => book.id != id);
    displayBooks();
  }
}

function displayBooks() {
  booksContainer.innerHTML = "";

  myLibrary.map((book) => {
    const bookCard = document.createElement('div')
    const topDiv = document.createElement('div');
    const titleHeading = document.createElement("h3");
    const authorPara = document.createElement("p");
    const pagesPara = document.createElement("p");
    const readDiv = document.createElement("div");
    const readLabel = document.createElement("label");
    const readInput = document.createElement("input");
    const sliderButton = document.createElement('span');
    const deleteBtn = document.createElement("button");

    bookCard.classList.add("book");
    readLabel.classList.add("switch");
    sliderButton.classList.add("slider");
    topDiv.classList.add("top-div");  
    readDiv.classList.add("read-div");  

    titleHeading.textContent = book.title;
    authorPara.textContent = `Author: ${book.author}`;
    pagesPara.textContent = `Pages: ${book.pages}`;
    readDiv.textContent = "Read Status"
    readInput.type = "checkbox";

    // Already checked if checked read status in form
    if (book.read) readInput.checked = true;
    
    // Update read status into myLibrary
    if (readInput.checked) book.read = true;
    else book.read = false;
    console.log("mylib", book);

    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
      </svg>`

    readDiv.appendChild(readLabel);
    readLabel.appendChild(readInput);
    readLabel.appendChild(sliderButton);

    topDiv.appendChild(titleHeading);
    topDiv.appendChild(deleteBtn);

    bookCard.appendChild(topDiv);
    bookCard.appendChild(authorPara);
    bookCard.appendChild(pagesPara);
    bookCard.appendChild(readDiv);
    booksContainer.appendChild(bookCard);
  
    deleteBtn.addEventListener('click', () => handleDelete(book.id));
  })
}

form.addEventListener("submit", (e) => {  
  addBookToLibrary(e, titleInput.value, authorInput.value,
  pagesInput.value, readInput.checked);

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;
})

