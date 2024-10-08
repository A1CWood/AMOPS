import { CanvasManager } from './CanvasManager.js';
import { getCoordinatesForLabel, getCoordinatesForTag, getMirrorStateForLabel } from './coordinates.js';

const apronImages = {
    'A': '../resources/Alpha.png',
    'C': '../resources/Charlie.png',
    'DV': '../resources/DV.png',
    'E': '../resources/Echo.png',
    'NG': '../resources/NorthGolf.png',
    'SG': '../resources/SouthGolf.png',
    'K': '../resources/Kilo.png',
    'M': '../resources/Mike.png',
    'O': '../resources/Oscar.png',
    'PQ': '../resources/PapaQuebec.png',
    'RS': '../resources/RomeoSierra.png',
    'SR': '../resources/SouthRamp.png',
    'TUV': '../resources/TangoUniformVictor.png',
    'TR': '../resources/TankerRow.png',
};

const singleJetOnlyAprons = ['PQ', 'RS', 'TUV', 'K', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']; // Add the apron IDs that can only hold single jets

let canvasManager;  // Declare canvasManager as a global variable

const canvasState = {
    currentApron: '',
    planes: [],
    addOrUpdatePlane(plane) {
        const existingPlane = this.planes.find(p => p.id === plane.id);
        if (existingPlane) {
            Object.assign(existingPlane, plane);
        } else {
            this.planes.push(plane);
        }
        this.logState();
    },
    updatePlane(planeId, data) {
        const plane = this.planes.find(p => p.id === planeId);
        if (plane) {
            Object.assign(plane, data);
        }
        this.logState();
    },
    removePlane(planeId) {
        this.planes = this.planes.filter(plane => plane.id !== planeId);
        this.logState();
    },
    setCurrentApron(apron) {
        this.currentApron = apron;
        console.log(`Current apron set to: ${apron}`);
        this.logState();
    },
    clear() {
        this.planes = [];
        this.logState();
    },
    logState() {
        console.log("Current canvas state:");
        this.planes.forEach(plane => {
            console.log(`ID: ${plane.id}, Spot: ${plane.parkingSpot}, Type: ${plane.planeType}, Color: ${plane.color}, Image Src: ${plane.imageSrc}`);
        });
    }
};

export default canvasState;


function updateCanvasStateTag(label, tagData) {
    canvasState.updatePlane(label, { tagData });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    canvasManager = new CanvasManager(document.getElementById('apronimg'));  // Initialize canvasManager
    console.log('canvasManager initialized:', canvasManager);

    document.getElementById('spd').addEventListener('change', function (event) {
        if (event.target.classList.contains('spotcheck')) {
            console.log('Spot checkbox changed');
            handleCheckboxChange(event, canvasManager);
        }
    }
    );

    document.getElementById('aircraftDetails').addEventListener('change', function () {
        console.log('Aircraft details checkbox changed');
        toggleAircraftDetails();
    });

    document.getElementById('header').addEventListener('change', function () {
        console.log('Header checkbox changed');
        toggleHeaderVisibility(canvasManager);
    });

    document.getElementById('headerText').addEventListener('input', function () {
        if (document.getElementById('header').checked) {
            console.log('Header text input changed');
            canvasManager.drawHeader(this.value);
        } else {
            canvasManager.clearHeader();
        }
    });

    document.getElementById('saveButton').addEventListener('click', function () {
        console.log('Save button clicked');
        saveCanvas(canvasManager);
    });

    // Apply the initial visibility state based on the checkbox
    toggleHeaderVisibility(canvasManager);
});

