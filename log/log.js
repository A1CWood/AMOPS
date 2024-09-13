document.querySelectorAll('.log-entry').forEach(entry => {
    entry.addEventListener('click', function () {
        var textToCopy = entry.textContent;
        copyToClipboard(textToCopy);
    });
});

function copyToClipboard(text) {
    var tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
        document.execCommand('copy');
        console.log('Text copied to clipboard:', text);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
    document.body.removeChild(tempTextarea);
}

document.getElementById('logFilter').addEventListener('input', function () {
    var filterValue = this.value.toLowerCase();
    var logEntries = document.querySelectorAll('.log-entry');

    logEntries.forEach(function (entry) {
        if (entry.textContent.toLowerCase().includes(filterValue)) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
});
