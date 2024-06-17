import { storedUsers } from "../mock-database/mock_data.js";

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
    const students = Object.values(storedUsers).filter(user => user.usertype === 'student');
    
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Edit Student</h2>
            <label for="select-student">Select Student:</label>
            <select id="select-student" name="select-student" required>
                <option value="" disabled selected>Select a student</option>
                ${students.map(student => `<option value="${student.username}">${student.username}</option>`).join('')}
            </select><br><br>
            <div id="edit-student-form-container" style="display: none;">
                <form id="edit-student-form">
                    <label for="edit-username">Username:</label>
                    <input type="text" id="edit-username" name="edit-username" required><br><br>
    
                    <label for="edit-password">Password:</label>
                    <input type="password" id="edit-password" name="edit-password" required><br><br>
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    `;

    const selectStudent = document.getElementById('select-student');
    const editStudentFormContainer = document.getElementById('edit-student-form-container');
    const editStudentForm = document.getElementById('edit-student-form');

    selectStudent.addEventListener('change', (e) => {
        const selectedUsername = selectStudent.value;
        const selectedStudent = students.find(student => student.username === selectedUsername);
        
        if (selectedStudent) {
            document.getElementById('edit-username').value = selectedStudent.username;
            document.getElementById('edit-password').value = selectedStudent.password;
            editStudentFormContainer.style.display = 'block';
        }
    });

    editStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editedUsername = editStudentForm.elements['edit-username'].value;
        const editedPassword = editStudentForm.elements['edit-password'].value;
        
        // Find the key for the selected student
        const userKey = Object.keys(storedUsers).find(key => storedUsers[key].username === selectStudent.value);

        if (userKey) {
            // Update the student details
            storedUsers[userKey].username = editedUsername;
            storedUsers[userKey].password = editedPassword;

            // Update the local storage
            localStorage.setItem('Users', JSON.stringify(storedUsers));

            // Provide feedback to the user
            mainContent.innerHTML = `<p>Student ${editedUsername} has been successfully updated!</p>`;

            // Log the updated Users object to console for debugging
            console.log('Updated Users:', storedUsers);
        } else {
            alert('Student not found.');
        }
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

        // Generate a unique key for the new user
        const newUserKey = `user${Object.keys(storedUsers).length + 1}`;

        // Add the new user to the Users object
        storedUsers[newUserKey] = {
            username: addedUsername,
            password: addedPassword,
            usertype: 'student'
        };

        // Save the updated Users object back to local storage
        localStorage.setItem('Users', JSON.stringify(storedUsers));

        // Provide feedback to the user
        mainContent.innerHTML = `<p>Student ${addedUsername} has been successfully added!</p>`;

        // Clear form inputs
        addStudentForm.reset();
        console.log(storedUsers)
    });
}


function loadDeleteStudentContent() {
    const mainContent = document.getElementById('bookshelf');
    const students = Object.values(storedUsers).filter(user => user.usertype === 'student');
    
    mainContent.innerHTML = `
        <div class="form-container">
            <h2>Delete Student</h2>
            <form id="delete-student-form">
                <label for="delete-username">Select Student:</label>
                <select id="delete-username" name="delete-username" required>
                    ${students.map(student => `<option value="${student.username}">${student.username}</option>`).join('')}
                </select><br><br>

                <button type="submit">Confirm</button>
            </form>
        </div>
    `;

    const deleteStudentForm = document.getElementById('delete-student-form');
    deleteStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedUsername = deleteStudentForm.elements['delete-username'].value;

        // Find the key for the selected student
        const userKey = Object.keys(storedUsers).find(key => storedUsers[key].username === selectedUsername);

        if (userKey) {
            // Delete the student from storedUsers
            delete storedUsers[userKey];

            // Update the local storage
            localStorage.setItem('Users', JSON.stringify(storedUsers));

            // Provide feedback to the user
            mainContent.innerHTML = `<p>Student ${selectedUsername} has been successfully deleted!</p>`;

            // Log the updated Users object to console for debugging
            console.log('Updated Users:', storedUsers);
        } else {
            alert('Student not found.');
        }
    });
}

