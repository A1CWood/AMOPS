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

    drawTagOnCanvas(label, text) {
        const { x, y, rotation } = this.getCoordinatesForTag(label);
        const mirror = this.getMirrorStateForLabel(label, "tag");

        console.log(`Drawing tag on canvas for label: ${label} with text: ${text} and mirror: ${mirror}`);

        const tagWidth = 100;
        const tagHeight = 15;
        const textOffset = mirror ? tagWidth * 0.2 : 3; // Offset for mirrored text

        if (text.trim() === '') {
            return;
        }

        this.loadImage('../resources/tag.png', (tagImg) => {
            this.ctx.save();
            this.ctx.translate(x + tagWidth / 2, y + tagHeight / 2); // Center of the tag
            this.ctx.rotate(rotation);
            if (mirror) {
                this.ctx.scale(-1, 1);
            }
            this.ctx.translate(-tagWidth / 2, -tagHeight / 2); // Back to the top-left of the tag
            this.ctx.drawImage(tagImg, 0, 0, tagWidth, tagHeight);

            // Reset the mirroring for text
            if (mirror) {
                this.ctx.translate(tagWidth / 2, tagHeight / 2);
                this.ctx.scale(-1, 1);
                this.ctx.translate(-tagWidth / 2, -tagHeight / 2);
            }

            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillStyle = 'black';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(text, textOffset, 12);
            this.ctx.restore();
        });
    }




    clearTagFromCanvas(label) {
        console.log(`Clearing tag from canvas for label: ${label}`);
        const { x, y, rotation } = this.getCoordinatesForTag(label);
        const mirror = this.getMirrorStateForLabel(label, "tag");

        const tagWidth = 100;
        const tagHeight = 15;

        const { minX, minY, maxX, maxY } = this.calculateRotatedBoundingBox(x, y, tagWidth, tagHeight, rotation);

        this.ctx.clearRect(minX, minY, maxX - minX, maxY - minY);

        this.redrawBackground(minX, minY, maxX - minX, maxY - minY, () => {
            console.log(`Tag background redrawn for ${label}`);
        });
    }




    redrawBackgroundTag(x, y, width, height, angle, mirror, callback) {
        var { minX, minY, maxX, maxY } = this.calculateRotatedBoundingBox(x, y, width, height, angle);

        // Clear the area
        this.ctx.clearRect(minX, minY, maxX - minX, maxY - minY);

        // Optionally, redraw background image or color if needed
        this.loadImage(this.spotState.background, (img) => {
            this.ctx.drawImage(img, minX, minY, maxX - minX, maxY - minY, minX, minY, maxX - minX, maxY - minY);
            if (callback) callback();
        });
    }



    calculateRotatedBoundingBox(x, y, width, height, angle) {
        const radians = angle;
        const cx = x + width / 2;
        const cy = y + height / 2;

        const corners = [
            { x: x - cx, y: y - cy },
            { x: x + width - cx, y: y - cy },
            { x: x + width - cx, y: y + height - cy },
            { x: x - cx, y: y + height - cy }
        ];

        const rotatedCorners = corners.map(corner => ({
            x: cx + (corner.x * Math.cos(radians) - corner.y * Math.sin(radians)),
            y: cy + (corner.x * Math.sin(radians) + corner.y * Math.cos(radians))
        }));

        const minX = Math.min(...rotatedCorners.map(corner => corner.x));
        const maxX = Math.max(...rotatedCorners.map(corner => corner.x));
        const minY = Math.min(...rotatedCorners.map(corner => corner.y));
        const maxY = Math.max(...rotatedCorners.map(corner => corner.y));

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
            // SOUTH RAMP
            case 'SR1': return { x: 69, y: 173, rotation: 180 * Math.PI / 180 };
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
            // TANKER ROW
            case 'TR11': return { x: 29, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR12': return { x: 93, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR13': return { x: 157, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR14': return { x: 222, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR15': return { x: 286, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR16': return { x: 350, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR17': return { x: 414, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR18': return { x: 478, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR19': return { x: 541, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR20': return { x: 605, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR21': return { x: 671, y: 135, rotation: 30 * Math.PI / 180 };
            case 'TR22': return { x: 736, y: 135, rotation: 30 * Math.PI / 180 };
            //OSCAR
            case 'O1': return { x: 89, y: 213, rotation: 0 };
            case 'O2': return { x: 283, y: 213, rotation: 0 };
            case 'O3': return { x: 463, y: 213, rotation: 0 };
            case 'O4': return { x: 653, y: 213, rotation: 0 };
            case 'O5': return { x: 825, y: 213, rotation: 0 };
            //P
            case 'P1': return { x: 114, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P2': return { x: 149, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P3': return { x: 186 + 1, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P4': return { x: 221 + 1, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P5': return { x: 257 + 2, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P6': return { x: 293 + 2, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P7': return { x: 330 + 3, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P8': return { x: 365 + 3, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P9': return { x: 402 + 4, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P10': return { x: 438 + 4, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P11': return { x: 474 + 5, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P12': return { x: 510 + 5, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P13': return { x: 546 + 6, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P14': return { x: 581 + 6, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P15': return { x: 618 + 7, y: 117, rotation: 150 * Math.PI / 180 };
            case 'P16': return { x: 653 + 7, y: 117, rotation: 150 * Math.PI / 180 };
            //Q
            case 'Q1': return { x: 112, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q2': return { x: 149, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q3': return { x: 186, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q4': return { x: 222, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q5': return { x: 259, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q6': return { x: 295, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q7': return { x: 333, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q8': return { x: 368, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q9': return { x: 406, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q10': return { x: 441, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q11': return { x: 479, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q12': return { x: 513, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q13': return { x: 552, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q14': return { x: 588, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q15': return { x: 626, y: 233, rotation: 30 * Math.PI / 180 };
            case 'Q16': return { x: 663, y: 233, rotation: 30 * Math.PI / 180 };
            //R
            case 'R1': return { x: 42, y: 98, rotation: 150 * Math.PI / 180 };
            case 'R2': return { x: 79, y: 98, rotation: 150 * Math.PI / 180 };
            case 'R3': return { x: 115, y: 98, rotation: 150 * Math.PI / 180 };
            case 'R4': return { x: 153, y: 98, rotation: 150 * Math.PI / 180 };
            case 'R5': return { x: 189, y: 98, rotation: 150 * Math.PI / 180 }; // 189 - 1 = 188
            case 'R6': return { x: 226 - 1, y: 98, rotation: 150 * Math.PI / 180 }; // 226 - 1 = 225
            case 'R7': return { x: 262 - 1, y: 98, rotation: 150 * Math.PI / 180 }; // 263 - 1 = 262
            case 'R8': return { x: 300 - 1, y: 98, rotation: 150 * Math.PI / 180 }; // 300 - 1 = 299
            case 'R9': return { x: 337 - 2, y: 98, rotation: 150 * Math.PI / 180 }; // 336 - 2 = 334
            case 'R10': return { x: 374 - 2, y: 98, rotation: 150 * Math.PI / 180 }; // 373 - 2 = 371
            case 'R11': return { x: 410 - 2, y: 98, rotation: 150 * Math.PI / 180 }; // 410 - 2 = 408
            case 'R12': return { x: 446 - 2, y: 98, rotation: 150 * Math.PI / 180 }; // 447 - 2 = 445
            case 'R13': return { x: 483 - 3, y: 98, rotation: 150 * Math.PI / 180 }; // 483 - 3 = 480
            case 'R14': return { x: 519 - 3, y: 98, rotation: 150 * Math.PI / 180 }; // 520 - 3 = 517
            case 'R15': return { x: 557 - 3, y: 98, rotation: 150 * Math.PI / 180 }; // 557 - 3 = 554
            case 'R16': return { x: 594 - 3, y: 98, rotation: 150 * Math.PI / 180 }; // 594 - 3 = 591
            //S
            case 'S1': return { x: 43, y: 214, rotation: 30 * Math.PI / 180 };
            case 'S2': return { x: 80, y: 214, rotation: 30 * Math.PI / 180 };
            case 'S3': return { x: 116, y: 214, rotation: 30 * Math.PI / 180 };
            case 'S4': return { x: 151, y: 214, rotation: 30 * Math.PI / 180 };
            case 'S5': return { x: 190 - 1, y: 214, rotation: 30 * Math.PI / 180 }; // 190 - 1 = 189
            case 'S6': return { x: 228 - 1, y: 214, rotation: 30 * Math.PI / 180 }; // 227 - 1 = 226
            case 'S7': return { x: 265 - 1, y: 214, rotation: 30 * Math.PI / 180 }; // 264 - 1 = 263
            case 'S8': return { x: 301 - 1, y: 214, rotation: 30 * Math.PI / 180 }; // 301 - 1 = 300
            case 'S9': return { x: 339 - 2, y: 214, rotation: 30 * Math.PI / 180 }; // 337 - 2 = 335
            case 'S10': return { x: 376 - 2, y: 214, rotation: 30 * Math.PI / 180 }; // 374 - 2 = 372
            case 'S11': return { x: 412 - 2, y: 214, rotation: 30 * Math.PI / 180 }; // 411 - 2 = 409
            case 'S12': return { x: 448 - 2, y: 214, rotation: 30 * Math.PI / 180 }; // 448 - 2 = 446
            case 'S13': return { x: 484 - 3, y: 214, rotation: 30 * Math.PI / 180 }; // 484 - 3 = 481
            case 'S14': return { x: 521 - 3, y: 214, rotation: 30 * Math.PI / 180 }; // 521 - 3 = 518
            case 'S15': return { x: 558 - 3, y: 214, rotation: 30 * Math.PI / 180 }; // 558 - 3 = 555
            case 'S16': return { x: 594 - 3, y: 214, rotation: 30 * Math.PI / 180 }; // 595 - 3 = 592








            default: return { x: 10, y: 10, rotation: 0 }; // Default coordinates
        }
    }

    getCoordinatesForTag(label) {
        switch (label) {
            //SOUTH RAMP
            case 'SR1': return { x: 15, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR2': return { x: 80, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR3': return { x: 146, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR4': return { x: 212, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR5': return { x: 277, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR6': return { x: 343, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR7': return { x: 408, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR8': return { x: 474, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR9': return { x: 539, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR10': return { x: 605, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR11': return { x: 670, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR12': return { x: 735, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR13': return { x: 801, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR14': return { x: 866, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR15': return { x: 932, y: 263, rotation: -50 * Math.PI / 180 };
            case 'SR16': return { x: 997, y: 263, rotation: -50 * Math.PI / 180 };
            //TANKER ROW
            case 'TR11': return { x: 19, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR12': return { x: 83, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR13': return { x: 147, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR14': return { x: 212, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR15': return { x: 276, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR16': return { x: 340, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR17': return { x: 404, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR18': return { x: 468, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR19': return { x: 531, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR20': return { x: 595, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR21': return { x: 661, y: 230, rotation: 50 * Math.PI / 180 };
            case 'TR22': return { x: 726, y: 230, rotation: 50 * Math.PI / 180 };
            //OSCAR
            case 'O1': return { x: 109, y: 292, rotation: 30 * Math.PI / 180 };
            case 'O2': return { x: 303, y: 292, rotation: 30 * Math.PI / 180 };
            case 'O3': return { x: 483, y: 292, rotation: 30 * Math.PI / 180 };
            case 'O4': return { x: 673, y: 292, rotation: 30 * Math.PI / 180 };
            case 'O5': return { x: 845, y: 292, rotation: 30 * Math.PI / 180 };
            //P
            case 'P1': return { x: 50, y: 85, rotation: 55 * Math.PI / 180 };
            case 'P2': return { x: 85, y: 85, rotation: 55 * Math.PI / 180 }; // 50 + 37
            case 'P3': return { x: 123, y: 85, rotation: 55 * Math.PI / 180 }; // 85 + 37 + 1
            case 'P4': return { x: 158, y: 85, rotation: 55 * Math.PI / 180 }; // 123 + 35 + 1
            case 'P5': return { x: 195, y: 85, rotation: 55 * Math.PI / 180 }; // 158 + 37 + 2
            case 'P6': return { x: 231, y: 85, rotation: 55 * Math.PI / 180 }; // 195 + 36 + 2
            case 'P7': return { x: 269, y: 85, rotation: 55 * Math.PI / 180 }; // 231 + 38 + 3
            case 'P8': return { x: 304, y: 85, rotation: 55 * Math.PI / 180 }; // 269 + 35 + 3
            case 'P9': return { x: 342, y: 85, rotation: 55 * Math.PI / 180 }; // 304 + 38 + 4
            case 'P10': return { x: 378, y: 85, rotation: 55 * Math.PI / 180 }; // 342 + 36 + 4
            case 'P11': return { x: 415, y: 85, rotation: 55 * Math.PI / 180 }; // 378 + 37 + 5
            case 'P12': return { x: 451, y: 85, rotation: 55 * Math.PI / 180 }; // 415 + 36 + 5
            case 'P13': return { x: 488, y: 85, rotation: 55 * Math.PI / 180 }; // 451 + 37 + 6
            case 'P14': return { x: 523, y: 85, rotation: 55 * Math.PI / 180 }; // 488 + 35 + 6
            case 'P15': return { x: 561, y: 85, rotation: 55 * Math.PI / 180 }; // 523 + 38 + 7
            case 'P16': return { x: 596, y: 85, rotation: 55 * Math.PI / 180 }; // 561 + 35 + 7


            default: return { x: 10, y: 10, rotation: 0 }; // Default coordinates for tag
        }
    }


    getMirrorStateForLabel(label, type) {
        console.log(`Getting mirror state for label: ${label} and type: ${type}`);
        const labelLetters = label.replace(/[0-9]/g, '');
        if (type === 'jet') {
            switch (labelLetters) {
                default: return false;
            }
        } else if (type === 'plane') {
            switch (labelLetters) {
                default: return false;
            }
        } else if (type === '2jet') {
            switch (labelLetters) {
                default: return true;
            }
        }
        else if (type === 'tag') {
            switch (labelLetters) {
                case 'TR': return true;
                case 'O': return true;
                default: return false;
            }
        }
        return false;
    }

}