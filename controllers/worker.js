const { parentPort } = require('worker_threads');

// Function to perform the CPU-intensive task
const performTask = () => {
    let counter = 0;
    for (let i = 0; i < 20000000000; i++) {
        counter++;
    }
    return counter;
};

// Perform the task and send the result back to the main thread
parentPort.postMessage(performTask());
