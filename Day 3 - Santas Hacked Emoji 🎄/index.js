/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.


*/

const emojis = {
    angry: "🎁", // 😠
    thumbsdown: "👏", // 👎
    man_facepalming: "🎅", // 🤦‍♂️
    cry: "‍😄", // 😭
    puke: "🤩", // 🤮
    poop: "🎄", // 💩
    skull: "🎉", // 💀
    broken_heart: "🎁", // 💔
    thumbsup: "👍", // 👍
    heart: "❤️", // ❤️
    smile: "😊", // 😊
    laughing: "😂", // 😂
    wink: "😉", // 😉
    sunglasses: "😎", // 😎
    kiss: "😘", // 😘
    heart_eyes: "😍", // 😍
    fire: "🔥", // 🔥
    rocket: "🚀", // 🚀
    star: "⭐", // ⭐
    trophy: "🏆", // 🏆
    moneybag: "💰", // 💰
    beer: "🍺", // 🍺
    pizza: "🍕", // 🍕
    party: "🎉", // 🎉
    thumbsup: "👍", // 👍
    ok_hand: "👌", // 👌
    clapping: "👏", // 👏
    muscle: "💪", // 💪
    sparkles: "✨", // ✨
    tada: "🎉", // 🎉
    sparkler: "🎆", // 🎆
    christmas_tree: "🎄", // 🎄
    santa: "🎅", // 🎅
    snowman: "⛄", // ⛄
    snowflake: "❄️", // ❄️
    bell: "🔔", // 🔔
    gift: "🎁", // 🎁
    balloon: "🎈", // 🎈
    party_popper: "🎉", // 🎉
    confetti_ball: "🎊", // 🎊
    sparkler: "🎇", // 🎇
};

/* 1. Write a function that checks if a lowercase word starts and 
ends with a colon. If it does, check if it exists in the emojis object, 
and replace it with the corresponding emoji. If not, return the original word.


Example input: ":cry:"
Example output: ‍😄

*/
function emojifyWord(word) {
    let temp = word.toLowerCase();
    if (temp[0] === ":" && temp[temp.length - 1] === ":") {
        return emojis[temp.slice(1, temp.length - 1)];
    } else {
        return word;
    }
}

console.log(emojifyWord(":angry:"));

/* 2. Write a function to find any emoji shortcodes in a phrase.
Use your emojify function from the previous exercise!

Example input: "Just read your article :thumbsdown:"
Example output: "Just read your article 👏"
*/

function emojifyPhrase(phrase) {
    const split = phrase.split(" ");
    for (let i = 0; i < split.length; i++) {
        const word = split[i];
        split[i] = emojifyWord(word);
    }
    return split.join(" ");
}

console.log(emojifyPhrase("Those shoes :puke: :poop:"));
console.log(emojifyPhrase("Just read your article :thumbsdown:"));
console.log(emojifyPhrase("I'm :sunglasses: when you :smile:"));

// Stretch goal: don't just replace the shortcodes, but also
// any emojis are added directly to the text.
