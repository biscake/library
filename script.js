const myLibrary = [];

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.read = false;
    }

    setRead() {
        this.read ? this.read = false : this.read = true;
    }

}


function addBookToLibrary(book) {
    myLibrary.push(book);
}

const card = document.createElement("div");
card.classList.add("book");

const removeBook = document.createElement("button");
removeBook.classList.add("remove");
removeBook.setAttribute("value", "remove")
removeBook.textContent = "X";

const readBtn = document.createElement("button");
readBtn.classList.add("readbtn");
readBtn.setAttribute("value", "read");
readBtn.textContent = "Read";


card.appendChild(removeBook);
card.appendChild(readBtn);

function updateBook() {
    const main = document.querySelector("main");
    main.innerHTML = "";
    myLibrary.forEach(book => {
        const title = document.createElement("div");
        title.classList.add("title");
        const author = document.createElement("div");
        author.classList.add("author");
        title.textContent = book.title;
        author.textContent = book.author;
        const bookCard = card.cloneNode(true);

        bookCard.addEventListener("click", (event) => {
            if (event.target.value === "remove") {
                const bookTitle = event.target.nextSibling.textContent;
                delBook(bookTitle);
            }
        })

        bookCard.addEventListener("click", (event) => {
            if (event.target.value === "read") {
                bookCard.classList.toggle("read");
                book.read = !book.read;
                console.log(myLibrary);
            }
        })
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        main.appendChild(bookCard); 
    });
}


const showNewBook = document.querySelector("#newbook");
const bookModal = document.querySelector("#newbookmodal");
const closeModal = document.querySelector("#cancel");
const form = document.querySelector("form");
const submitBook = document.querySelector("#submit");

let toUpdate = false;

function delBook(bookTitle) {
    const findIdx = (book) => book.title === bookTitle;
    const idx = myLibrary.findIndex(findIdx);
    myLibrary.splice(idx,1);
    updateBook();
}

showNewBook.addEventListener("click", (e) => {
    bookModal.showModal();
});

bookModal.addEventListener("close", (e) => {
    if (toUpdate) {    
        const book = new Book(form.title.value, form.author.value);
        addBookToLibrary(book);
        updateBook();
        console.log(myLibrary);
    }
    form.title.value = "";
    form.author.value = "";
})

closeModal.addEventListener("click", (event) => {
    toUpdate = false;
    event.preventDefault();
    bookModal.close()
})

submitBook.addEventListener("click", (e) => {
    e.preventDefault();
    if (form.title.value) {
        toUpdate = true;
        bookModal.close();
    }
    else {
        form.title.classList.add("error");
    }
})

form.title.addEventListener("input", (event) => {
    form.title.classList.remove("error");
})