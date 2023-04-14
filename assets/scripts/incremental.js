// Create variables for main button and number
var mainButton = document.getElementById('myButton');
var mainValue = document.getElementById('myNumber');

// Create variables for buy buttons
var tier1Buy = document.getElementById('tier_1_buy');
var tier2Buy = document.getElementById('tier_2_buy');
var tier3Buy = document.getElementById('tier_3_buy');
var tier4Buy = document.getElementById('tier_4_buy');
var tier5Buy = document.getElementById('tier_5_buy');
var tier6Buy = document.getElementById('tier_6_buy');
var tier7Buy = document.getElementById('tier_7_buy');
var tier8Buy = document.getElementById('tier_8_buy');
var tier9Buy = document.getElementById('tier_9_buy');

// Initialize starting numbers of auto-clickers
var clickers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Define function to update the main number
function increment(num) {
    let mainNumber = parseInt(mainValue.innerText, 10);
    mainValue.innerText = (mainNumber + num);
}

// Define function that buys a tier of autoclicker
function buy(tier) {
    // Increment owned
    let owned = document.getElementById('tier_'+tier+'_owned');
    owned.innerText = (parseInt(owned.innerText, 10) + 1);
    clickers[(tier - 1)] ++;

    // Decrease Main Number
    let cost = document.getElementById('tier_'+tier+'_cost');
    let currentVal = parseInt(mainValue.innerText, 10);
    mainValue.innerText = (currentVal - parseInt(cost.innerText, 10));

    // Increment cost
    cost.innerText = Math.trunc(parseInt(cost.innerText, 10) * 1.1);
}

// Add buy button events to buy 
mainButton.addEventListener("click", function() {increment(1)});
tier1Buy.addEventListener("click", function() {buy(1)});
tier2Buy.addEventListener("click", function() {buy(2)});
tier3Buy.addEventListener("click", function() {buy(3)});
tier4Buy.addEventListener("click", function() {buy(4)});
tier5Buy.addEventListener("click", function() {buy(5)});
tier6Buy.addEventListener("click", function() {buy(6)});
tier7Buy.addEventListener("click", function() {buy(7)});
tier8Buy.addEventListener("click", function() {buy(8)});
tier9Buy.addEventListener("click", function() {buy(9)});


// Create the loop that updates the main number
function updateNumber() {
    // Update main value
    let inc = 0
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 0; i < 9; i++) {
        inc += (clickers[i] * vals[i])
    }
    increment(inc)
}
setInterval(updateNumber, 1000);

// Create the loop to update clickability of buttons
function updateButtons() {
    // Ensure accuracy of buy buttons
    let mainNumber = parseInt(mainValue.innerText, 10);
    for (i=1; i < 10; i++) {
        // Get cost
        let cost_str = document.getElementById('tier_'+i+'_cost');
        let cost_val = parseInt(cost_str.innerText, 10);

        // Compare to number and take appropriate action
        let buy = document.getElementById('tier_'+i+'_buy')
        if (mainNumber >= cost_val) {
            buy.disabled = false
        } else {
            buy.disabled = true
        }
    }
}
setInterval(updateButtons, 100);