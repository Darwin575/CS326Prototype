console.log(sessionStorage.getItem('User'))
export function populateBookshelf(books) {
  
  const bookshelf = document.getElementById('bookshelf');
  bookshelf.innerHTML = ''; 
  books.forEach((book, index) => {
    const bookElement = document.createElement('article');
    bookElement.className = 'book';
    bookElement.innerHTML = `
      <div class="structure">
        <a href="#" data-index="${index}">
          <img src="${book.cover}" alt="${book.title}">
        </a>
      </div>
    `;
    bookshelf.appendChild(bookElement);

    const bookLink = bookElement.querySelector('a');
    bookLink.addEventListener('click', (e) => {
      e.preventDefault();
      const index = e.currentTarget.getAttribute('data-index');
      const book = books[index];
      const bookData = JSON.stringify(book);
      localStorage.setItem('selectedBook', bookData);
      window.location.href = 'bookPage.html';
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const searchResults = localStorage.getItem('searchResults');
  if (searchResults) {
    const books = JSON.parse(searchResults);
    populateBookshelf(books);
    localStorage.removeItem('searchResults');
  }
});