import { storedBooks } from "../mock-database/mock_data.js";

document.addEventListener('DOMContentLoaded', () => {
    const editEbookLink = document.getElementById('edit-ebook-link');
    const addEbookLink = document.getElementById('add-ebook-link');
    const deleteEbookLink = document.getElementById('delete-ebook-link');

    if (editEbookLink) {
        editEbookLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadEditEbookContent();
        });
    }

    if (addEbookLink) {
        addEbookLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadAddEbookContent();
        });
    }

    if (deleteEbookLink) {
        deleteEbookLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadDeleteEbookContent();
        });
    }
});

function loadEditEbookContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Ebook</h2>
            <label for="select-ebook">Select Ebook:</label>
            <select id="select-ebook" name="select-ebook" required>
                <option value="" disabled selected>Select an ebook</option>
                ${storedBooks.map(book => `<option value="${book.title}">${book.title}</option>`).join('')}
            </select><br><br>

            <form id="edit-ebook-form" style="display: none;">
                <label for="edit-ebook-title">Title:</label>
                <input type="text" id="edit-ebook-title" name="edit-ebook-title" required><br><br>

                <label for="edit-ebook-author">Author:</label>
                <input type="text" id="edit-ebook-author" name="edit-ebook-author" required><br><br>

                <button type="submit">Confirm Edit</button>
            </form>
        </div>
    `;

    const selectEbook = document.getElementById('select-ebook');
    const editEbookForm = document.getElementById('edit-ebook-form');

    selectEbook.addEventListener('change', (e) => {
        const selectedTitle = selectEbook.value;
        const selectedEbook = storedBooks.find(book => book.title === selectedTitle);

        if (selectedEbook) {
            document.getElementById('edit-ebook-title').value = selectedEbook.title;
            document.getElementById('edit-ebook-author').value = selectedEbook.author;
            editEbookForm.style.display = 'block';
        } else {
            editEbookForm.style.display = 'none';
        }
    });

    editEbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editedTitle = editEbookForm.elements['edit-ebook-title'].value;
        const editedAuthor = editEbookForm.elements['edit-ebook-author'].value;

        const index = storedBooks.findIndex(book => book.title === selectEbook.value);

        if (index !== -1) {
            storedBooks[index].title = editedTitle;
            storedBooks[index].author = editedAuthor;

            localStorage.setItem('Books', JSON.stringify(storedBooks));

            mainContent.innerHTML = `<p>Ebook ${editedTitle} has been successfully updated!</p>`;
            console.log('Updated Books:', storedBooks);
        } else {
            alert('Ebook not found.');
        }
    });
}

function loadAddEbookContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Add Ebook</h2>
            <form id="add-ebook-form">
                <label for="add-ebook-title">Title:</label>
                <input type="text" id="add-ebook-title" name="add-ebook-title" required><br><br>

                <label for="add-ebook-author">Author:</label>
                <input type="text" id="add-ebook-author" name="add-ebook-author" required><br><br>

                <label for="add-ebook-category">Category:</label>
                <input type="text" id="add-ebook-category" name="add-ebook-category" required><br><br>

                <label for="add-ebook-cover">Cover Image:</label>
                <input type="file" id="add-ebook-cover" name="add-ebook-cover" accept="image/*" required><br><br>

                <label for="add-ebook-file">Ebook File:</label>
                <input type="file" id="add-ebook-file" name="add-ebook-file" accept=".pdf" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const addEbookForm = document.getElementById('add-ebook-form');
    addEbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newEbook = {
            title: addEbookForm.elements['add-ebook-title'].value,
            author: addEbookForm.elements['add-ebook-author'].value,
            category: addEbookForm.elements['add-ebook-category'].value,
        };

        const coverFile = addEbookForm.elements['add-ebook-cover'].files[0];
        const ebookFile = addEbookForm.elements['add-ebook-file'].files[0];

        if (coverFile && ebookFile) {
            const coverFilePath = `../mock-database/book_cover/${coverFile.name}`;
            const ebookFilePath = `../mock-database/book_files/${ebookFile.name}`;

            newEbook.cover = coverFilePath;
            newEbook.file_link = ebookFilePath;

            // Simulating file upload and storage
            storedBooks.push(newEbook);
            localStorage.setItem('Books', JSON.stringify(storedBooks));

            mainContent.innerHTML = `<p>Ebook ${newEbook.title} has been successfully added!</p>`;
            console.log('Updated Books:', storedBooks);
        } else {
            alert('Please upload both the cover image and the ebook file.');
        }
    });
}

function loadDeleteEbookContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Ebook</h2>
            <label for="select-ebook">Select Ebook:</label>
            <select id="select-ebook" name="select-ebook" required>
                <option value="" disabled selected>Select an ebook</option>
                ${storedBooks.map(book => `<option value="${book.title}">${book.title}</option>`).join('')}
            </select><br><br>

            <button id="confirm-delete" type="button">Confirm Delete</button>
        </div>
    `;

    const selectEbook = document.getElementById('select-ebook');
    const confirmDeleteButton = document.getElementById('confirm-delete');

    confirmDeleteButton.addEventListener('click', () => {
        const selectedTitle = selectEbook.value;

        const index = storedBooks.findIndex(book => book.title === selectedTitle);

        if (index !== -1) {
            storedBooks.splice(index, 1);

            localStorage.setItem('Books', JSON.stringify(storedBooks));

            mainContent.innerHTML = `<p>Ebook ${selectedTitle} has been successfully deleted!</p>`;
            console.log('Updated Books:', storedBooks);
        } else {
            alert('Ebook not found.');
        }
    });
}