// UIManager.js
function showChecklist(option) {
    try {
        console.log('showChecklist called with option:', option);
        const spotsData = {
            'A': createSpotsList(16, 'A'),
            'C': createSpotsList(6, 'C'),
            'DV': createSpotsList(3, 'DV'),
            'E': createSpotsList(10, 'E'),
            'NG': createSpotsList(14, 'NG'),
            'SG': createSpotsList(27, 'SG'),
            'K': createSpotsList(18, 'K'),
            'M': createSpotsList(12, 'M'),
            'O': createSpotsList(5, 'O'),
            'PQ': createSpotsList(16, 'P', 1, 'Q'),
            'RS': createSpotsList(16, 'R', 1, 'S'),
            'SR': createSpotsList(16, 'SR'),
            'TUV': createSpotsList(12, 'T', 1, 'U', 'V'),
            'TR': createSpotsList(12, 'TR', 11),
        };
        const spotsHTML = spotsData[option] || 'No spots available for this selection.';
        const apronImageSrc = apronImages[option] || ''; // Default image if none specified

        document.getElementById('spd').innerHTML = spotsHTML;
        const outputDiv = document.querySelector('.output');
        if (apronImageSrc) {
            console.log('Updating canvas background with apronImageSrc:', apronImageSrc);
            canvasManager.updateCanvasBackground(apronImageSrc);  // Use the global canvasManager
            document.getElementById('saveButton').style.display = 'flex';
            outputDiv.style.display = "flex";  // Make sure the output div is visible
        } else {
            console.log('No apronImageSrc provided, hiding output div');
            outputDiv.style.display = "none"; // Hide the output div if no apron image
            document.getElementById('saveButton').style.display = 'none';
        }
        console.log('Resetting UI for new checklist');
        clearAllTiles();
        resetSpotCheckboxes();

        // Reset canvas state and set the current apron
        canvasState.clear();
        canvasState.setCurrentApron(apronImageSrc);
        canvasManager.refreshCanvas(canvasState);
    } catch (error) {
        console.error("Failed to show checklist: ", error);
    }
}

window.showChecklist = showChecklist;

function createSpotsList(count, apron, start = 1, apron2, apron3) {
    let spots = '';
    for (let i = start; i < start + count; i++) {
        spots += `
            <div class="spot">
                <label for="${apron + i}">${apron + i}</label>
                <input type="checkbox" id="${apron + i}" class="spotcheck">
            </div>
        `;
    }
    if (apron2 != null) {
        for (let i = start; i < start + count; i++) {
            spots += `
            <div class="spot">
                <label for="${apron2 + i}">${apron2 + i}</label>
                <input type="checkbox" id="${apron2 + i}" class="spotcheck">
            </div>
        `;
        }
    }
    if (apron3 != null) {
        for (let i = 1; i < 9; i++) {
            spots += `
            <div class="spot">
                <label for="${apron3 + i}">${apron3 + i}</label>
                <input type="checkbox" id="${apron3 + i}" class="spotcheck">
            </div>
        `;
        }
    }
    return `<style>#${apron}{background-color: #444;}</style>` + spots;
}

function clearAllTiles() {
    console.log('Clearing all tiles');
    const tilesContainer = document.getElementById('aircraftDetailTiles');
    while (tilesContainer.firstChild) {
        tilesContainer.removeChild(tilesContainer.firstChild);
    }
}

function resetSpotCheckboxes() {
    console.log('Resetting spot checkboxes');
    document.querySelectorAll('.spotcheck').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.querySelectorAll('.picked').forEach(pickedDiv => {
        pickedDiv.remove();
    });
}

function handleCheckboxChange(event, canvasManager) {
    console.log('Handling checkbox change');
    const checkbox = event.target;
    const spot = checkbox.closest('.spot');
    const label = spot.querySelector('label').innerHTML;
    const showTag = document.getElementById('tagAircraft').checked;
    const showDetails = document.getElementById('aircraftDetails').checked;

    if (checkbox.checked) {
        if (showDetails) {
            const inputCallsign = spot.querySelector('.input-callsign');
            const inputAircraftType = spot.querySelector('.input-aircraft-type');
            const inputEta = spot.querySelector('.input-eta');

            const callsign = inputCallsign ? inputCallsign.value : '';
            const aircraftType = inputAircraftType ? inputAircraftType.value : '';
            const eta = inputEta ? inputEta.value : '';

            if (callsign && aircraftType && eta) {
                createAircraftDetailTile(label, callsign, aircraftType, eta);
            }
        }
        createPickedDiv(label, showTag, showDetails, canvasManager);
    } else {
        removePickedDiv(label);
        canvasState.removePlane(label);
        canvasManager.refreshCanvas(canvasState);
    }
}

