"use strict";
// let timerId: number = setTimeout(() => { console.log("Sleeped 10s"), 10_000; });
// console.log("Timer ID:", timerId);
const wait = (ms) => new Promise((resolve, reject /* optional */) => {
    // Fatal error: runtime exception
    // throw new Error("runtime exception")
    setTimeout(resolve, ms);
});
const promise = wait(5000 /* ms */);
const failOnErr = (e) => { console.log("Fatal error:", e.message); };
promise.then(() => { console.log("Sleep 5s"); }).catch(failOnErr);
/////////////////////////////////////////////////
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
/////////////////////////////////////////////////
const wait0 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait0(0).then(() => console.log("d"));
Promise.resolve()
    .then(() => console.log("b"))
    .then(() => console.log("c"));
console.log("a"); // a, b, c, d
/////////////////////////////////////////////////
const promise_ = new Promise((resolve, reject) => {
    console.log("Promise callback");
    resolve(0);
}).then((result) => {
    console.log("Promise callback (.then)");
});
setTimeout(() => {
    // TODO Event loop: Promise (fulfilled) Promise { undefined }
    console.log("Event loop: Promise (fulfilled)", promise_);
}, 0);
console.log("Promise (pending)", promise_);
// Promise callback
// Promise (pending) Promise { <pending> }
// Promise callback (.then)
// Event loop: Promise (fulfilled) Promise { undefined }
