import { active, interactions, downloads } from "../mock-database/mock_data.js";

document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('Log');
    if (log) {
        log.addEventListener('click', (e) => {
            e.preventDefault();
            Log();
        });
    }
});

function Log() {
    const mainContent = document.getElementById('bookshelf');
    let formHTML = `
        <div class="form-container">
            <h2>Activity Log</h2>
            <form id="activity-log-form">
                <fieldset>
                    <legend>Active Log</legend>`;

    // Display active logs
    for (let log of active) {
        formHTML += `<div><input type="checkbox" name="activeLog" value="${log}" checked>${log}</div>`;
    }

    formHTML += `
                </fieldset>
                <fieldset>
                    <legend>Interactions Log</legend>`;

    // Display interactions logs
    for (let log of interactions) {
        formHTML += `<div><input type="checkbox" name="interactionsLog" value="${log}" checked>${log}</div>`;
    }

    formHTML += `
                </fieldset>
                <fieldset>
                    <legend>Downloads Log</legend>`;

    // Display downloads logs
    for (let log of downloads) {
        formHTML += `<div><input type="checkbox" name="downloadsLog" value="${log}" checked>${log}</div>`;
    }

    

    // Display ratings logs
    const usersRatings = JSON.parse(localStorage.getItem('Users')) || [];
    if (Array.isArray(usersRatings) && usersRatings.length > 0) {
        usersRatings.forEach(feedback => {
            formHTML += `<div>
                <input type="checkbox" name="ratingsLog" value="Users - ${feedback.username}: ${feedback.rating} stars - ${feedback.comment}" checked>
                <strong>Users</strong> - ${feedback.username}: ${feedback.rating} stars - ${feedback.comment}
            </div>`;
        });
    } 

    formHTML += `
                </fieldset>
                <button type="submit">Export Selected Logs</button>
            </form>
        </div>`;

    mainContent.innerHTML = formHTML;

    const activityLogForm = document.getElementById('activity-log-form');
    activityLogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Example: Export selected logs (you can implement the export functionality here)

        // For demo purposes, let's log the selected logs to console
        const selectedLogs = {
            active: getSelectedLogs('activeLog'),
            interactions: getSelectedLogs('interactionsLog'),
            downloads: getSelectedLogs('downloadsLog'),
            ratings: getSelectedLogs('ratingsLog')
        };
        console.log('Selected Logs:', selectedLogs);
    });

    function getSelectedLogs(logType) {
        const selectedLogs = [];
        const checkboxes = document.getElementsByName(logType);
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedLogs.push(checkbox.value);
            }
        });
        return selectedLogs;
    }
}
