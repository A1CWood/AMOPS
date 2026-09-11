// The printed priority key is the source for these pairings.
const priorityMap = { '355 FS': '4a', '356 FS': '4b', '18 FIS': '4c', '210 RQS': '5', '168 ARWG': '6', Transient: '7' };
const aliases = { '355': '355 FS', '355TH': '355 FS', '356': '356 FS', '356TH': '356 FS', '18': '18 FIS', '18TH': '18 FIS', '168': '168 ARWG', '168TH': '168 ARWG', '210': '210 RQS', '210TH': '210 RQS', '210 RESCUE SQ': '210 RQS', TRANSIENTS: 'Transient' };
const range = (prefix, start, end) => Array.from({ length: end - start + 1 }, (_, i) => `${prefix}${i + start}`);
const sharedSpots = [...range('C', 1, 12), ...range('F', 1, 4), ...range('LM', 1, 4)];
const parkingOptions = {
    '355 FS': [...range('WS', 17, 32), ...sharedSpots],
    '356 FS': [...range('WS', 1, 16), ...sharedSpots],
    '18 FIS': Array.from({ length: 12 }, (_, i) => [`FD${i + 1}L`, `FD${i + 1}R`]).flat(),
    '168 ARWG': [7, 8, ...Array.from({ length: 12 }, (_, i) => i + 11)].map(n => `TR${n}`),
    '210 RQS': ['ND1', 'ND2']
};

function parseTime(value) {
    const text = value.trim().toUpperCase().replace(/L$/, '').trim();
    const match = text.match(/^(\d{1,2}):(\d{2})$/) || text.match(/^(\d{1,2})(\d{2})$/);
    if (!match) return null;
    const hours = Number(match[1]), minutes = Number(match[2]);
    if (hours === 24 && minutes === 0) return 1440;
    return hours < 24 && minutes < 60 ? hours * 60 + minutes : null;
}

// Accept both compact groups and the older WS1, WS2 notation.
function parseParking(text) {
    const spots = [];
    let prefix = '';
    for (const token of text.split(/[,;&]/).map(part => part.trim()).filter(Boolean)) {
        const group = token.match(/^(WS|C|FD|TR|LM|F|ND)\s*:\s*(.*)$/i);
        let value = token;
        if (group) { prefix = group[1].toUpperCase(); value = group[2].trim(); }
        const full = value.match(/^(WS|C|FD|TR|LM|F|ND)\s*(\d+[LR]?)$/i);
        if (full) { prefix = full[1].toUpperCase(); spots.push(prefix + full[2].toUpperCase()); }
        else if (/^\d+[LR]?$/i.test(value) && prefix) spots.push(prefix + value.toUpperCase());
        else { if (value) spots.push(value); prefix = ''; }
    }
    return [...new Set(spots)];
}

function formatParking(spots) {
    const groups = new Map(), other = [];
    for (const spot of spots) {
        const match = spot.match(/^(WS|C|FD|TR|LM|F|ND)(\d+[LR]?)$/i);
        if (!match) { other.push(spot); continue; }
        const prefix = match[1].toUpperCase();
        if (!groups.has(prefix)) groups.set(prefix, new Set());
        groups.get(prefix).add(match[2].toUpperCase());
    }
    return [...groups].map(([prefix, values]) => `${prefix}: ${[...values].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join(', ')}`).concat(other).join(' & ');
}

