// Function to format date and time as DD MMM YY TTTT
function formatDateTime(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hours}${minutes}L`;
}

// Function to set the current date and time to the input field
function setCurrentDateTime() {
    const now = new Date();
    const formattedDateTime = formatDateTime(now);
    document.getElementById('CAOvar').value = formattedDateTime;
    document.getElementById('SRPvar').value = formattedDateTime.slice(0, -5);
}

// Ensure the date and time are set when the page loads
window.onload = setCurrentDateTime;