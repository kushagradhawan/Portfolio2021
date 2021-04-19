/* this small function gives nearest next value to a [integer].
If the difference between output value and input value is <[integer]/2, 
it'll jump to the next nearest [integer] value  */

export default function nearestNextInteger(value, integer) {
    /* add sanity checks here */
    const tempVal = Math.ceil(value / integer) * integer;
    return tempVal - value < integer / 2 ? tempVal + integer : tempVal;
}

/* simple test case */
let testArray = [];
for (let i = 0; i < 100; i++) {
    let a = Math.floor(Math.random() * 100);
    // nearestNextInteger(a);
}
