/* eslint-disable max-classes-per-file */

const hamburger = document.querySelector('.hamburger');
const navmenu = document.querySelector('.navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navmenu.classList.toggle('active');
});

document.querySelectorAll('.navLink').forEach((n) => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navmenu.classList.remove('active');
}));

/* eslint-disable max-classes-per-file */

// Class representing a Book with title and author properties
class Book {
  constructor(title, author) {
    this.title = title; // Set the title of the book
    this.author = author; // Set the author of the book
  }
}

// Class to manage a list of books
class BookManager {
  constructor() {
    // Load books from localStorage, if available
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookListElement = document.getElementById('book-list'); // Reference to the HTML element where the book list will be displayed
    this.dialogueBox = document.getElementById('dialogue-box'); // Reference to the dialogue box for empty list message
    if (this.bookListElement) this.render(); // Initial render to display any saved books
  }

  // Method to add a book to the list and render the updated list
  addBook(book) {
    this.books.push(book); // Add the new book to the books array
    this.saveBooks();
    this.render(); // Call render to update the book list display
  }

  // Method to remove a book from the list by its index and render the updated list
  removeBook(index) {
    this.books.splice(index, 1); // Remove the book at the specified index from the books array
    this.saveBooks();
    this.render(); // Call render to update the book list display
  }

  saveBooks() {
    // Save the current list of books to localStorage
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Method to render the book list
  // Method to render the book list
  render() {
    if (!this.bookListElement) return; // Return if there is no book list element
    this.bookListElement.innerHTML = ''; // Clear the current content of the book list element

    // Display message if no books are available
    if (this.books.length === 0) {
      this.dialogueBox.style.display = 'block';
    } else {
      this.dialogueBox.style.display = 'none';

      // Create a single outer container with a border
      const outerContainer = document.createElement('div');
      outerContainer.className = 'outer-container';

      // Loop through the books array using a for loop
      for (let index = 0; index < this.books.length; index += 1) {
        const book = this.books[index]; // Get the current book
        const bookItem = document.createElement('div'); // Get the value of the author input field
        bookItem.className = 'book-item'; // Set the class for styling
        bookItem.style.backgroundColor = index % 2 === 0 ? 'rgb(203 198 188)' : 'white'; // Apply alternating background colors
        bookItem.innerHTML = `
                <span>${book.title} by: ${book.author}</span>
                <button onclick="bookManager.removeBook(${index})">Remove</button>
            `; // Set the inner HTML to display the book's title, author, and a remove button

        outerContainer.appendChild(bookItem); // Append the book item to the outer container
      }

      this.bookListElement.appendChild(outerContainer); // Apend d outa contana 2 d book lst element
    }
  }
}

// Initialize BookManager on the home page
const bookManager = new BookManager();

// Add an event listener to the book form on the add book page to handle form submission
const bookForm = document.getElementById('book-form');
if (bookForm) {
  bookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const title = document.getElementById('title').value; // Get the value of the title input field
    const author = document.getElementById('author').value; // Get the value of the author input field
    const newBook = new Book(title, author); // Cr8 a nw Buk instans wit d provided title and author
    bookManager.addBook(newBook); // Add the new book to the book manager
    this.reset(); // Reset the form fields
  });
}
