/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

const feedAvatars = document.querySelector(".feed-avatars");

import { feedData } from "./data.js";

let time = 1.5;
let indexX = 0;
let indexY = 0;
function init() {
    feedData.forEach((feed) => {
        const avatar = document.createElement("img");
        avatar.src = feed.avatarUrl;
        avatar.classList.add("avatar");

        feedAvatars.insertAdjacentElement("beforeend", avatar);
    });

    const avatars = document.querySelectorAll(".avatar");
    avatars[indexX].classList.toggle("highlight");
    function displayFeed() {
        if (indexY === feedData[indexX].features.length) {
            avatars[indexX].classList.toggle("highlight");
            avatars[indexX++].classList.toggle("greyed-out");

            if (indexX < avatars.length) {
                avatars[indexX].classList.toggle("highlight");
            } else {
                const feedImages = document.querySelector(".feed-images");
                feedImages.innerHTML = "";
                const p = document.createElement("p");
                p.textContent = "Refresh to load latest images";
                feedImages.insertAdjacentElement("beforeend", p);
                return;
            }
            indexY = 0;
        }
        const feed = feedData[indexX];
        const feedImages = document.querySelector(".feed-images");
        feedImages.innerHTML = "";
        const feedImage = feed.features[indexY];
        indexY++;

        const image = document.createElement("img");
        image.classList.add("feature-image");
        image.src = feedImage.imageUrl;
        image.alt = feedImage.alt;
        feedImages.innerHTML = "";

        feedImages.insertAdjacentElement("beforeend", image);

        setTimeout(displayFeed, time * 1000);
    }

    displayFeed();
}

init();
