import { codedMessage } from "./codedMessage.js";

/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

let output = "";

codedMessage.forEach((message) => {
    let ascii = parseInt(message, 2) - 10;
    ascii = ascii < 32 ? (ascii += 96) : ascii;
    output += String.fromCharCode(ascii);
});

console.log(output);
