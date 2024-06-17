document.addEventListener('DOMContentLoaded', () => {
    const editAdminLink = document.getElementById('edit-admin-link');
    const addAdminLink = document.getElementById('add-admin-link');
    const deleteAdminLink = document.getElementById('delete-admin-link');

    if (editAdminLink) {
        editAdminLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadEditAdminContent();
        });
    }

    if (addAdminLink) {
        addAdminLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadAddAdminContent();
        });
    }

    if (deleteAdminLink) {
        deleteAdminLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadDeleteAdminContent();
        });
    }
});

function loadEditAdminContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Admin</h2>
            <form id="edit-admin-form">
                <label for="edit-username">Username:</label>
                <input type="text" id="edit-username" name="edit-username" required><br><br>

                <label for="edit-password">Password:</label>
                <input type="password" id="edit-password" name="edit-password" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
}

function loadAddAdminContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Add Admin</h2>
            <form id="add-admin-form">
                <label for="add-username">Username:</label>
                <input type="text" id="add-username" name="add-username" required><br><br>

                <label for="add-password">Password:</label>
                <input type="password" id="add-password" name="add-password" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
}

function loadDeleteAdminContent() {
    const mainContent = document.getElementById('bookshelf');
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Admin</h2>
            <form id="delete-admin-form">
                <label for="delete-username">Username:</label>
                <input type="text" id="delete-username" name="delete-username" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
}
