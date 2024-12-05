/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/

let anagrams = [
    ["Can Assault", "Santa Claus"],
    ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
    ["Frosty The Snowman", "Honesty Warms Front"],
    ["Drastic Charms", "Christmas Cards"],
    ["Congress Liar", "Carol Singers"],
    ["The Tin Glints", "Silent Night"],
    ["Be The Helm", "Betlehem"],
    ["Is Car Thieves", "Christmas Eve"],
];

function findAnagrams(array) {
    // write your code here
    let first = array[0]
        .split(" ")
        .join("")
        .toLowerCase()
        .split("")
        .sort()
        .join("");
    let second = array[1]
        .split(" ")
        .join("")
        .toLowerCase()
        .split("")
        .sort()
        .join("");
    if (first === second) {
        return true;
    } else {
        return false;
    }
}

const actualAnagrams = anagrams.filter((anagram) => findAnagrams(anagram));
console.log(actualAnagrams);