function toggleAircraftDetails() {
    console.log('Toggling aircraft details visibility');
    const pickedDivs = document.querySelectorAll('.picked');
    pickedDivs.forEach(function (div) {
        ['Callsign', 'Aircraft Type', 'ETA'].forEach(function (detail) {
            const detailInputDiv = div.querySelector(`.pkinput[label="${detail}"]`);
            if (detailInputDiv) {
                detailInputDiv.style.display = document.getElementById('aircraftDetails').checked ? '' : 'none';
            }
        });
    });
}

function toggleHeaderVisibility(canvasManager) {
    console.log('Toggling header visibility');
    const headerCheckbox = document.getElementById('header');
    const headerDiv = document.getElementById('imgheader');
    if (headerCheckbox.checked) {
        headerDiv.style.display = 'block';
        canvasManager.drawHeader(document.getElementById('headerText').value);
    } else {
        headerDiv.style.display = 'none';
        document.getElementById('headerText').value = '';
        canvasManager.clearHeader();
    }
}

function saveCanvas(canvasManager) {
    console.log('Saving canvas');
    const outputCanvas = document.createElement('canvas');
    const ctx = outputCanvas.getContext('2d');
    const outputDiv = document.querySelector('.output');

    outputCanvas.width = outputDiv.offsetWidth;
    outputCanvas.height = outputDiv.offsetHeight;

    const apronCanvas = document.getElementById('apronimg');
    ctx.drawImage(apronCanvas, 0, 0);

    outputCanvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'output-image.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

function createPickedDiv(label, showTag, showDetails, canvasManager) {
    console.log('Creating picked div for label:', label);
    const pickedDiv = document.createElement('div');
    pickedDiv.className = 'picked';
    pickedDiv.setAttribute('id', 'picked-' + label);

    const h1 = document.createElement('h1');
    h1.textContent = label;
    pickedDiv.appendChild(h1);

    if (showTag) {
        const inputTag = document.createElement('input');
        inputTag.setAttribute('type', 'text');
        inputTag.setAttribute('maxlength', '7');
        inputTag.setAttribute('placeholder', '7 Char Limit');
        inputTag.setAttribute('id', 'tagInput-' + label);
        inputTag.addEventListener('input', function () {
            updateCanvasStateTag(label, this.value);
            canvasManager.refreshCanvas(canvasState);
        });
        pickedDiv.appendChild(createDetailElement('Tag', inputTag));
    }

    if (showDetails) {
        const inputCallsign = document.createElement('input');
        const inputAircraftType = document.createElement('input');
        const inputETA = document.createElement('input');
        inputCallsign.className = 'input-callsign';
        inputAircraftType.className = 'input-aircraft-type';
        inputETA.className = 'input-eta';

        setupInputListener(inputCallsign, label, 'callsign', canvasManager);
        setupInputListener(inputAircraftType, label, 'aircraft-type', canvasManager);
        setupInputListener(inputETA, label, 'eta', canvasManager);

        pickedDiv.appendChild(createDetailElement('Callsign', inputCallsign));
        pickedDiv.appendChild(createDetailElement('Aircraft Type', inputAircraftType));
        pickedDiv.appendChild(createDetailElement('ETA', inputETA));
    }

    pickedDiv.appendChild(createPlaneButtonPart(label, canvasManager, showTag));

    // Add color selection squares
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-selection';
    const colors = ['black', 'blue', 'green', 'yellow', 'red'];
    colors.forEach(color => {
        const colorSquare = document.createElement('div');
        colorSquare.className = 'color-square';
        colorSquare.style.backgroundColor = color;
        colorSquare.addEventListener('click', function () {
            updateCanvasStateColor(label, color, canvasManager);
        });
        colorDiv.appendChild(colorSquare);
    });
    pickedDiv.appendChild(colorDiv);

    document.getElementById('pickedContainer').appendChild(pickedDiv);
}


// Update canvas state with the selected color
function updateCanvasStateColor(label, color, canvasManager) {
    const plane = canvasState.planes.find(p => p.id === label);
    if (plane) {
        plane.color = color;
        plane.imageSrc = `../resources/${plane.planeType}_${color}.png`;
    }
    canvasManager.refreshCanvas(canvasState);
}



function createAircraftDetailTile(label, callsign, aircraftType, eta) {
    console.log('Creating aircraft detail tile for label:', label);
    let tile = document.getElementById('tile-' + label);
    if (!tile) {
        const tileContainer = document.getElementById('aircraftDetailTiles');
        tile = document.createElement('div');
        tile.className = 'aircraft-tile';
        tile.id = 'tile-' + label;
        tile.innerHTML = `
            <div class="aircraft-label">${label}</div>
            <div class="aircraft-callsign"><strong>Callsign:</strong> <span class="callsign-data">${callsign}</span></div>
            <div class="aircraft-type"><strong>Aircraft Type:</strong> <span class="aircraft-type-data">${aircraftType}</span></div>
            <div class="aircraft-eta"><strong>ETA:</strong> <span class="eta-data">${eta}</span></div>
        `;
        tileContainer.appendChild(tile);
    }
    return tile;
}

function setupInputListener(inputElement, label, fieldType, canvasManager) {
    console.log(`Setting up input listener for ${fieldType} on label: ${label}`);
    inputElement.addEventListener('input', function () {
        updateAircraftDetailTile(label, fieldType, this.value, canvasManager);
    });
}

function updateAircraftDetailTile(label, fieldType, value, canvasManager) {
    console.log(`Updating aircraft detail tile for ${fieldType} on label: ${label}`);
    const tile = document.getElementById('tile-' + label) || createAircraftDetailTile(label);
    const fieldSpan = tile.querySelector('.' + fieldType + '-data');
    if (fieldSpan) {
        fieldSpan.textContent = value;
    }
}

function createDetailElement(labelText, inputElement) {
    const div = document.createElement('div');
    div.className = 'pkinput';
    const label = document.createElement('label');
    label.textContent = labelText;
    div.appendChild(label);
    div.appendChild(inputElement);
    return div;
}

function createPlaneButtonPart(label, canvasManager, showTag) {
    const btnPart = document.createElement('div');
    btnPart.className = 'plnbtnprt';

    // Always add the single jet button
    const jetButton = createButton('../resources/jet_black.png', 'Small', 'jet', label, 'jet', canvasManager, showTag);
    btnPart.appendChild(jetButton);
    const xButton = createButton('../resources/x_black.png', 'Closed', 'x', label, 'x', canvasManager, showTag);
    btnPart.appendChild(xButton);

    // Conditionally add other buttons based on the apron type
    if (!singleJetOnlyAprons.includes(label.replace(/[0-9]/g, ''))) {
        const planeButton = createButton('../resources/plane_black.png', 'Big', 'plane', label, 'plane', canvasManager, showTag);
        const twoJetButton = createButton('../resources/2jet_black.png', 'Double', 'jet2', label, '2jet', canvasManager, showTag);
        btnPart.appendChild(planeButton);
        btnPart.appendChild(twoJetButton);
    }

    return btnPart;
}

function createButton(imageSrc, altText, className, label, type, canvasManager, showTag) {
    const button = document.createElement('div');
    button.className = 'planebtn';
    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = altText;
    image.className = className;
    button.appendChild(image);
    button.addEventListener('click', function () {
        console.log(`Button clicked to draw ${type} image for label: ${label}`);
        const defaultColor = 'black'; // Default color
        canvasState.addOrUpdatePlane({
            id: label,
            parkingSpot: label,
            planeType: type,
            color: defaultColor, // Default color
            imageSrc: `../resources/${type}_${defaultColor}.png`, // Default image source
            showTag: showTag,
            tagData: showTag ? document.getElementById('tagInput-' + label).value : ''
        });
        canvasManager.refreshCanvas(canvasState);
    });
    return button;
}



function removePickedDiv(label) {
    console.log(`Removing picked div for label: ${label}`);
    const pickedDiv = document.getElementById('picked-' + label);
    if (pickedDiv) {
        pickedDiv.remove();
    }
}

