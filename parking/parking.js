const spotState = {};
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
    'P': '../resources/PapaQuebec.png',
    'Q': '../resources/PapaQuebec.png',
    'R': '../resources/RomeoSierra.png',
    'S': '../resources/RomeoSierra.png',
    'SR': '../resources/SouthRamp.png',
    'T': '../resources/TangoUniformVictor.png',
    'TR': '../resources/TankerRow.png',
    'U': '../resources/TangoUniformVictor.png',
    'V': '../resources/TangoUniformVictor.png',
};


function showChecklist(option) {
    try {
        const spotsData = {
            'A': createSpotsList(16, 'A'),
            'C': createSpotsList(6, 'C'),
            'DV': createSpotsList(3, 'DV'),
            'E': createSpotsList(10, 'E'),
            'NG': createSpotsList(14, 'NG'),
            'SG': createSpotsList(26, 'SG'),
            'K': createSpotsList(18, 'K'),
            'M': createSpotsList(12, 'M'),
            'O': createSpotsList(5, 'O'),
            'P': createSpotsList(16, 'P'),
            'Q': createSpotsList(16, 'Q'),
            'R': createSpotsList(16, 'R'),
            'S': createSpotsList(16, 'S'),
            'SR': createSpotsList(16, 'SR'),
            'T': createSpotsList(12, 'T'),
            'TR': createSpotsList(22, 'TR'),
            'U': createSpotsList(12, 'U'),
        };
        const spotsHTML = spotsData[option] || 'No spots available for this selection.';
        const apronImageSrc = apronImages[option] || ''; // Default image if none specified

        document.getElementById('spd').innerHTML = spotsHTML;
        var outputDiv = document.querySelector('.output');
        if (apronImageSrc) {
            updateCanvasBackground(apronImageSrc);
            document.getElementById('saveButton').style.display = 'flex';
        } else {
            document.querySelector('.output').style.display = "none";
            outputDiv.style.display = "none"; // Hide the output div if no apron image
        }
        updateCanvasBackground(apronImageSrc);
        clearAllTiles();
        resetSpotCheckboxes();


    } catch (error) {
        console.error("Failed to show checklist: ", error);
    }
}

function updateCanvasBackground(imageSrc) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");
    var img = new Image();

    img.onload = function () {
        // Make sure the output container is visible when the image is ready to be drawn
        var outputDiv = document.querySelector('.output');
        outputDiv.style.display = "flex";
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };

    img.src = imageSrc;
}

function clearAllTiles() {
    const tilesContainer = document.getElementById('aircraftDetailTiles');
    while (tilesContainer.firstChild) {
        tilesContainer.removeChild(tilesContainer.firstChild);
    }
}

function resetSpotCheckboxes() {
    // Get all spot checkboxes and reset their checked state
    document.querySelectorAll('.spotcheck').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Clear all picked divs as well
    document.querySelectorAll('.picked').forEach(pickedDiv => {
        pickedDiv.remove();
    });
}


function createSpotsList(count, apron) {
    let spots = '';
    for (let i = 1; i <= count; i++) {
        spots += `
            <div class="spot">
                <label for="${apron + i}">${apron + i}</label>
                <input type="checkbox" id="${apron + i}" class="spotcheck">
            </div>
        `;
    }
    return `<style>#${apron}{background-color: #444;}</style>` + spots;
}
// ------------------------------------- Picked Spots and additional options ---------------------------------

// Generic function to handle changes for all checkboxes that affect spot display


function handleCheckboxChange(event) {
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
        createPickedDiv(label, showTag, showDetails);
    } else {
        removePickedDiv(label);
        removeIconFromCanvas(label);
        removeAircraftDetailTile(label);
        clearTagFromCanvas(label);
    }
}


function removeAircraftDetailTile(label) {
    const tile = document.getElementById('tile-' + label);
    if (tile) {
        tile.remove();
    }
}


