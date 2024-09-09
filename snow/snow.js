// Function to format date and time as DD MMM YY TTTT
const parkingSpaces = {
    ws1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    ws2: ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"],
    c: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    f: ["1", "2", "3", "4"],
    lm: ["1", "2", "3", "4"],
    fd: ["1L", "1R", "2L", "2R", "3L", "3R", "4L", "4R", "5L", "5R", "6L", "5R", "7L", "7R", "8L", "8R", "9L", "9R", "10L", "10R", "11L", "11R", "12L", "12R"],
    tr: ["7", "8", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    nd: ["1", "2"]
}

const tableData = {
    time: [],
    arrdep: [],
    squadron: [],
    priority: [],
    parkingSpots: [],
    arrdepO: ['ARR', 'DEP', ' '],
    squadronO: ["18th", "168th", "210th", "355th", "356th", "Transient"],
    priorityO: ["1", "2", "3", "4a", "4b", "4c", "5", "6", "7"],
    priorityMap: {
        "18th": "4c",
        "168th": "6",
        "210th": "5",
        "355th": "4a",
        "356th": "4b",
        "Transient": "7"
    },
    squadronMap: {
        "18th": "fis",
        "168th": "guard",
        "210th": "rescue",
        "355th": "falcons",
        "356th": "demons",
    },
    parkingSpotsO: {
        fis: parkingSpaces.fd,
        guard: parkingSpaces.tr,
        rescue: parkingSpaces.nd,
        falcons: [...parkingSpaces.ws2, ...parkingSpaces.c, ...parkingSpaces.f, ...parkingSpaces.lm],
        demons: [...parkingSpaces.ws1, ...parkingSpaces.c, ...parkingSpaces.f, ...parkingSpaces.lm],
    },

    parkingSpotsS: {
        fis: [],
        guard: [],
        rescue: [],
        falcons: [],
        demons: []
    }
}


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

    function createNestedTable(rowIndex, cell) {
        const selectedUnit = tableData.squadron[rowIndex];
        var selectedOptions = cell.textContent.split(',').map(option => option.trim()).filter(option => option !== "");
        const nestedRow = tableBody.insertRow(rowIndex + 1);
        nestedRow.id = 'optionstable';
        const nestedCell = nestedRow.insertCell(0);
        nestedCell.colSpan = 5;

        const nestedTable = document.createElement('table');
        nestedTable.style.width = '100%';
        nestedTable.style.borderCollapse = 'collapse';
        nestedTable.className = 'nested-table';

        const nestedTableRow = nestedTable.insertRow(0);

        tableData.parkingSpotsO[selectedUnit].forEach(option => {
            const optionCell = nestedTableRow.insertCell();
            optionCell.textContent = option;
            optionCell.style.border = '1px solid #ccc';
            optionCell.style.padding = '5px';
            optionCell.style.cursor = 'pointer';
            optionCell.style.textAlign = 'center';
            optionCell.style.backgroundColor = selectedOptions.includes(option) ? '#b3d9ff' : '#fff';

            optionCell.addEventListener('click', function () {
                if (selectedOptions.includes(option)) {
                    selectedOptions.splice(selectedOptions.indexOf(option), 1);
                    optionCell.style.backgroundColor = '#fff';
                } else {
                    selectedOptions.push(option);
                    optionCell.style.backgroundColor = '#b3d9ff';
                }
                tableData.parkingSpotsS[selectedUnit] = selectedOptions;  // Update selected parking spots
                cell.textContent = selectedOptions.join(', ');
            });
        });
        nestedCell.appendChild(nestedTable);
    }

    // Function to add a new row to the table
    function addRow() {
        const row = tableBody.insertRow();
        const rowIndex = tableBody.rows.length - 1; // Get the current row index

        for (let i = 0; i < 5; i++) {
            const cell = row.insertCell(i);
            if (i === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                input.addEventListener('input', function () {
                    tableData.time[rowIndex] = input.value;
                });
                cell.appendChild(input);
            } else if (i === 1) {
                cell.textContent = "ARR";
                cell.addEventListener('click', function () {
                    cell.textContent = cell.textContent === "ARR" ? "DEP" : "ARR";
                    tableData.arrdep[rowIndex] = cell.textContent;  // Update arr/dep in tableData
                });
            } else if (i === 2) {
                const input = document.createElement('input');
                input.setAttribute('list', `options3-${rowIndex}`);
                const dataList = document.createElement('datalist');
                dataList.id = `options3-${rowIndex}`;

                tableData.squadronO.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    dataList.appendChild(opt);
                });

                input.addEventListener('input', function () {
                    const correspondingValue = tableData.priorityMap[input.value];
                    tableData.squadron[rowIndex] = tableData.squadronMap[input.value];  // Update squadron
                    if (correspondingValue) {
                        const nextCell = row.cells[3].querySelector('input');
                        nextCell.value = correspondingValue;
                        tableData.priority[rowIndex] = correspondingValue;  // Update priority
                    }
                });

                cell.appendChild(input);
                cell.appendChild(dataList);
            } else if (i === 3) {
                const input = document.createElement('input');
                input.setAttribute('list', `options4-${rowIndex}`);
                const dataList = document.createElement('datalist');
                dataList.id = `options4-${rowIndex}`;

                tableData.priorityO.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    dataList.appendChild(opt);
                });

                input.addEventListener('input', function () {
                    tableData.priority[rowIndex] = input.value;  // Update priority in tableData
                });

                cell.appendChild(input);
                cell.appendChild(dataList);
            } else if (i === 4) {
                const input = document.createElement('input');
                input.type = 'text';
                input.addEventListener('input', function () {
                    tableData.parkingSpots[rowIndex] = input.value;  // Update parking spots
                });
                cell.appendChild(input);
                cell.addEventListener('click', function () {
                    if (document.getElementById('optionstable')) {
                        document.getElementById('optionstable').remove();
                    } else {
                        if (tableData.squadron[rowIndex]) {
                            createNestedTable(rowIndex, cell);
                        }
                    }
                });
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