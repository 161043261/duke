const promise = new Promise((resolve, reject) => {
    console.log("Promise callback");
    resolve();
}).then((result) => {
    console.log("Promise callback (.then)");
});
setTimeout(() => {
    console.log("Event loop: Promise (fulfilled)", promise);
}, 0);
console.log("Promise (pending)", promise);
// Promise callback
// Promise (pending) Promise { <pending> }
// Promise callback (.then)
// event-loop cycle: Promise (fulfilled) Promise { undefined }
