import { downloads, interactions } from "../mock-database/mock_data.js";

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
            downloads.push(user + " - Downloaded: " + book.title)
            localStorage.setItem('downloads', JSON.stringify(downloads));
            a.download = book.title;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // Handle rating
    const btn = document.getElementById("btn");
    const post = document.querySelector(".post");
    const widget = document.querySelector(".star-widget");
    const editBtn = document.querySelector(".edit");
    const textarea = document.querySelector(".comment");
    const stars = document.querySelectorAll("input[name='rate']");
    const userFeedback = document.querySelector(".user-feedback");
    const feedbackList = document.querySelector(".feedback-list");

    const bookId = JSON.parse(storedBook).title; // Use book title as unique identifier

    // Function to display feedback in star form
    function displayStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<span class="fas fa-star checked"></span>';
            } else {
                starsHtml += '<span class="fas fa-star"></span>';
            }
        }
        return starsHtml;
    }

    // Function to load and display stored feedback
    function loadFeedback() {
        const feedbacks = JSON.parse(localStorage.getItem(bookId)) || [];
        feedbackList.innerHTML = '';
        feedbacks.forEach((feedback, index) => {
            const feedbackDiv = document.createElement("div");
            feedbackDiv.innerHTML = `
                <p><strong>${feedback.username}</strong></p>
                <p>${displayStars(feedback.rating)}</p>
                <p>${feedback.comment}</p>
                <div class="reply"></div>
                <hr>
            `;
            if (sessionStorage.getItem('User') === 'Admin') {
                const replyInput = document.createElement("textarea");
                replyInput.placeholder = "Admin reply...";
                const replyButton = document.createElement("button");
                replyButton.textContent = "Reply";
                replyButton.onclick = () => {
                    const replyText = replyInput.value;
                    feedback.reply = replyText;
                    localStorage.setItem(bookId, JSON.stringify(feedbacks));
                    loadFeedback();
                };
                feedbackDiv.querySelector(".reply").appendChild(replyInput);
                feedbackDiv.querySelector(".reply").appendChild(replyButton);
            }
            if (feedback.reply) {
                const replyText = document.createElement("p");
                replyText.innerHTML = `<strong>Admin:</strong> ${feedback.reply}`;
                feedbackDiv.querySelector(".reply").appendChild(replyText);
            }
            feedbackList.appendChild(feedbackDiv);
        });
    }

    // Initial load of feedbacks
    loadFeedback();

    btn.onclick = () => {
        let selectedRate;
        stars.forEach((star) => {
            if (star.checked) {
                selectedRate = star.id.split('-')[1]; // Get the rating value
            }
        });

        const comment = textarea.value; // Get the comment

        if (selectedRate && comment) {
            widget.style.display = "none";
            post.style.display = "block";

            // Store the rating and comment in localStorage
            const feedbacks = JSON.parse(localStorage.getItem(bookId)) || [];
            feedbacks.push({ username: user, rating: selectedRate, comment: comment });
            localStorage.setItem(bookId, JSON.stringify(feedbacks));
            
            interactions.push(`${user} - ${bookId}: ${selectedRate} stars, '${comment}'`)
            localStorage.setItem('interactions', JSON.stringify(interactions));
            console.log(interactions);
            console.log(storedBook.title)

            // Display the user feedback
            userFeedback.innerHTML = `Rating: ${displayStars(selectedRate)}<br>Comment: ${comment}`;

            console.log(feedbacks); // For debugging

            loadFeedback(); // Reload the feedback list

            editBtn.onclick = () => {
                widget.style.display = "block";
                post.style.display = "none";
            };
        } else {
            alert('Please select a rating and write a comment.');
        }

        return false;
    };
});
