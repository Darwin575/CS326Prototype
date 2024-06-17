import { storedUsers, active } from "../mock-database/mock_data.js";
console.log(active)
const test_btn = document.querySelector('.btn');
if (test_btn) {
    test_btn.addEventListener('click', check_credentials);   
} 

export function check_credentials(event) {
    event.preventDefault();

    const passwordInput = document.querySelector('#password').value;
    const usernameInput = document.querySelector('#username').value;
    const date = new Date().toLocaleString();
    let userFound = false;

    

    for (const userKey in storedUsers) {       
        const user = storedUsers[userKey];
        const { username, password, usertype } = user;

        if (username === usernameInput && password === passwordInput) {
            userFound = true; 
            active.push(username);
            active.push(date)
            localStorage.setItem('active', JSON.stringify(active));           

            if (usertype === 'student') {               
                window.location.href = "../clientUI/StudentHomePage.html";
            } else if (usertype === 'admin') {
                sessionStorage.setItem('User', 'Admin') 
                window.location.href = "../clientUI/AdminHomePage.html";
            }
            break;
        }
    }

    if (!userFound) {
        alert("Wrong username or password");
    }
}
