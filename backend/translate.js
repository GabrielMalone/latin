const { spawn } = require('child_process');

const translate = (word) => {
    // asynchronous task, so need to return a promise
    // if  no errors, resolve function will execute
    return new Promise((resolve, reject) => {
        // spawn is a module from express, child process. can run an executable with an argument. 
        const spawner = spawn('/app/words', [word]);
        // build up the output strings
        let result = '';
        let error = '';
        // Send "enter" when "MORE" prompt is detected
        const handleMorePrompt = (data) => {
            const output = data.toString();
            result += output;
            console.log('Received stdout data:', output);
            // Check if the output ends with the "MORE" prompt
            if (output.includes('MORE - hit RETURN/ENTER to continue')) {
                // Send the enter key press
                spawner.stdin.write('\n');
            }
        };
        // attach event listener to stdout child process. whenever data event detected, handmorePrompt function called. 
        spawner.stdout.on('data', handleMorePrompt);
        spawner.stderr.on('data', (data) => {
            error += data.toString();
        });
        // attach event listener to spawner. when finished executing, the promise is returned  with the result (the output from the stream)
        spawner.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = { translate };