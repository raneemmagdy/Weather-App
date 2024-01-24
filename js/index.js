let searchInput = document.querySelector(".search-input");
let location1 = document.querySelector(".current-day .location");
let currentDay = document.querySelector(".current-day .day");
let currentDate = document.querySelector(".current-day .date");
let degreeDay1 = document.querySelector(".current-day .num");
let customDay1 = document.querySelector(".current-day .custom");
let icon1 = document.querySelector(".current-day .forecast-icon");

let nextDays = document.querySelectorAll(".nextDay");
let nextMaxTemp = document.querySelectorAll(".nextMaxTemp");
let nextMinTemp = document.querySelectorAll(".nextMinTemp");
let nextCustom = document.querySelectorAll(".nextCustom");
let nextIcon = document.querySelectorAll(".nextIcon");

async function api(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=40dba80d5e1e4fe888691019242401&q=${city}&days=3`);
        let data = await response.json();

        if (!data.error) {
            displayCurrent(data);
            displayAnotherDay(data);
        } 
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function displayCurrent(data) {
    let date = new Date();
    currentDay.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
    currentDate.innerHTML = date.getDate() + date.toLocaleDateString("en-US", { month: "long" });
    location1.innerHTML = data.location.name;
    degreeDay1.innerHTML = data.current.temp_c + "<sup>o</sup>C";
    icon1.innerHTML = `<img src="https:${data.current.condition.icon}" />`;
    customDay1.innerHTML = data.current.condition.text;
}

function displayAnotherDay(data) {
    let forcastData = data.forecast.forecastday;

    for (let i = 0; i < forcastData.length - 1; i++) {
        let date = new Date(forcastData[i + 1].date);
        nextDays[i].innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
        nextIcon[i].innerHTML = `<img src="https:${forcastData[i + 1].day.condition.icon}" />`;
        nextMaxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c + "<sup>o</sup>C";
        nextMinTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c + "<sup>o</sup>C";
        nextCustom[i].innerHTML = forcastData[i + 1].day.condition.text;
    }
}

searchInput.addEventListener("input", function () {
    api(this.value);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(currentposition);
} else {
    console.log("Geolocation not supported");
}

function currentposition(position) {
    api(position.coords.latitude + "," + position.coords.longitude);
}
