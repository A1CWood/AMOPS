const assert = require('node:assert/strict');
const drafts = require('./snow-drafts');
const fixture = {
    type: drafts.type, version: drafts.version, savedAt: '2026-09-12T10:00:00.000Z',
    form: ['12 Sep 26', 'Line one\nLine two', '<script>literal text</script>', 'NONE'],
    windows: ['0630-0800', '', '', '', '', 'NONE'],
    flights: [
        {time:'0630',arrdep:'DEP',squadron:'18 FIS',priority:'4c',parking:'FD: 1L, 1R',windowUnit:'18 FIS',windowIndex:0},
        {time:'0700',arrdep:'ARR',squadron:'Transient',priority:'7',parking:'TR: 11',windowUnit:null,windowIndex:null}
    ],
    sharedParking: [['18 FIS','FD: 1L, 1R']]
};
assert.deepEqual(drafts.validate(JSON.parse(JSON.stringify(fixture)),4),fixture);
for (const modify of [d=>d.version=2,d=>d.type='other',d=>d.form.pop(),d=>d.windows.pop(),d=>d.savedAt='bad',d=>d.flights[0].arrdep='other',d=>d.flights[0].windowUnit='other',d=>d.flights[0].windowIndex=-1,d=>d.sharedParking=[['bad']],d=>d.form[0]={},d=>d.flights=Array(501).fill(fixture.flights[0])]) {
    const bad=structuredClone(fixture);modify(bad);
    assert.throws(()=>drafts.validate(bad,4),/not a supported/);
}
for (const bad of [null,[],{},'text']) assert.throws(()=>drafts.validate(bad,4));
console.log('Draft validation and JSON round-trip passed, including multiline text, manual and generated flights, and invalid schemas.');
