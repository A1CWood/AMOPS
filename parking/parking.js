function showChecklist(option) {
    document.getElementById('spd').innerHTML = '';
    switch (option) {
        case 'A':
            const spots = `
                <style>#A{background-color: #444;}</style>
                <div class="spot">
                    <label for="A1">A1</label>
                    <input type="checkbox" id="A1" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A2">A2</label>
                    <input type="checkbox" id="A2" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A3">A3</label>
                    <input type="checkbox" id="A3" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A4">A4</label>
                    <input type="checkbox" id="A4" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A5">A5</label>
                    <input type="checkbox" id="A5" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A6">A6</label>
                    <input type="checkbox" id="A6" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A7">A7</label>
                    <input type="checkbox" id="A7" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A8">A8</label>
                    <input type="checkbox" id="A8" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A9">A9</label>
                    <input type="checkbox" id="A9" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A10">A10</label>
                    <input type="checkbox" id="A10" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A11">A11</label>
                    <input type="checkbox" id="A11" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A12">A12</label>
                    <input type="checkbox" id="A12" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A13">A13</label>
                    <input type="checkbox" id="A13" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A14">A14</label>
                    <input type="checkbox" id="A14" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A15">A15</label>
                    <input type="checkbox" id="A15" class="spotcheck">
                </div>
                <div class="spot">
                    <label for="A16">A16</label>
                    <input type="checkbox" id="A16" class="spotcheck">
                </div>
                `;
            document.getElementById('spd').innerHTML = spots;
            break;
    }
}
