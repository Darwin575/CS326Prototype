document.addEventListener('DOMContentLoaded', () => {
    const editStudentLink = document.getElementById('edit-student-link');
    const addStudentLink = document.getElementById('add-student-link');
    const deleteStudentLink = document.getElementById('delete-student-link');

    if (editStudentLink) {
        editStudentLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadEditStudentContent();
        });
    }

    if (addStudentLink) {
        addStudentLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadAddStudentContent();
        });
    }

    if (deleteStudentLink) {
        deleteStudentLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadDeleteStudentContent();
        });
    }
});

function loadEditStudentContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Student</h2>
            <form id="edit-student-form">
                <label for="edit-username">Username:</label>
                <input type="text" id="edit-username" name="edit-username" required><br><br>

                <label for="edit-password">Password:</label>
                <input type="password" id="edit-password" name="edit-password" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const editStudentForm = document.getElementById('edit-student-form');
    editStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editedUsername = editStudentForm.elements['edit-username'].value;
        const editedPassword = editStudentForm.elements['edit-password'].value;
        
        // Example: Process the edited username and password here

        // Clear form inputs
        editStudentForm.reset();
    });
}

function loadAddStudentContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Add Student</h2>
            <form id="add-student-form">
                <label for="add-username">Username:</label>
                <input type="text" id="add-username" name="add-username" required><br><br>

                <label for="add-password">Password:</label>
                <input type="password" id="add-password" name="add-password" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const addStudentForm = document.getElementById('add-student-form');
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const addedUsername = addStudentForm.elements['add-username'].value;
        const addedPassword = addStudentForm.elements['add-password'].value;
        
        // Example: Process the added username and password here

        // Clear form inputs
        addStudentForm.reset();
    });
}

function loadDeleteStudentContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Student</h2>
            <form id="delete-student-form">
                <label for="delete-username">Username:</label>
                <input type="text" id="delete-username" name="delete-username" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const deleteStudentForm = document.getElementById('delete-student-form');
    deleteStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const deletedUsername = deleteStudentForm.elements['delete-username'].value;
        
        // Example: Process the deleted username here

        // Clear form input
        deleteStudentForm.reset();
    });
}
