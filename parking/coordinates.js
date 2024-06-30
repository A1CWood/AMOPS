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
        // Q
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
        // R
        case 'R1': return { x: 42, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R2': return { x: 79, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R3': return { x: 115, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R4': return { x: 153, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R5': return { x: 189, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R6': return { x: 226, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R7': return { x: 262, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R8': return { x: 300, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R9': return { x: 337, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R10': return { x: 374, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R11': return { x: 410, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R12': return { x: 446, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R13': return { x: 483, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R14': return { x: 519, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R15': return { x: 557, y: 98, rotation: 150 * Math.PI / 180 };
        case 'R16': return { x: 594, y: 98, rotation: 150 * Math.PI / 180 };
        // S
        case 'S1': return { x: 43, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S2': return { x: 80, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S3': return { x: 116, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S4': return { x: 151, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S5': return { x: 190 - 1, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S6': return { x: 228 - 1, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S7': return { x: 265 - 1, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S8': return { x: 301 - 1, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S9': return { x: 339 - 2, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S10': return { x: 376 - 2, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S11': return { x: 412 - 2, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S12': return { x: 448 - 2, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S13': return { x: 484 - 3, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S14': return { x: 521 - 3, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S15': return { x: 558 - 3, y: 214, rotation: 30 * Math.PI / 180 };
        case 'S16': return { x: 594 - 3, y: 214, rotation: 30 * Math.PI / 180 };
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
        case 'P1': return { x: 50, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P2': return { x: 85, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P3': return { x: 123, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P4': return { x: 158, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P5': return { x: 195, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P6': return { x: 231, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P7': return { x: 269, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P8': return { x: 304, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P9': return { x: 342, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P10': return { x: 378, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P11': return { x: 415, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P12': return { x: 451, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P13': return { x: 488, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P14': return { x: 523, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P15': return { x: 561, y: 85, rotation: 55 * Math.PI / 180 };
        case 'P16': return { x: 596, y: 85, rotation: 55 * Math.PI / 180 };
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
