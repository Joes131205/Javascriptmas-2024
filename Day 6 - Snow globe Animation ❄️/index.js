const snowGlobe = document.querySelector(".snow-globe");
const snowGlobeBase = document.querySelector(".snow-globe-base");

const shakeButton = document.getElementById("shake-button");

let count = 0;

let isShaking = false;

let time = 1;

function createSnowflake() {
    if (!isShaking) {
        const snowFlake = document.createElement("p");
        snowFlake.classList.add("snowflake");

        if (count % 25 === 0) {
            snowFlake.textContent = "☃️";
        } else {
            snowFlake.textContent = "❄️";
        }

        snowFlake.style.left = Math.random() * 100 + "vw";
        snowFlake.style.fontSize = Math.random() * 10 + 30 + "px";
        const animationDuration = Math.random() * 3 + 2;

        const animations = ["fall1", "fall2", "fall3", "fall4"];
        const randomAnimation =
            animations[Math.floor(Math.random() * animations.length)];
        snowFlake.style.animation = `${randomAnimation} ${animationDuration}s linear infinite`;

        snowGlobe.appendChild(snowFlake);

        count++;

        setTimeout(() => {
            snowFlake.remove();
        }, animationDuration * 1000);
    }
}

setInterval(createSnowflake, time * 100);

shakeButton.addEventListener("click", () => {
    if (!isShaking) {
        snowGlobe.classList.add("shake");
        snowGlobeBase.classList.add("shake");
        isShaking = true;
    } else {
        snowGlobe.classList.remove("shake");
        snowGlobeBase.classList.remove("shake");
        isShaking = false;
    }
});
