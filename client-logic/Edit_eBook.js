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
            <form id="edit-ebook-form">
                <label for="edit-ebook-title">Title:</label>
                <input type="text" id="edit-ebook-title" name="edit-ebook-title" required><br><br>

                <label for="edit-ebook-author">Author:</label>
                <input type="text" id="edit-ebook-author" name="edit-ebook-author" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    // Add logic to handle form submission if needed
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

                <input type="file" id="myFile" name="filename">

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    // Add logic to handle form submission if needed
}

function loadDeleteEbookContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Ebook</h2>
            <form id="delete-ebook-form">
                <label for="delete-ebook-title">Title:</label>
                <input type="text" id="delete-ebook-title" name="delete-ebook-title" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    // Add logic to handle form submission if needed
}
