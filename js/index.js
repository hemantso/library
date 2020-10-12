import books from './data.js'; // eslint-disable-line

const myLibrary = [];

function Book(title, author, pages, status = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const addBookToLibrary = (title, author, pages, status) => {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
	renderTable(); // eslint-disable-line
};

const findQueryAttachAction = (nameQuery, action) => {
  const selectedEl = document.querySelectorAll(nameQuery);
  selectedEl.forEach((el) => {
    el.onclick = action;
    el.style.cursor = 'pointer';
  });
};

function handleStatusChanges(e) {
  const statusSpan = e.currentTarget;
  if (statusSpan.innerText === 'Not Readed') {
    statusSpan.innerText = 'Read';
    statusSpan.classList.add('badge-success');
  } else {
    statusSpan.innerText = 'Not Readed';
    statusSpan.classList.remove('badge-success');
  }
}

const getBookStatus = (status) => {
  const bookStatus = status ? 'Read' : 'Not Readed';
  const bookClass = status ? 'badge-success' : 'badge-secondary';
  return `<span class=" badge badge-pill status ${bookClass}">${bookStatus}</span>`;
};

const renderTable = () => {
  const tableBody = document.getElementById('table-body');
  let talbeContent = '';
  myLibrary.forEach((el, index) => {
    const del = `<span id=${index} class='del badge badge-pill badge-danger' >&times;</span>`;
    talbeContent += `<tr><td>${el.title}</td><td>${el.author}</td><td>${
      el.pages
    }</td><td>${getBookStatus(el.status)}</td> <td>${del}</td><tr>`;
  });
  tableBody.innerHTML = talbeContent;
  findQueryAttachAction('.status', handleStatusChanges);
	findQueryAttachAction('.del', handleDelete); // eslint-disable-line
};

function handleDelete(e) {
  const RowId = e.currentTarget.id;
  myLibrary.splice(RowId, 1);
  renderTable();
}

function handleClick() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const status = document.querySelector('#checkbox');
  if (title && author && pages) {
    addBookToLibrary(title.value, author.value, pages.value, status.checked);
    title.value = '';
    author.value = '';
    pages.value = '';
    status.checked = false;
  } else {
		alert('Book has not been added because of the missing fields'); // eslint-disable-line
  }
}

window.onload = function () {  // eslint-disable-line	
  books.forEach(({ title, author, pages }) => {
    addBookToLibrary(title, author, pages);
  });
  const createButton = document.querySelector('#create');
  createButton.onclick = handleClick;
};
