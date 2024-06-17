import { populateBookshelf } from '../client-logic/book_shelf.js';
import { books } from '../mock-database/mock_data.js';
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').addEventListener('click', (e) => {
        e.preventDefault();
        loadHomeContent();
    });

});

function loadHomeContent() {
    populateBookshelf(books); // Pass the books data
}



