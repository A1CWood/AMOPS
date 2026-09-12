/* Versioned, data-only drafts. Never interpret imported values as markup or code. */
const SnowDrafts = (() => {
    const type = 'eielson-amops-snow';
    const fields = ['time', 'arrdep', 'squadron', 'priority', 'parking'];
    const units = ['18 FIS', '168 ARWG', '356 FS', '210 RQS', '355 FS', '3WG/JBER'];
    const text = value => typeof value === 'string' && value.length <= 20000;
    function validate(data, fieldCount) {
        const fail = () => { throw new Error('This is not a supported snow-priorities draft. Your current form has not been changed.'); };
        if (!data || data.type !== type || data.version !== 1) fail();
        if (!text(data.savedAt) || !Number.isFinite(Date.parse(data.savedAt))) fail();
        if (!Array.isArray(data.form) || data.form.length !== fieldCount || !data.form.every(text)) fail();
        if (!Array.isArray(data.windows) || data.windows.length !== 6 || !data.windows.every(text)) fail();
        if (!Array.isArray(data.flights) || data.flights.length > 500) fail();
        data.flights.forEach(row => {
            if (!row || !fields.every(key => text(row[key]))) fail();
            if (!['ARR', 'DEP'].includes(row.arrdep)) fail();
            if (row.windowUnit !== null && !units.includes(row.windowUnit)) fail();
            if (row.windowIndex !== null && (!Number.isInteger(row.windowIndex) || row.windowIndex < 0 || row.windowIndex > 999)) fail();
        });
        if (!Array.isArray(data.sharedParking) || data.sharedParking.length > 20) fail();
        if (!data.sharedParking.every(pair => Array.isArray(pair) && pair.length === 2 && pair.every(text))) fail();
        return data;
    }
    return { type, version: 1, validate };
})();
if (typeof module !== 'undefined') module.exports = SnowDrafts;