// Event delegation for handling spot checkbox changes
document.getElementById('spd').addEventListener('change', function (event) {
    if (event.target.classList.contains('spotcheck')) {
        handleCheckboxChange(event);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize any necessary states or handlers
    document.getElementById('aircraftDetails').addEventListener('change', function () {
        var pickedDivs = document.querySelectorAll('.picked');
        pickedDivs.forEach(function (div) {
            ['Callsign', 'Aircraft Type', 'ETA'].forEach(function (detail) {
                var detailInputDiv = div.querySelector(`.pkinput[label="${detail}"]`);
                if (detailInputDiv) {
                    detailInputDiv.style.display = this.checked ? '' : 'none';
                }
            });
        });
    });

    document.getElementById("header").addEventListener("change", toggleHeaderVisibility);
    document.getElementById("headerText").addEventListener("input", function () {
        if (document.getElementById("header").checked) {
            drawCanvas(this.value);
        }
    });

    // Apply the initial visibility state based on the checkbox
    toggleHeaderVisibility();
    // Clear the canvas initially
    drawCanvas('');
});

function createPickedDiv(label, showTag, showDetails) {
    var pickedDiv = document.createElement('div');
    pickedDiv.className = 'picked';
    pickedDiv.setAttribute('id', 'picked-' + label);

    var h1 = document.createElement('h1');
    h1.textContent = label;
    pickedDiv.appendChild(h1);

    if (showTag) {
        var inputTag = document.createElement('input');
        inputTag.setAttribute('type', 'text');
        inputTag.setAttribute('maxlength', '7'); // Limit characters; adjust as needed based on tag size
        inputTag.setAttribute('placeholder', '8 Char Limit');
        inputTag.setAttribute('id', 'tagInput-' + label);
        inputTag.addEventListener('input', function () {
            drawTagOnCanvas(label, this.value);
        });
        pickedDiv.appendChild(createDetailElement('Tag', inputTag));
    }

    if (showDetails) {
        var inputCallsign = document.createElement('input');
        var inputAircraftType = document.createElement('input');
        var inputETA = document.createElement('input');
        inputCallsign.className = 'input-callsign';
        inputAircraftType.className = 'input-aircraft-type';
        inputETA.className = 'input-eta';

        // Setup listeners to update tiles on input
        setupInputListener(inputCallsign, label, 'callsign');
        setupInputListener(inputAircraftType, label, 'aircraft-type');
        setupInputListener(inputETA, label, 'eta');

        pickedDiv.appendChild(createDetailElement('Callsign', inputCallsign));
        pickedDiv.appendChild(createDetailElement('Aircraft Type', inputAircraftType));
        pickedDiv.appendChild(createDetailElement('ETA', inputETA));
    }

    pickedDiv.appendChild(createPlaneButtonPart(label));
    document.getElementById('pickedContainer').appendChild(pickedDiv);
}

function createAircraftDetailTile(label) {
    // First, check if the tile already exists
    let tile = document.getElementById('tile-' + label);
    if (!tile) {
        const tileContainer = document.getElementById('aircraftDetailTiles');
        tile = document.createElement('div');
        tile.className = 'aircraft-tile';
        tile.id = 'tile-' + label;  // Ensure the tile has a unique ID
        tile.innerHTML = `
            <div class="aircraft-label">${label}</div>
            <div class="aircraft-callsign"><strong>Callsign:</strong> <span class="callsign-data"></span></div>
            <div class="aircraft-type"><strong>Aircraft Type:</strong> <span class="aircraft-type-data"></span></div>
            <div class="aircraft-eta"><strong>ETA:</strong> <span class="eta-data"></span></div>
        `;
        tileContainer.appendChild(tile);
    }
    return tile;
}

function updateAircraftDetailTile(label, fieldType, value) {
    var tile = document.getElementById('tile-' + label) || createAircraftDetailTile(label);
    var fieldSpan = tile.querySelector('.' + fieldType + '-data');
    if (fieldSpan) {
        fieldSpan.textContent = value;
    }

}

function setupInputListener(inputElement, label, fieldType) {
    inputElement.addEventListener('input', function () {
        updateAircraftDetailTile(label, fieldType, this.value);
    });
}


function toggleTagInputVisibility() {
    var tagInputs = document.querySelectorAll('.picked .pkinput[label="Tag"]');
    tagInputs.forEach(function (tagInput) {
        tagInput.style.display = this.checked ? '' : 'none';
    });
}

function createDetailElement(labelText, inputElement) {
    var div = document.createElement('div');
    div.className = 'pkinput';
    var label = document.createElement('label');
    label.textContent = labelText;
    div.appendChild(label);
    div.appendChild(inputElement);
    return div;
}

function createPlaneButtonPart(label) {
    var btnPart = document.createElement('div');
    btnPart.className = 'plnbtnprt';

    var planeButton = createButton('../resources/plane.png', 'Big', 'plane', label);
    var jetButton = createButton('../resources/jet.png', 'Small', 'jet', label);

    btnPart.appendChild(planeButton);
    btnPart.appendChild(jetButton);
    return btnPart;
}


function createButton(imageSrc, altText, className, label) {
    var button = document.createElement('div');
    button.className = 'planebtn';
    var image = document.createElement('img');
    image.src = imageSrc;
    image.alt = altText;
    image.className = className;
    button.appendChild(image);

    // Add event listener to handle image drawing
    button.addEventListener('click', function () {
        drawImageOnCanvas(imageSrc, label);
    });

    return button;
}


function removePickedDiv(label) {
    var pickedDiv = document.getElementById('picked-' + label);
    if (pickedDiv) {
        pickedDiv.remove();  // Remove the picked div from the DOM
    }
}


// -------------------------------------- Output Header ----------------------------------------------

// Function to toggle the visibility of the imgheader div
function toggleHeaderVisibility() {
    var headerCheckbox = document.getElementById('header');
    var headerDiv = document.getElementById('imgheader');
    // Check if the checkbox is checked and toggle visibility accordingly
    if (headerCheckbox.checked) {
        headerDiv.style.display = 'block';  // Show the div
        drawCanvas(document.getElementById('headerText').value); // Draw the existing header text
    } else {
        headerDiv.style.display = 'none';  // Hide the div
        document.getElementById('headerText').value = '';  // Clear the text input
        drawCanvas('');  // Clear the text from the canvas as well
    }
}

// Function to draw or clear header text on canvas
function drawCanvas(text) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");

    var textHeight = 30;
    var padding = 10;
    var yPosition = 2;
    var headerHeight = textHeight + padding * 2 + 2;  // Total height including padding

    // Redraw the background in the header area before updating the text
    redrawBackground(ctx, 0, yPosition, canvas.width, headerHeight, () => {
        // Redraw the header text if any
        if (text.trim() !== '') {
            drawText(ctx, text, yPosition + padding, textHeight);
        }
    });
}


