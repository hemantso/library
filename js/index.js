import books from './data';

const myLibrary = [];

function Book(title, author, pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
const findQueryAttachAction = (nameQuery, action) => {
  const selectedEl = document.querySelectorAll(nameQuery);
  selectedEl.forEach((el) => {
    el.onclick = action;
    el.style.cursor = 'pointer';
  });
};

function handleStatusChanges(e) {
  const statusSpan = e.currentTarget;
  statusSpan.innerText = 'Read';
  statusSpan.classList.remove('badge-secondary');
  statusSpan.classList.add('badge-success');
}
function handleDelete(e) {
  const RowId = e.currentTarget.id;
  myLibrary.splice(RowId, 1);
  renderTable(); // eslint-disable-line 
}
const renderTable = () => {
  const tableBody = document.getElementById('table-body');
  let talbeContent = '';
  myLibrary.forEach((el, index) => {
    const status = '<span class=" badge badge-pill status badge-secondary">Not Readed</span>';
    const del = `<span id=${index} class='del badge badge-pill badge-danger' >&times;</span>`;
    talbeContent += `<tr><td>${el.title}</td><td>${el.author}</td><td>${el.pages}</td><td>${status}</td> <td>${del}</td><tr>`;
  });
  tableBody.innerHTML = talbeContent;
  findQueryAttachAction('.status', handleStatusChanges);
  findQueryAttachAction('.del', handleDelete);
};

const addBookToLibrary = (title, author, pages) => {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  renderTable();
};
function handleClick() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  if (title && author && pages) {
    addBookToLibrary(title.value, author.value, pages.value);
    title.value = '';
    author.value = '';
    pages.value = '';
  } else {
    alert('Book has not been added because of the missing fields'); // eslint-disable-line no-alert
  }
}

window.onload = () => {
  books.forEach(({ title, author, pages }) => {
    addBookToLibrary(title, author, pages);
  });
  const createButton = document.querySelector('#create');
  createButton.onclick = handleClick;
};
