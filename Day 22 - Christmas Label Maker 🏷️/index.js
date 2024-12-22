import { addresses } from "./addresses.js";

const icons = [
    "bauble.png",
    "bow.png",
    "candy-cane.png",
    "deer.png",
    "gifts.png",
    "gingerbread-man.png",
    "santa-hat.png",
    "santa.png",
    "snowflake.png",
    "snowglobe.png",
    "snowman.png",
    "star-bauble.png",
    "star.png",
    "stocking.png",
    "tree.png",
    "trees.png",
    "wreath.png",
];

/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task ** 
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good! 

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/

const labelsContainer = document.querySelector(".labels-container");
let idx = 1;

addresses.forEach((address) => {
    if (address.isOnChristmasList) {
        const randomIcon1 = icons[Math.floor(Math.random() * icons.length)];
        const randomIcon2 = icons[Math.floor(Math.random() * icons.length)];
        const rotation1 = Math.floor(Math.random() * 90) - 45;
        const rotation2 = Math.floor(Math.random() * 90) - 45;
        const label = `
            <div class="label ${idx % 2 === 0 ? "second" : "first"}">
                <img src="./icons/${randomIcon1}" class="icon first" style="transform: rotate(${rotation1}deg);">
                <div class="address">
                    <p class="name">${address.name}</p>
                    <p>${address["address line 1"]}</p>
                    <p>${address.town}</p>
                    <p>${address.state}</p>
                    <p>${address.country}</p>
                </div>
                <img src="./icons/${randomIcon2}" class="icon second" style="transform: rotate(${rotation2}deg);">
            </div>`;
        labelsContainer.insertAdjacentHTML("beforeend", label);
        idx++;
    }
});