function drawText(ctx, text, yPosition, textHeight) {
    var canvas = document.getElementById("apronimg");

    ctx.font = "30px Roboto, Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";

    var textWidth = ctx.measureText(text).width;
    var canvasCenterX = canvas.width / 2;
    var rectX = canvasCenterX - textWidth / 2 - 5;
    var rectWidth = textWidth + 10;
    var rectY = yPosition - 2;
    var rectHeight = textHeight + 10;

    // Draw white background for the text for better visibility
    ctx.fillStyle = "white";
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Draw a black outline around the white rectangle
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Finally, draw the text
    ctx.fillStyle = "black";
    ctx.fillText(text, canvasCenterX, rectY + rectHeight / 2 + 10);
}


document.getElementById("header").addEventListener("change", toggleHeaderVisibility);
document.getElementById("headerText").addEventListener("input", function () {
    if (document.getElementById("header").checked) {
        drawCanvas(this.value);
    }
});

// Setup function to initialize the state on page load
window.onload = function () {
    toggleHeaderVisibility();  // Apply the initial visibility state based on the checkbox
    drawCanvas('');  // Clear the canvas initially
};

//------------------------------- Paint the Planes! -------------------------------------

function drawImageOnCanvas(imageSrc, label) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");
    var img = new Image();

    // Get coordinates for the label
    const coordinates = getCoordinatesForLabel(label);

    img.onload = function () {
        if (spotState[label]) {
            // Redraw the background portion before updating the image
            redrawBackground(ctx, spotState[label].x, spotState[label].y, 55, 55, () => {
                // Once background is redrawn, draw the new image
                ctx.drawImage(img, coordinates.x, coordinates.y, 55, 55);

                // Update the spot state with new details
                spotState[label] = { imageSrc, x: coordinates.x, y: coordinates.y };
            });
        } else {
            ctx.drawImage(img, coordinates.x, coordinates.y, 55, 55);
            spotState[label] = { imageSrc, x: coordinates.x, y: coordinates.y };
        }
    };
    img.src = imageSrc;
}

