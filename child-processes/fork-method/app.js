const fs = require('fs');
const child_process = require('child_process');

for (var i = 0; i < 3; i++) {
    var worker_progress = child_process.fork("support.js", [i]);

    worker_progress.on('close', (code) => {
        console.log('child process exited with code ' + code);
    });
}