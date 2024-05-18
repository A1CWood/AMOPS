export class CanvasManager {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.spotState = {};
        this.IMAGE_WIDTH = 54;
        this.IMAGE_HEIGHT = 55;
    }

    loadImage(imageSrc, callback) {
        console.log(`Loading image: ${imageSrc}`);
        const img = new Image();
        img.onload = () => {
            console.log(`Image loaded: ${imageSrc}`);
            callback(img);
        };
        img.src = imageSrc;
    }

    drawImage(img, x, y, width, height, rotation, mirror) {
        console.log(`Drawing image at (${x}, ${y}) with rotation ${rotation} and mirror ${mirror}`);
        this.ctx.save();
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate(rotation);
        if (mirror) {
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(img, -width / 2, -height / 2, width, height);
        this.ctx.restore();
    }

    clearCanvas() {
        console.log('Clearing canvas');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateCanvasBackground(imageSrc) {
        console.log(`Updating canvas background: ${imageSrc}`);
        this.loadImage(imageSrc, (img) => {
            console.log(`Image loaded: ${imageSrc}`);
            this.spotState.background = imageSrc;
            this.canvas.width = img.naturalWidth;
            this.canvas.height = img.naturalHeight;
            this.ctx.drawImage(img, 0, 0, img.width, img.height);
            console.log('Canvas background updated');
        });
    }

    drawHeader(text) {
        console.log(`Drawing header text: ${text}`);
        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear the header area
        this.redrawBackground(0, 0, canvas.width, 55, () => {
            if (text.trim() !== '') {
                ctx.font = "30px Roboto, Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                const textWidth = ctx.measureText(text).width;
                const padding = 10;
                const x = (canvas.width - textWidth) / 2 - padding;
                const y = 10;
                const width = textWidth + 2 * padding;
                const height = 40;

                ctx.fillRect(x, y, width, height); // White background
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height); // Black border

                ctx.fillStyle = "black";
                ctx.fillText(text, canvas.width / 2, 40); // Draw the text
            }
        });
    }

    clearHeader() {
        console.log('Clearing header');
        this.redrawBackground(0, 0, this.canvas.width, 55); // Clear the header area with a slightly increased height
    }

    redrawBackground(x, y, width, height, callback) {
        console.log(`Redrawing background at (${x}, ${y}) with size (${width}, ${height})`);
        this.loadImage(this.spotState.background, (img) => {
            this.ctx.drawImage(img, x, y, width, height, x, y, width, height);
            if (callback) callback();
        });
    }

    drawText(text, x, y) {
        console.log(`Drawing text: ${text} at (${x}, ${y})`);
        this.ctx.font = "30px Roboto, Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, x, y);
    }

    drawTagOnCanvas(label, text, coordinates) {
        const tagWidth = 100;
        const tagHeight = 15;
        const tagX = coordinates.x - 53;
        const tagY = coordinates.y + 92;

        console.log(`Drawing tag on canvas for label: ${label} with text: ${text}`);

        if (text.trim() === '') {
            this.clearTagFromCanvas(label);
            return;
        }

        this.loadImage('../resources/tag.png', (tagImg) => {
            this.redrawBackground(tagX, tagY, tagWidth, tagHeight, () => {
                this.ctx.save();
                this.ctx.translate(tagX + tagWidth / 2, tagY + tagHeight / 2);
                this.ctx.rotate(-Math.PI / 3.5);
                this.ctx.translate(-(tagX + tagWidth / 2), -(tagY + tagHeight / 2));
                this.ctx.drawImage(tagImg, tagX, tagY, tagWidth, tagHeight);
                this.ctx.font = '12px Arial';
                this.ctx.fillStyle = 'black';
                this.ctx.textAlign = 'left';
                this.ctx.fillText(text, tagX + 3, tagY + 12);
                this.ctx.restore();
            });
        });
    }


    clearTagFromCanvas(label) {
        console.log(`Clearing tag from canvas for label: ${label}`);
        const coordinates = this.getCoordinatesForLabel(label, "plane"); // Assuming the tag coordinates are based on the plane coordinates
        this.redrawBackgroundTag(coordinates.x - 53, coordinates.y + 92, 100, 15, -Math.PI / 3.5, () => {
            console.log(`Tag background redrawn for ${label}`);
        });
    }
    redrawBackgroundTag(x, y, width, height, angle, callback) {
        var { minX, minY, maxX, maxY } = this.calculateRotatedBoundingBox(x, y, width, height, angle);


        this.ctx.clearRect(minX, minY, maxX - minX, maxY - minY);

        // Optionally, redraw background image or color if needed
        this.loadImage(this.spotState.background, (img) => {
            this.ctx.drawImage(img, minX, minY, maxX - minX, maxY - minY, minX, minY, maxX - minX, maxY - minY);
            if (callback) callback();
        });
    }
    calculateRotatedBoundingBox(x, y, width, height, angle) {
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

    drawImageOnCanvas(imageSrc, label, type) {
        const { x, y, rotation } = this.getCoordinatesForLabel(label, type);
        const mirror = this.getMirrorStateForLabel(label, type);

        console.log(`Drawing image on canvas for label: ${label} with imageSrc: ${imageSrc} and type: ${type}`);

        this.loadImage(imageSrc, (img) => {
            // Ensure spotState[label] and spotState[label][type] are initialized properly
            if (!this.spotState[label]) {
                this.spotState[label] = {};
            }

            // Always redraw the background before drawing the new image
            this.redrawBackground(x, y, this.IMAGE_WIDTH, this.IMAGE_HEIGHT, () => {
                this.drawImage(img, x, y, this.IMAGE_WIDTH, this.IMAGE_HEIGHT, rotation, mirror);
                this.spotState[label][type] = { imageSrc, x, y, rotation, width: this.IMAGE_WIDTH, height: this.IMAGE_HEIGHT };
            });
        });
    }

    removeIconFromCanvas(label) {
        console.log(`Removing icon from canvas for label: ${label}`);
        if (this.spotState[label]) {
            // Ensure that the spotState[label] has the x, y properties for each type before calling redrawBackground
            Object.keys(this.spotState[label]).forEach(type => {
                const { x, y, width, height } = this.spotState[label][type];
                if (x !== undefined && y !== undefined) {
                    this.redrawBackground(x, y, width, height, () => {
                        console.log(`Background redrawn for ${label} at (${x}, ${y}) with size (${width}, ${height})`);
                    });
                } else {
                    console.warn(`Invalid coordinates for ${label} of type ${type}: (${x}, ${y})`);
                }
            });
            delete this.spotState[label];
        }
    }

    getCoordinatesForLabel(label, type) {
        switch (label) {
            case 'SR1': return { x: 68.5, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR2': return { x: 134, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR3': return { x: 200, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR4': return { x: 266, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR5': return { x: 331, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR6': return { x: 397, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR7': return { x: 462, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR8': return { x: 528, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR9': return { x: 593, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR10': return { x: 659, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR11': return { x: 724, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR12': return { x: 789, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR13': return { x: 855, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR14': return { x: 920, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR15': return { x: 986, y: 173, rotation: 180 * Math.PI / 180 };
            case 'SR16': return { x: 1051, y: 173, rotation: 180 * Math.PI / 180 };
            default: return { x: 10, y: 10, rotation: 0 }; // Default coordinates
        }
    }

    getMirrorStateForLabel(label, type) {
        console.log(`Getting mirror state for label: ${label} and type: ${type}`);
        if (type === 'jet') {
            switch (label) {
                default: return false;
            }
        } else if (type === 'plane') {
            switch (label) {
                default: return false;
            }
        } else if (type === '2jet') {
            switch (label) {
                default: return true;
            }
        }
        return false;
    }
}