function getCoordinatesForLabel(label) {
    // Adjust coordinates based on the label, you might use a switch or a more sophisticated method
    switch (label) {
        case 'SR1': return { x: 68.5, y: 170 };
        case 'SR2': return { x: 134, y: 170 };
        case 'SR3': return { x: 200, y: 170 };
        case 'SR4': return { x: 266, y: 170 };
        case 'SR5': return { x: 331, y: 170 };
        case 'SR6': return { x: 397, y: 170 };
        case 'SR7': return { x: 462, y: 170 };
        case 'SR8': return { x: 528, y: 170 };
        case 'SR9': return { x: 593, y: 170 };
        case 'SR10': return { x: 659, y: 170 };
        case 'SR11': return { x: 724, y: 170 };
        case 'SR12': return { x: 789, y: 170 };
        case 'SR13': return { x: 855, y: 170 };
        case 'SR14': return { x: 920, y: 170 };
        case 'SR15': return { x: 986, y: 170 };
        case 'SR16': return { x: 1051, y: 170 };
        // Add more cases as needed
        default: return { x: 10, y: 10 }; // Default coordinates
    }
}

function redrawBackground(ctx, x, y, width, height, callback) {
    var bgImg = new Image();
    bgImg.src = spotState.background; // Ensure the background image source is stored in spotState
    bgImg.onload = function () {
        // Redraw the specific area of the background
        ctx.drawImage(bgImg, x, y, width, height, x, y, width, height);
        callback(); // Execute the callback to continue drawing the tag
    };
}


function updateCanvasBackground(imageSrc) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");
    var img = new Image();

    img.onload = function () {
        // Store the background image source in the state
        spotState.background = imageSrc;

        // Make sure the output container is visible when the image is ready to be drawn
        var outputDiv = document.querySelector('.output');
        outputDiv.style.display = "flex";
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };

    img.src = imageSrc;
}

function removeIconFromCanvas(label) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");

    if (spotState[label]) {
        // Redraw the background portion to effectively remove the icon
        redrawBackground(ctx, spotState[label].x, spotState[label].y, 55, 55, () => {
            // Clear the state after removing the icon
            delete spotState[label];
        });
    }
}


// -------------------------------------- Tag the Aircraft ---------------------------------------

var tagImg = new Image();
tagImg.src = '../resources/tag.png'; // Load the image once outside the function

