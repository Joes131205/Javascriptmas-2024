import { toysRequested } from "./data.js";

/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year. 

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/

function solution1() {
    const obj = {};

    [...toysRequested].forEach((data) => {
        data.toys.forEach((toy) => {
            const key = Object.keys(toy)[0];
            if (obj[key]) {
                obj[key] += toy[key];
            } else {
                obj[key] = toy[key];
            }
        });
    });

    const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    return sorted;
}

function solution2() {
    const flatten = [...toysRequested]
        .flatMap((data) => data.toys)
        .reduce((acc, toy) => {
            const key = Object.keys(toy)[0];
            acc[key] = (acc[key] || 0) + toy[key];
            return acc;
        }, {});

    const sorted = Object.entries(flatten).sort((a, b) => b[1] - a[1]);
    return sorted;
}

const solution1Result = solution1();
const solution2Result = solution2();

console.log(
    `The most popular toy is ${solution1Result[0][0]} with ${solution1Result[0][1]} requests.`
);

console.log(
    `The most popular toy is ${solution2Result[0][0]} with ${solution2Result[0][1]} requests.`
);
