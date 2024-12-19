import shoppingList from "./shoppingList.js";
/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted 
    by price, cheapest to most expensive. 
    
    Log the sorted array to the console to double-check you
    solved it correctly.
*/

let mode = 1; // 0 = original, 1 = cheapest, 2 = expensive

function sortProducts(list) {
    return [...list].sort((a, b) => a.price - b.price);
}

const listByCheapest = sortProducts(shoppingList);
const listByExpensive = sortProducts(shoppingList).reverse();

// Log the sorted list

for (let i = 0; i < listByCheapest.length; i++) {
    console.log(`${listByCheapest[i].product}: $${listByCheapest[i].price}`);
}

/**
 * Stretch goals:
 *
 * 1. Log the items to the console in a more formatted way,
 *    like this (one item per line):
 *
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 *
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */
const shoppingListElement = document.querySelector("#shopping-list");
const sortButton = document.querySelector("#sort-button");

document.addEventListener("DOMContentLoaded", () => {
    shoppingList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.product}: $${item.price}`;
        shoppingListElement.appendChild(listItem);
    });
});

sortButton.addEventListener("click", () => {
    let sortedList = [];
    if (mode === 0) {
        sortedList = shoppingList;
    } else if (mode === 1) {
        sortedList = listByCheapest;
    } else if (mode === 2) {
        sortedList = listByExpensive;
    }
    shoppingListElement.innerHTML = "";
    sortedList.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.product}: $${item.price}`;
        shoppingListElement.appendChild(listItem);
    });

    if (mode === 0) {
        sortButton.innerHTML = "Sort by price <br/>(cheapest first)";
        mode = 1;
    } else if (mode === 1) {
        sortButton.innerHTML = "Sort by price <br/>(expensive first)";
        mode = 2;
    } else if (mode === 2) {
        sortButton.innerHTML = "Sort by price <br/>(original)";
        mode = 0;
    }
});
