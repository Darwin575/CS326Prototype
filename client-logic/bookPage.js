import { interactions, downloads } from "../mock-database/mock_data.js";
const storedActive = localStorage.getItem('active'); 
const active = JSON.parse(storedActive);
const user = active[active.length - 2];
document.addEventListener('DOMContentLoaded', () => {
    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
        const book = JSON.parse(storedBook);
        document.getElementById('book-cover').src = book.cover;
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-description').textContent = book.description;
        document.getElementById('book-author').textContent = `Author: ${book.author}`;
        document.getElementById('book-published').textContent = `Published: ${book.published}`;
        
        const downloadUrl = book.file_link;
        const downloadButton = document.getElementById('download-button');
        downloadButton.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = downloadUrl;
            downloads.push("Username: " + user + ", Dowloaded: " + book.title)
            localStorage.setItem('downloads', JSON.stringify(downloads));
            a.download = book.title;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // Handle rating
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = e.target.getAttribute('data-value');
            alert(`You rated this book ${rating} stars!`);
        });
    });

    // Handle comments
    const addCommentButton = document.getElementById('add-comment-button');
    addCommentButton.addEventListener('click', () => {
        
        const commentInput = document.getElementById('comment-input');
        const commentList = document.getElementById('comment-list');
        const commentText = commentInput.value.trim();
        
        if (commentText && user) {
            const book = JSON.parse(storedBook);
            interactions.push("Username: " + user + ", Book's title: " + book.title + ", Comment: " + commentText)
            localStorage.setItem('interactions', JSON.stringify(interactions));
            console.log(interactions)
            const commentItem = document.createElement('li');
            commentItem.textContent = `${user}: ${commentText}`; 
            commentList.appendChild(commentItem);
            commentInput.value = '';
        }
    });
    
});