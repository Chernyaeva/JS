'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});

function addNewItemToBasket(basketHeader, itemName, itemPrice) {
    const myNewItem = `
            <div class="basketRow">
                            <div class="basketItemName">${itemName}</div>
                            <div class="basketItemCount">1</div>
                            <div class="basketItemPrice">$${itemPrice}</div>
                            <div class="basketItemSum">$${itemPrice}</div>
                        </div>`
    basketHeader.insertAdjacentHTML('afterend', myNewItem);
}

const myCart = document.querySelector(".cartIconWrap");
const myCartCount = myCart.querySelector('span');
myCartCount.textContent = 0;
const myItems = document.querySelector(".featuredItems");
const myBasket = document.querySelector(".basket");
const myBasketHeader = document.querySelector(".basketHeader");

myCart.addEventListener("click", event => {
    myBasket.classList.toggle("hidden");
})

myItems.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        ++myCartCount.textContent;
        const name = event.target.closest(".featuredItem").
            querySelector(".featuredName").textContent;
        const price = +(event.target.closest(".featuredItem").
            querySelector(".featuredPrice").textContent.trim().slice(1));
        console.log(event.target.closest(".featuredItem").
            querySelector(".featuredPrice").textContent.trim().slice(1));
        const basketItemsNames = myBasket.querySelectorAll(".basketItemName");
        if (basketItemsNames.length === 0) {
            addNewItemToBasket(myBasketHeader, name, price);
        } else {
            let itemFoundFlag = false;
            basketItemsNames.forEach((elem) => {
                if (elem.textContent === name) {
                    itemFoundFlag = true;
                    const itemCount = ++elem.parentElement.
                        querySelector(".basketItemCount").textContent;
                    elem.parentElement.
                        querySelector(".basketItemSum").textContent =
                        '$' + (itemCount * price);
                }
            })
            if (itemFoundFlag === false) {
                addNewItemToBasket(myBasketHeader, name, price);
            }

        }
        const basketItemsSums = myBasket.querySelectorAll(".basketItemSum");
        let myTotal = 0;
        basketItemsSums.forEach((el) => {
            myTotal += +el.textContent.trim().slice(1);
        })
        myBasket.querySelector(".basketTotalValue").textContent = myTotal;

    }
})