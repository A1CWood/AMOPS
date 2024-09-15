import { getCoordinatesForLabel, getCoordinatesForTag, getMirrorStateForLabel } from './coordinates.js';

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

    clearCanvas(canvasState) {
        console.log('Clearing canvas');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (canvasState.currentApron) {
            this.updateCanvasBackground(canvasState.currentApron);
        }
    }

    updateCanvasBackground(apronImageSrc) {
        console.log(`Updating canvas background: ${apronImageSrc}`);
        this.loadImage(apronImageSrc, (img) => {
            this.spotState.background = apronImageSrc;
            this.canvas.width = img.naturalWidth;
            this.canvas.height = img.naturalHeight;
            this.ctx.drawImage(img, 0, 0, img.width, img.height);
        });
    }

    drawHeader(text) {
        console.log(`Drawing header text: ${text}`);
        const ctx = this.ctx;
        const canvas = this.canvas;
        const headerHeight = 55;
        const padding = 10;
        const previousTextWidth = this.previousHeaderText ? ctx.measureText(this.previousHeaderText).width : 0;
        const previousClearWidth = previousTextWidth + 2 * padding + 4;

        this.redrawBackground((canvas.width - previousClearWidth) / 2, 0, previousClearWidth, headerHeight, () => {
            if (text.trim() !== '') {
                ctx.font = "30px Roboto, Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                const textWidth = ctx.measureText(text).width;
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
            this.previousHeaderText = text; // Save the current header text for the next redraw
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

    drawTagOnCanvas(label, text) {
        const { x, y, rotation, width, height } = getCoordinatesForTag(label);
        const mirror = getMirrorStateForLabel(label, "tag");

        console.log(`Drawing tag on canvas for label: ${label} with text: ${text} and mirror: ${mirror}`);

        const textOffset = mirror ? width * 0.2 : 3; // Offset for mirrored text

        if (text.trim() === '') {
            return;
        }

        this.loadImage('../resources/tag.png', (tagImg) => {
            this.ctx.save();
            this.ctx.translate(x + width / 2, y + height / 2); // Center of the tag
            this.ctx.rotate(rotation);
            if (mirror) {
                this.ctx.scale(-1, 1);
            }
            this.ctx.translate(-width / 2, -height / 2); // Back to the top-left of the tag
            this.ctx.drawImage(tagImg, 0, 0, width, height);

            // Reset the mirroring for text
            if (mirror) {
                this.ctx.translate(width / 2, height / 2);
                this.ctx.scale(-1, 1);
                this.ctx.translate(-width / 2, -height / 2);
            }
            const fontSize = height * 0.9;
            this.ctx.font = `bold ${fontSize}px Arial`;
            this.ctx.fillStyle = 'black';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(text, textOffset, height * 0.85);
            this.ctx.restore();
        });
    }


    drawImageOnCanvas(imageSrc, label, type) {
        const { x, y, rotation, width, height } = getCoordinatesForLabel(label, type);
        const mirror = getMirrorStateForLabel(label, type);

        console.log(`Drawing image on canvas for label: ${label} with imageSrc: ${imageSrc} and type: ${type}`);

        this.loadImage(imageSrc, (img) => {
            this.ctx.save();
            this.ctx.translate(x + width / 2, y + height / 2);
            this.ctx.rotate(rotation);
            if (mirror) {
                this.ctx.scale(-1, 1);
            }
            this.ctx.drawImage(img, -width / 2, -height / 2, width, height);
            this.ctx.restore();
        });
    }


    refreshCanvas(canvasState) {
        this.clearCanvas(canvasState);
        canvasState.planes.forEach(plane => {
            if (plane.showTag) {
                this.drawTagOnCanvas(plane.id, plane.tagData);
            }
            this.drawImageOnCanvas(plane.imageSrc, plane.id, plane.planeType);
        });
    }
}
