var mainButton = document.getElementById('myButton');
var mainValue = document.getElementById('myNumber')

function increment() {
    let mainNumber = parseInt(mainValue.innerText, 10)
    mainValue.innerText = (mainNumber + 1)
}

mainButton.addEventListener("click", increment);