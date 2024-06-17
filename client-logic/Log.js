document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('Log')
    if (log) {
        log.addEventListener('click', (e) => {
            e.preventDefault();
            Log();
        });
    }

})
function Log() {
    const mainContent = document.getElementById('bookshelf');
    const storedActive = localStorage.getItem('active');
    const active = JSON.parse(storedActive);
    console.log(active)

    let organizedData = '';
    for (let i = 0; i < active.length; i += 2) {
        organizedData += `<div>Username: ${active[i]}<br>Date: ${active[i + 1]}</div>`;
    }

    mainContent.innerHTML = organizedData;
}


