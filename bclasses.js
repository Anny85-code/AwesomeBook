const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

class Book {
  constructor(title, author, id = undefined) {
    this.title = title;
    this.author = author;
    if (id !== undefined) {
      this.id = id;
    }
  }

  getCode() {
    return ` <tr>
              <td>"${this.title}" by ${this.author}</td>
              <td><button class='remove' data-id='${this.id}'>Remove</td>
              </tr>`;
  }

  static add(book) {
    const bookItems = this.getAllBooks();
    let id = 1;
    if (bookItems.length > 0) {
      id = bookItems[bookItems.length - 1].id + 1;
    }
    book.id = id;
    bookItems.push(book);
    saveToLocalStorage('bookItems', bookItems);
  }

  static remove(id) {
    let bookItems = this.getAllBooks();
    bookItems = bookItems.filter((b) => b.id !== Number(id));
    saveToLocalStorage('bookItems', bookItems);
  }

  static getAllBooks() {
    let bookItems = getFromLocalStorage('bookItems');
    if (bookItems === null) {
      bookItems = [];
    }
    return bookItems;
  }
}

function displayBooks() {
  const bookItems = Book.getAllBooks();

  const booksCode = bookItems.map((book) => new Book(book.title, book.author, book.id).getCode());
  document.getElementById('bitems').innerHTML = booksCode.join('');

  const removeButtons = Array.from(document.querySelectorAll('.remove'));
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      Book.remove(id);
      displayBooks();
    });
  });
}

displayBooks();

const titleInput = document.getElementById('btitle');
const authorInput = document.getElementById('bauthor');
document.getElementById('bookslist').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }

  const book = new Book(title, author);
  Book.add(book);
  displayBooks();
});

const listElement = document.getElementById('list');
const formElement = document.getElementById('newbook');
const contactElement = document.getElementById('contact');
const listBody = document.querySelector('.header');
const formBody = document.querySelector('.form');
const contactBody = document.querySelector('.contactsection');

listElement.addEventListener('click', () => {
  listBody.style.display = 'block';
  formBody.style.display = 'none';
  contactBody.style.display = 'none';
});

formElement.addEventListener('click', () => {
  formBody.style.display = 'block';
  listBody.style.display = 'none';
  contactBody.style.display = 'none';
});

contactElement.addEventListener('click', () => {
  contactBody.style.display = 'flex';
  listBody.style.display = 'none';
  formBody.style.display = 'none';
});

window.addEventListener('load', () => {
  const { DateTime } = luxon; /* eslint-disable-line no-undef */
  this.today = DateTime.now();
  document.getElementById('times').textContent = this.today.toLocaleString(
    DateTime.DATETIME_MED
  );
});
