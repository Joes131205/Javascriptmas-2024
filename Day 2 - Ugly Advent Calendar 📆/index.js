const calendarContainer = document.getElementById("calendar");

const dayReward = JSON.parse(localStorage.getItem("dayReward")) || [
    { reward: "🍪", opened: false },
    { reward: "🍬", opened: false },
    { reward: "🍭", opened: false },
    { reward: "🍫", opened: false },
    { reward: "🍩", opened: false },
    { reward: "🍦", opened: false },
    { reward: "🍨", opened: false },
    { reward: "🍧", opened: false },
    { reward: "🎂", opened: false },
    { reward: "🍰", opened: false },
    { reward: "🧁", opened: false },
    { reward: "🥧", opened: false },
    { reward: "🍮", opened: false },
    { reward: "🍯", opened: false },
    { reward: "🍼", opened: false },
    { reward: "🥛", opened: false },
    { reward: "☕", opened: false },
    { reward: "🍵", opened: false },
    { reward: "🍶", opened: false },
    { reward: "🍾", opened: false },
    { reward: "🍷", opened: false },
    { reward: "🍸", opened: false },
    { reward: "🍹", opened: false },
    { reward: "🎉", opened: false },
];

for (let i = 1; i <= 24; i++) {
    let box = document.createElement("li");
    box.classList.add("calendar-box");
    let number = document.createElement("p");
    number.innerHTML = i;
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-gift");
    let description = document.createElement("p");
    description.innerHTML = dayReward[i - 1].opened
        ? dayReward[i - 1].reward
        : "Open me!";
    if (dayReward[i - 1].opened) {
        box.classList.add("opened");
    }
    box.appendChild(number);
    box.appendChild(icon);
    box.appendChild(description);
    calendarContainer.appendChild(box);

    box.addEventListener("click", () => {
        if (description.innerHTML === "Open me!") {
            description.innerHTML = dayReward[i - 1].reward;
            dayReward[i - 1].opened = true;
            box.classList.add("opened");

            localStorage.setItem("dayReward", JSON.stringify(dayReward));
        }
    });
}
