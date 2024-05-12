function showChecklist(option) {
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
    document.getElementById('spd').innerHTML = spotsHTML;
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

document.addEventListener('DOMContentLoaded', function () {
    var spots = document.querySelectorAll('.spot');
    var tagAircraftCheckbox = document.getElementById('tagAircraft');
    var aircraftDetailsCheckbox = document.getElementById('aircraftDetails');

    var spotCheckboxes = document.querySelectorAll('.spotcheck');
    spotCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });


    spots.forEach(function (spot) {
        var checkbox = spot.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function () {
            var label = spot.querySelector('label').innerHTML;
            var showTag = tagAircraftCheckbox.checked;
            var showDetails = aircraftDetailsCheckbox.checked;

            if (this.checked) {
                createPickedDiv(label, showTag, showDetails);
            } else {
                removePickedDiv(label);
            }
        });
    });
});

document.getElementById('spd').addEventListener('change', function (event) {
    if (event.target.classList.contains('spotcheck')) {
        var label = event.target.parentNode.querySelector('label').innerHTML;
        var showTag = document.getElementById('tagAircraft').checked;
        var showDetails = document.getElementById('aircraftDetails').checked;

        if (event.target.checked) {
            createPickedDiv(label, showTag, showDetails);
        } else {
            removePickedDiv(label);
        }
    }
});



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


function createPickedDiv(label, showTag, showDetails) {
    var pickedDiv = document.createElement('div');
    pickedDiv.className = 'picked';
    pickedDiv.setAttribute('id', 'picked-' + label);

    var h1 = document.createElement('h1');
    h1.textContent = label;
    pickedDiv.appendChild(h1);

    if (showTag) {
        var inputTag = document.createElement('input');
        pickedDiv.appendChild(createDetailElement('Tag', inputTag));
    }

    if (showDetails) {
        var inputCallsign = document.createElement('input');
        var inputAircraftType = document.createElement('input');
        var inputETA = document.createElement('input');
        pickedDiv.appendChild(createDetailElement('Callsign', inputCallsign));
        pickedDiv.appendChild(createDetailElement('Aircraft Type', inputAircraftType));
        pickedDiv.appendChild(createDetailElement('ETA', inputETA));
    }

    pickedDiv.appendChild(createPlaneButtonPart(label));
    document.getElementById('pickedContainer').appendChild(pickedDiv);
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

    // Add event listener to draw image on canvas when clicked
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
    } else {
        headerDiv.style.display = 'none';  // Hide the div
        document.getElementById('headerText').value = '';  // Clear the text input
        drawCanvas('');  // Clear the text from the canvas as well
    }
}

// Function to draw on canvas
function drawCanvas(text) {
    var canvas = document.getElementById("apronimg");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawText(ctx, text);
    };
    img.src = '../resources/SouthRamp.png';
}

function drawText(ctx, text) {
    if (text.trim() !== '') {  // Only draw if there's actual non-space text
        ctx.font = "30px Roboto, Arial";  // Use Roboto, fallback to Arial
        var textWidth = ctx.measureText(text).width;
        var canvasCenterX = ctx.canvas.width / 2;
        var textStartX = canvasCenterX - (textWidth / 2);
        var textHeight = 30;  // Approximate height based on font size

        // Adjust the position and size of the background rectangle
        var padding = 5;
        var rectX = textStartX - padding;
        var rectY = 10;
        var rectWidth = textWidth + (padding * 2);
        var rectHeight = textHeight + 10;

        // Draw white background for the text
        ctx.fillStyle = "white";
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

        // Draw black outline around the white rectangle
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

        // Draw the text
        ctx.fillStyle = "black";
        ctx.fillText(text, textStartX, 40);
    }
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
    img.onload = function () {
        var x, y, w = 55, h = 55;
        switch (label) {
            case 'A1':
                x = 68.5; y = 170; break; // Example coordinates
            case 'A2':
                x = 134; y = 170; break;
            // Add cases for other labels as needed
            default:
                x = 10; y = 10; // Default position if label doesn't match
        }
        ctx.drawImage(img, x, y, w, h); // Draw the image at the specified coordinates
    };
    img.src = imageSrc;
}



