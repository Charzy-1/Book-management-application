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
    this.render(); // Initial render to display any saved books
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
  render() {
    this.bookListElement.innerHTML = ''; // Clear the current content of the book list element
    // Loop through the books array using a for loop
    for (let index = 0; index < this.books.length; index += 1) {
      const book = this.books[index]; // Get the current book
      const bookItem = document.createElement('div'); // Create a new div element for the book item
      bookItem.className = 'book-item'; // Set the class for styling
      bookItem.innerHTML = `
        <span>${book.title} by: ${book.author}</span>
        <button onclick="bookManager.removeBook(${index})">Remove</button>
      `; // Set the inner HTML to display the book's title, author, and a remove button
      this.bookListElement.appendChild(bookItem); // Append the book item to the book list element
    }
  }
}

// Create an instance of the BookManager class
const bookManager = new BookManager();

// Add an event listener to the book form to handle form submission
document.getElementById('book-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const title = document.getElementById('title').value; // Get the value of the title input field
  const author = document.getElementById('author').value; // Get the value of the author input field
  const newBook = new Book(title, author); // Cr8 new Book instans wit d provided title and author
  bookManager.addBook(newBook); // Add the new book to the book manager
  this.reset(); // Reset the form fields
});
