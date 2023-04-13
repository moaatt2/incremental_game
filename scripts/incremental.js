var mainButton = document.getElementById('myButton');
var mainValue = document.getElementById('myNumber');

var tier1Buy = document.getElementById('tier_1_buy');
var tier2Buy = document.getElementById('tier_2_buy');

var clickers = [0, 0];

function increment(num) {
    let mainNumber = parseInt(mainValue.innerText, 10);
    mainValue.innerText = (mainNumber + num);
}

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

function updateNumber() {
    // Update main value
    let inc = 0
    let vals = [1, 2]
    for (let i = 0; i < 2; i++) {
        inc += (clickers[i] * vals[i])
    }
    increment(inc)
}

function updateButtons() {
    // Ensure accuracy of buy buttons
    let mainNumber = parseInt(mainValue.innerText, 10);
    for (i=1; i < 3; i++) {
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

// Add button events
mainButton.addEventListener("click", function() {increment(1)});
tier1Buy.addEventListener("click", function() {buy(1)});
tier2Buy.addEventListener("click", function() {buy(2)})

// Add core loops
setInterval(updateNumber, 1000)
setInterval(updateButtons, 100)