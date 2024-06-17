import { books } from "../mock-database/mock_data.js";
import { populateBookshelf } from './book_shelf.js';
const user = sessionStorage.getItem('User')
document.addEventListener('DOMContentLoaded', () => {
  // Display welcome message
  const storedActive = localStorage.getItem('active');
  if (storedActive) {
    const active = JSON.parse(storedActive);
    const user = active[active.length - 2];
    document.querySelector('#welcome-message').textContent = `Welcome, ${user}!`;
  }

  // Handle logout
  const logoutBtn = document.querySelector('.btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = "../clientUI/index.html";
    });
  }

  // Populate bookshelf on StudentHomePage
  if (document.getElementById('student-home-page') || document.getElementById('admin-home-page')) {
    populateBookshelf(books);
  }

  // Add search functionality
  const searchInput = document.getElementById('search-input');
  const suggestionList = document.getElementById('suggestion-list');

  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('keydown', handleEnter);

  function handleSearch() {
    const searchValue = searchInput.value.toLowerCase();
    const suggestions = books.filter(book =>
      book.title.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue)
    );
    showSuggestions(suggestions);
  }

  function showSuggestions(suggestions) {
    suggestionList.innerHTML = '';
    if (suggestions.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No suggestions found';
      suggestionList.appendChild(li);
    } else {
      suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = `${suggestion.title}`;
        li.addEventListener('click', () => {
          searchInput.value = `${suggestion.title}`;
          suggestionList.innerHTML = '';

          if (document.getElementById('student-home-page')) {
            populateBookshelf([suggestion]);
          } else {
            localStorage.setItem('searchResults', JSON.stringify([suggestion]));
            if(user == 'Admin' && document.getElementById('book-page')) {
                console.log('True')
              window.location.href = 'AdminHomePage.html';
            } else if (document.getElementById('book-page')) {
                window.location.href = 'StudentHomePage.html';
            }
 
          }
        });
        suggestionList.appendChild(li);
      });
    }
    adjustSuggestionListHeight();
  }

  function adjustSuggestionListHeight() {
    const suggestionItems = suggestionList.querySelectorAll('li');
    const itemHeight = suggestionItems.length > 0 ? suggestionItems[0].offsetHeight : 0;
    const maxHeight = Math.min(suggestionItems.length * itemHeight, 300);
    suggestionList.style.maxHeight = `${maxHeight}px`;
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchValue = searchInput.value.toLowerCase();
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.category.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
      );

      if (document.getElementById('book-page')) {
        localStorage.setItem('searchResults', JSON.stringify(filteredBooks));
        window.location.href = 'StudentHomePage.html';
      } else {
        populateBookshelf(filteredBooks);
      }

      suggestionList.innerHTML = '';
    }
  }
});
