/* this small function gives nearest previous value to a [integer] */

export default function nearestPreviousInteger(value, integer) {
    /* add sanity checks here */
    if (value % integer === 0) return;
    return Math.floor(value / integer) * integer;
}

/* simple test case */
let testArray = [];
for (let i = 0; i < 100; i++) {
    let a = Math.floor(Math.random() * 100);
    // nearestPreviousInteger(a, 16);
}

nearestPreviousInteger(304, 16);