function formatDateTime(date) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    return `${String(date.getDate()).padStart(2, '0')} ${month} ${String(date.getFullYear()).slice(-2)} ${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}L`;
}

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('#dynamicTable tbody');
    const status = document.getElementById('snow-status');
    const fields = ['time', 'arrdep', 'squadron', 'priority', 'parking'];
    let nextId = 0;
    const get = (row, field) => row.querySelector(`[data-field="${field}"]`);
    const rows = () => [...body.querySelectorAll('.mission-row')];
    const hasData = row => fields.some(field => field !== 'arrdep' && get(row, field).value.trim()) || get(row, 'arrdep').value === 'DEP';
    const sharedParking = new Map();
    const canonicalSquadron = value => Object.keys(priorityMap).find(unit => unit.toUpperCase() === value.trim().toUpperCase()) || aliases[value.trim().toUpperCase()];

    function makeList(id, values) {
        const list = document.createElement('datalist');
        list.id = id;
        values.forEach(value => { const option = document.createElement('option'); option.value = value; list.append(option); });
        document.body.append(list);
    }
    makeList('snow-squadrons', Object.keys(priorityMap));
    makeList('snow-priorities', ['1', '2', '3', ...Object.values(priorityMap)]);

    function syncParking(row) {
        const input = get(row, 'parking');
        if (row.dataset.parkingDirty !== 'true') return;
        input.value = formatParking(parseParking(input.value));
        delete row.dataset.parkingDirty;
        const unit = canonicalSquadron(get(row, 'squadron').value);
        if (!unit || !/^4[abc]$/.test(get(row, 'priority').value.trim().toLowerCase())) return;
        sharedParking.set(unit, input.value);
        rows().filter(other => canonicalSquadron(get(other, 'squadron').value) === unit).forEach(other => {
            get(other, 'parking').value = input.value;
            delete other.dataset.parkingDirty;
        });
    }
    function closeParking() {
        body.querySelectorAll('.parking-picker').forEach(picker => {
            const owner = rows().find(row => row.dataset.id === picker.dataset.owner);
            if (owner) syncParking(owner);
            picker.remove();
        });
    }

    function addRow() {
        const row = body.insertRow();
        row.className = 'mission-row';
        row.dataset.id = String(nextId++);
        row.insertCell().className = 'mission-index';
        fields.forEach((field, index) => {
            const cell = row.insertCell();
            const input = document.createElement(field === 'arrdep' ? 'button' : 'input');
            if (field === 'arrdep') {
                input.type = 'button'; input.value = 'ARR'; input.textContent = 'ARR';
                input.addEventListener('click', () => { input.value = input.value === 'ARR' ? 'DEP' : 'ARR'; input.textContent = input.value; ensureBlank(); });
            } else input.type = 'text';
            input.dataset.field = field;
            input.setAttribute('aria-label', ['Time (local)', 'Arrival or departure', 'Squadron', 'Priority', 'Parking spots'][index]);
            input.autocomplete = 'off';
            if (field === 'squadron') input.setAttribute('list', 'snow-squadrons');
            if (field === 'priority') input.setAttribute('list', 'snow-priorities');
            if (field === 'time') input.title = 'Local time: HHMM or HH:MM (0000–2400)';
            cell.append(input);
        });
        const actions = document.createElement('span');
        actions.className = 'row-actions';
        const parking = document.createElement('button');
        parking.type = 'button'; parking.textContent = 'Spots'; parking.title = 'Choose parking spots';
        parking.addEventListener('click', () => {
            const wasOpen = row.nextElementSibling?.classList.contains('parking-picker');
            closeParking();
            if (wasOpen) return;
            const options = parkingOptions[canonicalSquadron(get(row, 'squadron').value)];
            if (!options) { status.textContent = 'Enter parking spots directly for this squadron.'; get(row, 'parking').focus(); return; }
            const picker = document.createElement('tr'); picker.className = 'parking-picker'; picker.dataset.owner = row.dataset.id;
            const cell = picker.insertCell(); cell.colSpan = 6;
            options.forEach(spot => {
                const button = document.createElement('button'); button.type = 'button'; button.textContent = spot;
                const selected = () => parseParking(get(row, 'parking').value);
                button.setAttribute('aria-pressed', String(selected().includes(spot)));
                button.addEventListener('click', () => {
                    const values = selected();
                    get(row, 'parking').value = formatParking(values.includes(spot) ? values.filter(value => value !== spot) : [...values, spot]);
                    button.setAttribute('aria-pressed', String(selected().includes(spot)));
                    row.dataset.parkingDirty = 'true';
                    ensureBlank();
                });
                cell.append(button);
            });
            row.after(picker);
        });
        const remove = document.createElement('button');
        remove.type = 'button'; remove.textContent = 'X'; remove.setAttribute('aria-label', 'Remove flight');
        remove.addEventListener('click', () => { closeParking(); row.remove(); ensureBlank(); });
        actions.append(parking, remove); get(row, 'parking').closest('td').append(actions);
        return row;
    }

    function ensureBlank() {
        if (!rows().some(row => !hasData(row))) addRow();
        while (rows().length < 5) addRow();
        renumberRows();
    }
    function compareRows(a, b) {
        const aTime = hasData(a) ? (parseTime(get(a, 'time').value) ?? Infinity) : Infinity;
        const bTime = hasData(b) ? (parseTime(get(b, 'time').value) ?? Infinity) : Infinity;
        return aTime - bTime || Number(hasData(b)) - Number(hasData(a)) || Number(a.dataset.id) - Number(b.dataset.id);
    }
    function renumberRows() {
        let index = 0;
        rows().sort(compareRows).forEach(row => {
            row.querySelector('.mission-index').textContent = hasData(row) ? String(++index) : '';
        });
    }
    function sortRows() {
        closeParking();
        rows().sort(compareRows).forEach(row => body.append(row));
        const blanks = rows().filter(row => !hasData(row));
        while (blanks.length > 1 && rows().length > 5) blanks.pop().remove();
        ensureBlank();
    }
    function validateTime(input) {
        const invalid = input.value.trim() !== '' && parseTime(input.value) === null;
        input.setCustomValidity(invalid ? 'Enter a local time such as 0630 or 06:30 (0000–2400).' : '');
        input.setAttribute('aria-invalid', String(invalid));
    }
    body.addEventListener('input', event => {
        const input = event.target;
        const row = input.closest('.mission-row');
        if (!row || !input.dataset.field) return;
        if (input.dataset.field === 'squadron') {
            const unit = canonicalSquadron(input.value);
            if (unit) get(row, 'priority').value = priorityMap[unit];
        }
        if (input.dataset.field === 'priority') {
            const priority = input.value.trim().toLowerCase().replace(/^([abc])$/, '4$1');
            const unit = Object.keys(priorityMap).find(key => priorityMap[key] === priority);
            if (unit) get(row, 'squadron').value = unit;
        }
        if (input.dataset.field === 'time') validateTime(input);
        if (input.dataset.field === 'parking') row.dataset.parkingDirty = 'true';
        ensureBlank();
    });
    body.addEventListener('change', () => ensureBlank());
    body.addEventListener('focusout', event => {
        const row = event.target.closest('.mission-row') || rows().find(item => item.dataset.id === event.target.closest('.parking-picker')?.dataset.owner);
        if (!row) return;
        const destination = event.relatedTarget;
        if (destination?.closest('.parking-picker')?.dataset.owner !== row.dataset.id &&
            !(row.contains(destination) && destination?.closest('.row-actions'))) syncParking(row);
        if (event.target.dataset.field === 'time') {
            const minutes = parseTime(event.target.value);
            if (minutes !== null) event.target.value = `${String(Math.floor(minutes / 60)).padStart(2, '0')}${String(minutes % 60).padStart(2, '0')}`;
        }
        if (event.target.dataset.field === 'squadron') event.target.value = canonicalSquadron(event.target.value) || event.target.value;
        if (event.target.dataset.field === 'priority') event.target.value = event.target.value.trim().toLowerCase().replace(/^([abc])$/, '4$1');
        // Wait until the next control receives focus; do not move a row during entry.
        setTimeout(() => {
            const focused = document.activeElement;
            if (focused.closest('.parking-picker')?.dataset.owner === row.dataset.id) return;
            if (focused !== get(row, 'parking') && !(row.contains(focused) && focused.closest('.row-actions'))) syncParking(row);
            if (!row.contains(focused) && !focused.closest('.parking-picker') && !focused.closest('.mission-row')) sortRows();
            else if (focused.closest('.mission-row') !== row && !focused.closest('.parking-picker')) {
                // Moving existing nodes preserves values, but browsers can drop focus.
                sortRows();
                if (focused.isConnected) focused.focus({ preventScroll: true });
            }
        }, 0);
    });

    const windowUnits = ['18 FIS', '168 ARWG', '356 FS', '210 RQS', '355 FS', '3WG/JBER'];
    const windowInputs = [...document.querySelectorAll('#local input')];
    const hhmm = minutes => `${String(Math.floor(minutes / 60)).padStart(2, '0')}${String(minutes % 60).padStart(2, '0')}`;
    function syncWindows(input) {
        if (input.dataset.lastWindows === input.value.trim() && input.checkValidity()) return;
        const unit = input.dataset.unit;
        const text = input.value.trim().toUpperCase();
        if (text === 'NONE') input.value = text;
        const windows = [];
        for (const part of text && text !== 'NONE' ? text.split(/[,;]/) : []) {
            const pair = part.trim().split(/\s*[-–—]\s*/);
            const start = pair.length === 2 ? parseTime(pair[0]) : null;
            const end = pair.length === 2 ? parseTime(pair[1]) : null;
            if (start === null || end === null || start >= end) {
                input.setCustomValidity('Enter NONE or same-day windows such as 0830-1000, 1200-1330, with departure before arrival.');
                input.setAttribute('aria-invalid', 'true');
                status.textContent = `${unit}: enter NONE or windows like 0830-1000, 1200-1330. Existing flights are kept until the entry is valid.`;
                return;
            }
            windows.push([start, end]);
        }
        input.setCustomValidity(''); input.setAttribute('aria-invalid', 'false');
        const existing = rows().filter(row => row.dataset.windowUnit === unit);
        const used = new Set();
        windows.flatMap(([start, end]) => [[start, 'DEP'], [end, 'ARR']]).forEach(([time, movement], index) => {
            // Match unchanged times first, then reuse a row from the edited window.
            let row = existing.find(candidate => !used.has(candidate) && get(candidate, 'time').value === hhmm(time) && get(candidate, 'arrdep').value === movement);
            row ||= existing.find(candidate => !used.has(candidate) && candidate.dataset.windowIndex === String(index));
            row ||= addRow();
            used.add(row); row.dataset.windowUnit = unit; row.dataset.windowIndex = String(index);
            get(row, 'time').value = hhmm(time);
            get(row, 'arrdep').value = movement; get(row, 'arrdep').textContent = movement;
            get(row, 'squadron').value = unit; get(row, 'priority').value = priorityMap[unit] || '';
            if (sharedParking.has(unit)) get(row, 'parking').value = sharedParking.get(unit);
        });
        existing.filter(row => !used.has(row)).forEach(row => row.remove());
        input.dataset.lastWindows = text;
        status.textContent = unit === '3WG/JBER' && windows.length ? '3WG/JBER flights added. Assign their priorities manually; this unit is not in the priority key.' : '';
        sortRows();
    }
    windowInputs.forEach((input, index) => {
        input.dataset.unit = windowUnits[index]; input.dataset.lastWindows = '';
        input.setAttribute('aria-label', `${windowUnits[index]} flying windows`);
        input.title = 'Enter NONE for no flying, or local departure-arrival windows, e.g. 0830-1000, 1200-1330';
        input.addEventListener('blur', () => syncWindows(input));
    });

    const weatherAdvisories = document.getElementById('weatherAdvisories');
    function resizeWeatherAdvisories() {
        weatherAdvisories.style.height = 'auto';
        weatherAdvisories.style.height = `${Math.max(60, weatherAdvisories.scrollHeight)}px`;
    }
    weatherAdvisories.addEventListener('input', resizeWeatherAdvisories);
    window.addEventListener('resize', resizeWeatherAdvisories);
    resizeWeatherAdvisories();

    function preparePrint() {
        windowInputs.forEach(syncWindows);
        rows().forEach(syncParking);
        sortRows();
        document.querySelectorAll('.print-value').forEach(value => value.remove());
        rows().forEach(row => row.classList.toggle('empty-mission', !hasData(row)));
        document.querySelectorAll('#pdfholder input, #pdfholder textarea, #pdfholder [data-field="arrdep"]').forEach(input => {
            const value = document.createElement('span');
            value.className = 'print-value'; value.textContent = input.value || '\u00a0';
            input.after(value);
        });
    }
    window.addEventListener('beforeprint', preparePrint);
    window.addEventListener('afterprint', () => document.querySelectorAll('.print-value').forEach(value => value.remove()));
    document.getElementById('generatePDF').addEventListener('click', () => {
        windowInputs.forEach(syncWindows);
        const badWindow = windowInputs.find(input => !input.checkValidity());
        if (badWindow) { badWindow.reportValidity(); return; }
        const invalid = rows().find(row => hasData(row) && parseTime(get(row, 'time').value) === null);
        if (invalid) {
            status.textContent = 'Add a valid local time to each flight before exporting.';
            const input = get(invalid, 'time'); input.focus();
            input.setCustomValidity('Enter a local time such as 0630 or 06:30.'); input.reportValidity();
            return;
        }
        status.textContent = '';
        preparePrint();
        window.print();
    });
    const now = formatDateTime(new Date());
    document.getElementById('CAOvar').value = now;
    document.getElementById('SRPvar').value = now.slice(0, -6);
    ensureBlank();
});
