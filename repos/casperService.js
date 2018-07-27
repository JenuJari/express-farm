var FS = require('fs');
const path = require('path');
var exec = require('child_process').exec;


module.exports = {
    test_one : () => {
        return new Promise((res,rej) => {
            
            var cmd = 'cd '+ __dirname + '/../casper/test && ' +
            ' casperjs' +
            ' scraper.js' +
            ' --web-security=no' +
            ' --ignore-ssl-errors=true' +
            ' --ssl-protocol=any';

            exec(cmd);

            let p = path.normalize(__dirname + '/../casper/test/output.json');
            
            const timeout = setInterval(() => {
                const fileExists = FS.existsSync(p);

                if (fileExists) {
                    clearInterval(timeout);
                    FS.readFile(p,(er, d)  => {
                        if(er) { rej(er); return; }
                        res(JSON.parse(d));
                    });
                }
            }, 1500);
        });
    },
    fiftyTwoLow : () => {
        return new Promise((res,rej) => {
            let folder_path = path.normalize(__dirname + '/../casper/52low');
            let outputfile = path.normalize(folder_path + '/output.json');
            
            if(FS.existsSync(outputfile)) {
                FS.unlink(outputfile);
            }
            
            var cmd = 'cd '+ folder_path + ' && ' +
            ' casperjs' +
            ' scraper.js' +
            ' --web-security=no' +
            ' --ignore-ssl-errors=true' +
            ' --ssl-protocol=any';

            exec(cmd);

            
            const timeout = setInterval(() => {
                if (FS.existsSync(outputfile)) {
                    clearInterval(timeout);
                    FS.readFile(outputfile,(er, d)  => {
                        if(er) { rej(er); return; }
                        res(JSON.parse(d));
                    });
                }
            }, 1500);
        });
    }
}
