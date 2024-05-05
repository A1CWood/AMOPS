var fpinput = document.querySelector('.fpinput');
var batch = document.querySelector('.batch');
var submit = document.querySelector('.submit');
var outputdiv = document.querySelector('.output');

submit.addEventListener('click', generate);

function generate() {
    outputdiv.innerHTML = '';
    var input = fpinput.value;
    var outputq = batch.value;
    var split = input.split(" ");
    var tencount = split[0].substr(split[0].length - 2);
    var preten = split[0].substr(0, split[0].length - 2)
    var callcount = split[2].substr(split[2].length - 2);
    var precall = split[2].substr(0, split[2].length - 2);
    var iff = split[4];
    var output = [];
    var noZ = false;
    var isnan = isNaN(callcount);


    if (isnan) {
        callcount = split[2].substr(split[2].length - 1);
        precall = split[2].substr(0, split[2].length - 1);
        noZ = true;
    }

    for (var i = 0; i < outputq - 1; i++) {
        tencount++;
        if (tencount < 10) {
            tencount = '0' + tencount
        }
        callcount++;
        if (!noZ && callcount < 10) {
            callcount = '0' + callcount
        }
        if (String(iff).slice(-1) == 7) {
            iff = iff + 3
        }
        else {
            iff++
        }
        split[0] = preten + tencount;
        split[2] = precall + callcount;
        split[4] = iff
        output[i] = split.join(' ');
    }
    buildoutput(output);
}

function buildoutput(output) {
    fpinput.value = '';
    for (var i = 0; i < output.length; i++) {
        outputdiv.innerHTML += `<div class="opwrap" id="div${i}">
        <textarea rows="2" class="outputtext" id="opdiv${i}">${output[i]}</textarea>
        <p class="displayoutput">${output[i]}</p>
        <img src="./resources/copy-solid.svg" class="copyicon">
    </div>`;
    }
    opbox = document.querySelectorAll('.opwrap');
    opbox.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var copyTextarea = document.getElementById(`op${event.currentTarget.id}`);
            copyTextarea.focus();
            copyTextarea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        })
    })
}




