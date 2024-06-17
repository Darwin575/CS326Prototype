import { storedUsers } from "../mock-database/mock_data.js";

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
    const admins = Object.values(storedUsers).filter(user => user.usertype === 'admin');
    
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Admin</h2>
            <label for="select-admin">Select Admin:</label>
            <select id="select-admin" name="select-admin" required>
                <option value="" disabled selected>Select an admin</option>
                ${admins.map(admin => `<option value="${admin.username}">${admin.username}</option>`).join('')}
            </select><br><br>
            <div id="edit-admin-form-container" style="display: none;">
                <form id="edit-admin-form">
                    <label for="edit-username">Username:</label>
                    <input type="text" id="edit-username" name="edit-username" required><br><br>
    
                    <label for="edit-password">Password:</label>
                    <input type="password" id="edit-password" name="edit-password" required><br><br>
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    `;

    const selectAdmin = document.getElementById('select-admin');
    const editAdminFormContainer = document.getElementById('edit-admin-form-container');
    const editAdminForm = document.getElementById('edit-admin-form');

    selectAdmin.addEventListener('change', (e) => {
        const selectedUsername = selectAdmin.value;
        const selectedAdmin = admins.find(admin => admin.username === selectedUsername);
        
        if (selectedAdmin) {
            document.getElementById('edit-username').value = selectedAdmin.username;
            document.getElementById('edit-password').value = selectedAdmin.password;
            editAdminFormContainer.style.display = 'block';
        }
    });

    editAdminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editedUsername = editAdminForm.elements['edit-username'].value;
        const editedPassword = editAdminForm.elements['edit-password'].value;
        
        // Find the key for the selected admin
        const userKey = Object.keys(storedUsers).find(key => storedUsers[key].username === selectAdmin.value);

        if (userKey) {
            // Update the admin details
            storedUsers[userKey].username = editedUsername;
            storedUsers[userKey].password = editedPassword;

            // Update the local storage
            localStorage.setItem('Users', JSON.stringify(storedUsers));

            // Provide feedback to the user
            mainContent.innerHTML = `<p>Admin ${editedUsername} has been successfully updated!</p>`;

            // Log the updated Users object to console for debugging
            console.log('Updated Users:', storedUsers);
        } else {
            alert('Admin not found.');
        }
    });
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

    const addAdminForm = document.getElementById('add-admin-form');
    addAdminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const addedUsername = addAdminForm.elements['add-username'].value;
        const addedPassword = addAdminForm.elements['add-password'].value;

        // Generate a unique key for the new user
        const newUserKey = `user${Object.keys(storedUsers).length + 1}`;

        // Add the new user to the Users object
        storedUsers[newUserKey] = {
            username: addedUsername,
            password: addedPassword,
            usertype: 'admin'
        };

        // Save the updated Users object back to local storage
        localStorage.setItem('Users', JSON.stringify(storedUsers));

        // Provide feedback to the user
        mainContent.innerHTML = `<p>Admin ${addedUsername} has been successfully added!</p>`;

        // Clear form inputs
        addAdminForm.reset();
        console.log(storedUsers)
    });
}

function loadDeleteAdminContent() {
    const mainContent = document.getElementById('bookshelf');
    const admins = Object.values(storedUsers).filter(user => user.usertype === 'admin');
    
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Admin</h2>
            <form id="delete-admin-form">
                <label for="delete-username">Select Admin:</label>
                <select id="delete-username" name="delete-username" required>
                    ${admins.map(admin => `<option value="${admin.username}">${admin.username}</option>`).join('')}
                </select><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const deleteAdminForm = document.getElementById('delete-admin-form');
    deleteAdminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedUsername = deleteAdminForm.elements['delete-username'].value;

        // Find the key for the selected user
        const userKey = Object.keys(storedUsers).find(key => storedUsers[key].username === selectedUsername);

        if (userKey) {
            // Delete the user from storedUsers
            delete storedUsers[userKey];

            // Update the local storage
            localStorage.setItem('Users', JSON.stringify(storedUsers));

            // Provide feedback to the user
            mainContent.innerHTML = `<p>Admin ${selectedUsername} has been successfully deleted!</p>`;

            // Log the updated Users object to console for debugging
            console.log('Updated Users:', storedUsers);
        } else {
            alert('Admin not found.');
        }
    });
}
