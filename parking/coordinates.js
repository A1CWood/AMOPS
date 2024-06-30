export function getCoordinatesForLabel(label, type) {
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
        // OSCAR
        case 'O1': return { x: 89, y: 213, rotation: 0 };
        case 'O2': return { x: 283, y: 213, rotation: 0 };
        case 'O3': return { x: 463, y: 213, rotation: 0 };
        case 'O4': return { x: 653, y: 213, rotation: 0 };
        case 'O5': return { x: 825, y: 213, rotation: 0 };
        // P
        case 'P1': return { x: 114, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P2': return { x: 149, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P3': return { x: 186 + 1, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P4': return { x: 221 + 1, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P5': return { x: 257 + 2, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P6': return { x: 293 + 2, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P7': return { x: 330 + 3, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P8': return { x: 365 + 3, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P9': return { x: 402 + 4, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P10': return { x: 438 + 4, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P11': return { x: 474 + 5, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P12': return { x: 510 + 5, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P13': return { x: 546 + 6, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P14': return { x: 581 + 6, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P15': return { x: 618 + 7, y: 136, rotation: 150 * Math.PI / 180 };
        case 'P16': return { x: 653 + 7, y: 136, rotation: 150 * Math.PI / 180 };
        // Q
        case 'Q1': return { x: 112, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q2': return { x: 149, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q3': return { x: 186, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q4': return { x: 222, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q5': return { x: 259, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q6': return { x: 295, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q7': return { x: 333, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q8': return { x: 368, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q9': return { x: 406, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q10': return { x: 441, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q11': return { x: 479, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q12': return { x: 513, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q13': return { x: 552, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q14': return { x: 588, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q15': return { x: 626, y: 252, rotation: 30 * Math.PI / 180 };
        case 'Q16': return { x: 663, y: 252, rotation: 30 * Math.PI / 180 };
        // R
        case 'R1': return { x: 50, y: 142, rotation: 150 * Math.PI / 180 };
        case 'R2': return { x: 87, y: 142, rotation: 150 * Math.PI / 180 }; // R2
        case 'R3': return { x: 123, y: 142, rotation: 150 * Math.PI / 180 }; // R3
        case 'R4': return { x: 161, y: 142, rotation: 150 * Math.PI / 180 }; // R4
        case 'R5': return { x: 197, y: 142, rotation: 150 * Math.PI / 180 }; // R5
        case 'R6': return { x: 234, y: 142, rotation: 150 * Math.PI / 180 }; // R6
        case 'R7': return { x: 270, y: 142, rotation: 150 * Math.PI / 180 }; // R7
        case 'R8': return { x: 308, y: 142, rotation: 150 * Math.PI / 180 }; // R8
        case 'R9': return { x: 345, y: 142, rotation: 150 * Math.PI / 180 }; // R9
        case 'R10': return { x: 382, y: 142, rotation: 150 * Math.PI / 180 }; // R10
        case 'R11': return { x: 418, y: 142, rotation: 150 * Math.PI / 180 }; // R11
        case 'R12': return { x: 453, y: 142, rotation: 150 * Math.PI / 180 }; // R12
        case 'R13': return { x: 489, y: 142, rotation: 150 * Math.PI / 180 }; // R13
        case 'R14': return { x: 525, y: 142, rotation: 150 * Math.PI / 180 }; // R14
        case 'R15': return { x: 563, y: 142, rotation: 150 * Math.PI / 180 }; // R15
        case 'R16': return { x: 601, y: 142, rotation: 150 * Math.PI / 180 }; // R16
        // S
        case 'S1': return { x: 51, y: 258, rotation: 30 * Math.PI / 180 }; // S1
        case 'S2': return { x: 88, y: 258, rotation: 30 * Math.PI / 180 }; // S2
        case 'S3': return { x: 124, y: 258, rotation: 30 * Math.PI / 180 }; // S3
        case 'S4': return { x: 159, y: 258, rotation: 30 * Math.PI / 180 }; // S4
        case 'S5': return { x: 197, y: 258, rotation: 30 * Math.PI / 180 }; // S5
        case 'S6': return { x: 235, y: 258, rotation: 30 * Math.PI / 180 }; // S6
        case 'S7': return { x: 272, y: 258, rotation: 30 * Math.PI / 180 }; // S7
        case 'S8': return { x: 308, y: 258, rotation: 30 * Math.PI / 180 }; // S8
        case 'S9': return { x: 346, y: 258, rotation: 30 * Math.PI / 180 }; // S9
        case 'S10': return { x: 383, y: 258, rotation: 30 * Math.PI / 180 }; // S10
        case 'S11': return { x: 419, y: 258, rotation: 30 * Math.PI / 180 }; // S11
        case 'S12': return { x: 454, y: 258, rotation: 30 * Math.PI / 180 }; // S12
        case 'S13': return { x: 492, y: 258, rotation: 30 * Math.PI / 180 }; // S13
        case 'S14': return { x: 529, y: 258, rotation: 30 * Math.PI / 180 }; // S14
        case 'S15': return { x: 563, y: 258, rotation: 30 * Math.PI / 180 }; // S15
        case 'S16': return { x: 599, y: 258, rotation: 30 * Math.PI / 180 }; // S16

        default: return { x: 10, y: 10, rotation: 0 }; // Default coordinates
    }
}

export function getCoordinatesForTag(label) {
    switch (label) {
        // SOUTH RAMP
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
        // TANKER ROW
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
        // OSCAR
        case 'O1': return { x: 109, y: 292, rotation: 30 * Math.PI / 180 };
        case 'O2': return { x: 303, y: 292, rotation: 30 * Math.PI / 180 };
        case 'O3': return { x: 483, y: 292, rotation: 30 * Math.PI / 180 };
        case 'O4': return { x: 673, y: 292, rotation: 30 * Math.PI / 180 };
        case 'O5': return { x: 845, y: 292, rotation: 30 * Math.PI / 180 };
        // P
        case 'P1': return { x: 60, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P2': return { x: 95, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P3': return { x: 133, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P4': return { x: 168, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P5': return { x: 205, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P6': return { x: 241, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P7': return { x: 279, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P8': return { x: 314, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P9': return { x: 352, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P10': return { x: 388, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P11': return { x: 425, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P12': return { x: 461, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P13': return { x: 498, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P14': return { x: 533, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P15': return { x: 571, y: 102, rotation: 60 * Math.PI / 180 };
        case 'P16': return { x: 606, y: 102, rotation: 60 * Math.PI / 180 };
        //Q
        case 'Q1': return { x: 58, y: 325, rotation: -60 * Math.PI / 180 };
        case 'Q2': return { x: 95, y: 325, rotation: -60 * Math.PI / 180 }; // Q2
        case 'Q3': return { x: 132, y: 325, rotation: -60 * Math.PI / 180 }; // Q3
        case 'Q4': return { x: 168, y: 325, rotation: -60 * Math.PI / 180 }; // Q4
        case 'Q5': return { x: 205, y: 325, rotation: -60 * Math.PI / 180 }; // Q5
        case 'Q6': return { x: 241, y: 325, rotation: -60 * Math.PI / 180 }; // Q6
        case 'Q7': return { x: 279, y: 325, rotation: -60 * Math.PI / 180 }; // Q7
        case 'Q8': return { x: 314, y: 325, rotation: -60 * Math.PI / 180 }; // Q8
        case 'Q9': return { x: 352, y: 325, rotation: -60 * Math.PI / 180 }; // Q9
        case 'Q10': return { x: 387, y: 325, rotation: -60 * Math.PI / 180 }; // Q10
        case 'Q11': return { x: 425, y: 325, rotation: -60 * Math.PI / 180 }; // Q11
        case 'Q12': return { x: 459, y: 325, rotation: -60 * Math.PI / 180 }; // Q12
        case 'Q13': return { x: 498, y: 325, rotation: -60 * Math.PI / 180 }; // Q13
        case 'Q14': return { x: 534, y: 325, rotation: -60 * Math.PI / 180 }; // Q14
        case 'Q15': return { x: 572, y: 325, rotation: -60 * Math.PI / 180 }; // Q15
        case 'Q16': return { x: 609, y: 325, rotation: -60 * Math.PI / 180 }; // Q16
        //R
        case 'R1': return { x: -4, y: 107, rotation: 60 * Math.PI / 180 }; // R1
        case 'R2': return { x: 33, y: 107, rotation: 60 * Math.PI / 180 }; // R2
        case 'R3': return { x: 69, y: 107, rotation: 60 * Math.PI / 180 }; // R3
        case 'R4': return { x: 107, y: 107, rotation: 60 * Math.PI / 180 }; // R4
        case 'R5': return { x: 143, y: 107, rotation: 60 * Math.PI / 180 }; // R5
        case 'R6': return { x: 180, y: 107, rotation: 60 * Math.PI / 180 }; // R6
        case 'R7': return { x: 216, y: 107, rotation: 60 * Math.PI / 180 }; // R7
        case 'R8': return { x: 254, y: 107, rotation: 60 * Math.PI / 180 }; // R8
        case 'R9': return { x: 291, y: 107, rotation: 60 * Math.PI / 180 }; // R9
        case 'R10': return { x: 328, y: 107, rotation: 60 * Math.PI / 180 }; // R10
        case 'R11': return { x: 364, y: 107, rotation: 60 * Math.PI / 180 }; // R11
        case 'R12': return { x: 398, y: 107, rotation: 60 * Math.PI / 180 }; // R12
        case 'R13': return { x: 435, y: 107, rotation: 60 * Math.PI / 180 }; // R13
        case 'R14': return { x: 471, y: 107, rotation: 60 * Math.PI / 180 }; // R14
        case 'R15': return { x: 509, y: 107, rotation: 60 * Math.PI / 180 }; // R15
        case 'R16': return { x: 546, y: 107, rotation: 60 * Math.PI / 180 }; // R16
        //S
        case 'S1': return { x: -3, y: 333, rotation: -60 * Math.PI / 180 }; // S1
        case 'S2': return { x: 34, y: 333, rotation: -60 * Math.PI / 180 }; // S2
        case 'S3': return { x: 70, y: 333, rotation: -60 * Math.PI / 180 }; // S3
        case 'S4': return { x: 105, y: 333, rotation: -60 * Math.PI / 180 }; // S4
        case 'S5': return { x: 143, y: 333, rotation: -60 * Math.PI / 180 }; // S5
        case 'S6': return { x: 181, y: 333, rotation: -60 * Math.PI / 180 }; // S6
        case 'S7': return { x: 218, y: 333, rotation: -60 * Math.PI / 180 }; // S7
        case 'S8': return { x: 254, y: 333, rotation: -60 * Math.PI / 180 }; // S8
        case 'S9': return { x: 292, y: 333, rotation: -60 * Math.PI / 180 }; // S9
        case 'S10': return { x: 329, y: 333, rotation: -60 * Math.PI / 180 }; // S10
        case 'S11': return { x: 365, y: 333, rotation: -60 * Math.PI / 180 }; // S11
        case 'S12': return { x: 400, y: 333, rotation: -60 * Math.PI / 180 }; // S12
        case 'S13': return { x: 438, y: 333, rotation: -60 * Math.PI / 180 }; // S13
        case 'S14': return { x: 475, y: 333, rotation: -60 * Math.PI / 180 }; // S14
        case 'S15': return { x: 509, y: 333, rotation: -60 * Math.PI / 180 }; // S15
        case 'S16': return { x: 545, y: 333, rotation: -60 * Math.PI / 180 };

        default: return { x: 10, y: 10, rotation: 0 }; // Default coordinates for tag
    }
}

export function getMirrorStateForLabel(label, type) {
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