function drawTagOnCanvas(label, text) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");
    var coordinates = getCoordinatesForLabel(label);

    // Define the tag position and size
    var tagWidth = 100;
    var tagHeight = 15;
    var tagX = coordinates.x - 53;
    var tagY = coordinates.y + 92;

    // Check if the text is empty
    if (text.trim() === '') {
        // If text is empty, restore the background only
        redrawBackgroundTag(ctx, tagX, tagY, tagWidth, tagHeight, -Math.PI / 3.5, () => {
            // Actions after background has been redrawn, if any
        });
    } else {
        // Proceed with loading and drawing the tag with text
        var tagImg = new Image();
        tagImg.src = '../resources/tag.png';
        tagImg.onload = () => {
            redrawBackground(ctx, tagX, tagY, tagWidth, tagHeight, () => {
                // Save the current context state
                ctx.save();

                // Calculate the center of the tag for rotation
                var centerX = tagX + tagWidth / 2;
                var centerY = tagY + tagHeight / 2;

                // Translate to the center, rotate, then translate back
                ctx.translate(centerX, centerY);
                ctx.rotate(-Math.PI / 3.5); // Adjust the rotation angle as necessary
                ctx.translate(-centerX, -centerY);

                // Draw the tag background
                ctx.drawImage(tagImg, tagX, tagY, tagWidth, tagHeight);

                // Set up text properties
                ctx.font = '12px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'end';

                // Draw the text at the adjusted position
                ctx.fillText(text, tagX + 3, tagY + 12);

                // Restore the context to the previous state
                ctx.restore();
            });
        };
    }
}


function calculateRotatedBoundingBox(x, y, width, height, angle) {
    // Center of the rectangle
    var centerX = x + width / 2;
    var centerY = y + height / 2;

    // Corners of the rectangle relative to the center
    var corners = [
        { x: -width / 2, y: -height / 2 },
        { x: width / 2, y: -height / 2 },
        { x: width / 2, y: height / 2 },
        { x: -width / 2, y: height / 2 }
    ];

    // Calculate new corners after rotation
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    var cornersRotated = corners.map(corner => ({
        x: corner.x * cos - corner.y * sin + centerX,
        y: corner.x * sin + corner.y * cos + centerY
    }));

    // Find min/max coordinates to cover the entire area
    var minX = Math.min(...cornersRotated.map(corner => corner.x));
    var maxX = Math.max(...cornersRotated.map(corner => corner.x));
    var minY = Math.min(...cornersRotated.map(corner => corner.y));
    var maxY = Math.max(...cornersRotated.map(corner => corner.y));

    return { minX, maxX, minY, maxY };
}

function redrawBackgroundTag(ctx, x, y, width, height, angle, callback) {
    var { minX, minY, maxX, maxY } = calculateRotatedBoundingBox(x, y, width, height, angle);

    // Clear the area
    ctx.clearRect(minX, minY, maxX - minX, maxY - minY);

    // Optionally, redraw background image or color if needed
    var bgImg = new Image();
    bgImg.src = spotState.background; // Replace with your actual background image
    bgImg.onload = function () {
        ctx.drawImage(bgImg, minX, minY, maxX - minX, maxY - minY, minX, minY, maxX - minX, maxY - minY);
        if (callback) callback();
    };
}

function clearTagFromCanvas(label) {
    var ctx = document.getElementById("apronimg").getContext("2d");
    var coordinates = getCoordinatesForLabel(label);

    // Define the tag position and size
    var tagWidth = 100;
    var tagHeight = 15;
    var tagX = coordinates.x - 53;
    var tagY = coordinates.y + 92;

    // Clear the tag area
    redrawBackgroundTag(ctx, tagX, tagY, tagWidth, tagHeight, -Math.PI / 3.5, () => {
        console.log('Tag area cleared for label:', label);
    });
}










//-------------------------- Save Button --------------------------
document.getElementById('saveButton').addEventListener('click', function () {
    var outputCanvas = document.createElement('canvas');
    var ctx = outputCanvas.getContext('2d');
    var outputDiv = document.querySelector('.output');

    // Set dimensions for the output canvas
    outputCanvas.width = outputDiv.offsetWidth;
    outputCanvas.height = outputDiv.offsetHeight;

    // Get the apron canvas and draw it on the output canvas
    var apronCanvas = document.getElementById('apronimg');
    ctx.drawImage(apronCanvas, 0, 0);

    // Optionally add other elements if needed
    // For instance, if there are texts or other images that need to be captured, draw them here

    // Convert the output canvas to a data URL and trigger download
    outputCanvas.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.download = 'output-image.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL object
    }, 'image/png');
});


