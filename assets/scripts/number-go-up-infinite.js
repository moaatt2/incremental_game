// Get important starting elements
var mainButton = document.getElementById('myButton');
var mainValue = document.getElementById('myNumber');
var tier1Buy = document.getElementById('tier_1_buy');

// Add events to starting elements
mainButton.addEventListener("click", function() {increment(1)});
tier1Buy.addEventListener("click", function() {buy(1)});


// Define function to update the main number
function increment(num) {
    let mainNumber = Number(mainValue.innerText);
    mainValue.innerText = (mainNumber + num).toFixed(1);
}


// Define function that buys a tier of autoclicker
function buy(tier) {
    // Increment owned
    let owned = document.getElementById(`tier_${tier}_owned`);
    owned.innerText = Number(owned.innerText) + 1;

    // Decrease Main Number
    let costBox = document.getElementById(`tier_${tier}_cost`)
    let cost = Number(costBox.innerHTML);
    increment(-cost);

    // Increment cost
    costBox.innerText = Math.trunc(cost * 1.1);
}


// Define a function that updates the number based on generator values every 1/10th of a second
function updateNumber(generators, factor) {
    // value accumulator
    let inc = 0;
    
    // Itterate over generators to determine value
    for (let i=1; i<= generators; i++) {
        let qty = Number(document.getElementById(`tier_${i}_owned`).innerHTML);
        inc += i*qty;
    }

    console.log(inc);

    // Multiply by factor to account for gameloop speed
    increment(inc*factor);
}


// Define a function to update button clickability
function updateButtons(generators) {
    // Get current number
    let val = Number(mainValue.innerText);

    // itterate over generator buttons
    for (let i=1; i<=generators; i++) {
        let cost = Number(document.getElementById(`tier_${i}_cost`).innerHTML);
        let buy = document.getElementById(`tier_${i}_buy`);

        if (cost > val) {
            buy.disabled = true;
        } else {
            buy.disabled = false;
        }
    }
}


// Add a new generator to the sheet
function addGenerator(generators) {
    let generatorTable = document.getElementById("generator-table");

    // Create, add and select new row
    let el = document.createElement('tr')
    el.setAttribute('id', `generator-${generators+1}`)
    generatorTable.appendChild(el);
    let newRow = document.getElementById(`generator-${generators+1}`)

    // Add records to new row
    newRow.innerHTML = `
        <td><p class="text" id="tier_${generators+1}_owned">0</p></td>
        <td><p class="text" id="tier_${generators+1}_cost">${10*(generators+1)}</p></td>
        <td><p class="text">${generators+1}</p></td>
        <td><button id="tier_${generators+1}_buy" disabled><p class="text">Buy</p></button></td>
    `

    // Add event listener to new buy button
    let newBuy = document.getElementById(`tier_${generators+1}_buy`)
    newBuy.addEventListener("click", function() {buy(generators+1)})

    // Update max-generator
    document.getElementById('max-generator').innerHTML = (generators+1);
}


// Create a function to run the gameloop
function gameloop() {

    // Get number of generators on screen
    let generators = Number(document.getElementById('max-generator').innerHTML);

    // Update the main value
    updateNumber(generators, .1);

    // Update buy button clickability
    updateButtons(generators);

    // Add new buttons
    let num_max_generators = Number(document.getElementById(`tier_${generators}_owned`).innerHTML)
    if (num_max_generators > Math.pow(generators+1, .5)) {
        addGenerator(generators);
    }
}


// Run the main gameloop every 100 seconds
setInterval(gameloop, 100);