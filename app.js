const checkbox = document.querySelector("#check");
const billing = document.querySelector("#m-y");
const slider = document.querySelector(".slider");
const views = document.querySelector("#views");
const price = document.querySelector("#price")


// PAGES VIEWS 

slider.addEventListener("input", () => {

    views.innerHTML = slider.value + "K PAGEVIEWS";
})


// TOGGLE BUTTON MONTH / YEAR 

function toggle() {
    if (checkbox.checked) {
        billing.innerHTML = " / year";
        return true
    } else {
        billing.innerHTML = " / month"
        return false
    }
}

checkbox.addEventListener("change", toggle)


// SLIDER PRICE WITH JSON 

slider.addEventListener("input", () => {
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if ((json[i].views === slider.value) && (toggle() === true)) {
                    price.innerHTML = "$" + json[i].yearly + ".00";
                } else {
                    if ((json[i].views === slider.value) && (toggle() === false)) {
                        price.innerHTML = "$" + json[i].monthly + ".00"
                    }
                }
            }
            // 
        })
})


// PRICE CHANGE WITH TOGGLE MONTH YEAR 

checkbox.addEventListener("click", () => {
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if ((checkbox.checked) && (json[i].views === slider.value)) {
                    price.innerHTML = "$" + json[i].yearly + ".00";
                } else if ((checkbox.checked === false) && (json[i].views === slider.value)) {
                    price.innerHTML = "$" + json[i].monthly + ".00"
                }
            }
        })
})
 

// DISCOUNT PRICE MEDIA QUERIES 

function redimensionnement() {
    const discount = document.querySelector("#discount");
    if ("matchMedia" in window) {
        if (window.matchMedia("(max-width: 500px)").matches) {
            discount.innerHTML = "-25%";
        } else {
            discount.innerHTML = "25% discount";
        }
    }
}

window.addEventListener('resize', redimensionnement, false)