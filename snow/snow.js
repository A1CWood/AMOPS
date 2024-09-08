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



document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];
    const column3Options = ["18th", "168th", "210th", "355th", "356th", "Transient"];
    const column4Mapping = {
        "18th": "4c",
        "168th": "6",
        "210th": "5",
        "355th": "4a",
        "356th": "4b",
        "Transient": "7"
    };
    const column4Options = ["1", "2", "3", "4a", "4b", "4c", "5", "6", "7"];

    // Function to add a new row to the table
    function addRow() {
        const row = tableBody.insertRow();
        for (let i = 0; i < 5; i++) {
            const cell = row.insertCell(i);
            if (i === 1) {
                // Pre-populate the second column with "ARR"
                cell.textContent = "ARR";
                // Add event listener to toggle between "ARR" and "DEP"
                cell.addEventListener('click', function () {
                    cell.textContent = cell.textContent === "ARR" ? "DEP" : "ARR";
                });
            } else if (i === 2) {
                // Create the input and datalist for column 3 (now contains the old column 4 options)
                const input = document.createElement('input');
                input.setAttribute('list', `options3-${row.rowIndex}`);
                const dataList = document.createElement('datalist');
                dataList.id = `options3-${row.rowIndex}`;

                column3Options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    dataList.appendChild(opt);
                });

                input.addEventListener('input', function () {
                    const correspondingValue = column4Mapping[input.value];
                    if (correspondingValue) {
                        const nextCell = row.cells[3].querySelector('input');
                        nextCell.value = correspondingValue;
                    }
                });

                cell.appendChild(input);
                cell.appendChild(dataList);
            } else if (i === 3) {
                // Create the input and datalist for column 4 (now contains the old column 3 options)
                const input = document.createElement('input');
                input.setAttribute('list', `options4-${row.rowIndex}`);
                const dataList = document.createElement('datalist');
                dataList.id = `options4-${row.rowIndex}`;

                column4Options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    dataList.appendChild(opt);
                });

                cell.appendChild(input);
                cell.appendChild(dataList);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.addEventListener('input', checkLastRow);
                cell.appendChild(input);
            }
        }
    }

    // Function to add initial rows
    function addInitialRows() {
        for (let i = 0; i < 5; i++) {
            addRow();
        }
    }

    // Function to check if the last row is being filled
    function checkLastRow() {
        const rows = tableBody.getElementsByTagName('tr');
        const lastRowInputs = rows[rows.length - 1].getElementsByTagName('input');
        let allFilled = true;

        for (let input of lastRowInputs) {
            if (input.value === '') {
                allFilled = false;
                break;
            }
        }

        if (allFilled) {
            addRow();
        }
    }

    // Add initial rows
    addInitialRows();
});

window.onload = setCurrentDateTime;