let URL = 'http://data.fixer.io/api/latest?access_key=';

//DOM elements
let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let buyerSubmitButton = document.querySelector('.buyerSubmitButton');
let buyerLocation = document.querySelector('.buyerLocation');
let buyerCurrencyList = document.querySelector('.buyerCurrencyList');
let currencyLog = document.querySelector('.currencyList');
let entryForm = document.querySelector('.entryform');
let logOutput = document.querySelector('.logOutput');
let newHOne = document.createElement('h1');
let newPTage = document.createAttribute('p');
let sellerCity = document.querySelector('.sellerLocation');
let newDiv = document.querySelector('.newDiv');
//
let loginPage = document.querySelector('.loginPage');
let loginButton = document.querySelector('.loginButton');
let buyOrSellPage = document.querySelector('.buyOrSellPage');
let buyButton = document.querySelector('.buyButton');
let sellButton = document.querySelector('.sellButton');
let Seller = document.querySelector('.Seller');
let Buyer = document.querySelector('.Buyer');

//dummy data 
let userinput = [[90, 3395, "THB", "Washington DC"], [150, 630, "ILS", "Boston"]];

//login page -> page with buy or sell buttons
loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    loginPage.classList.add('hide');
    buyOrSellPage.classList.remove('hide');
})
//buy button shows page where buyer can search for available currencies
buyButton.addEventListener("click", function(event) {
    event.preventDefault();
    buyOrSellPage.classList.add('hide');
    Buyer.classList.remove('hide');
})
//sell button shows page where sell can post
sellButton.addEventListener("click", function(event) {
    event.preventDefault();
    buyOrSellPage.classList.add('hide');
    Seller.classList.remove('hide');
})


//when a buyer clicks search, the "if" statement filters out invalid searches,
//then displayAvailableMoney function is called, Additionally, if there are existing outputs from the previous buyer searches,
//then a function is called to removed the child elements in the output div (removes existing searches)
buyerSubmitButton.addEventListener("click", function(event){
    event.preventDefault();
    if (logOutput.childNodes.length >= 0){
        removeChild();
    }
    if (buyerCurrencyList.value == "NULL" || buyerLocation.value == "NULL"){
        logOutput;
        let newDiv = document.createElement('div');
        newDiv.textContent = "Please make a valid selection";
        logOutput.appendChild(newDiv)
    }else{
        displayAvailableMoney();
    }
})

//this function is called if the number of childnodes in the output div is greater than zero, it clears existing searches in the DOM
let removeChild = () => {
    logOutput.removeChild(logOutput.childNodes[0]);
}

//when called, this function filters the userinput array and returns a new array with 
//items that only have the items that meet the buyer's currency and location criteria
//this new array is then passed through a for loop that renders it's content to the DOM
//if there are no available matches, an "if" statement renders "Nothing available right now" to the DOM
let displayAvailableMoney = () =>{
  let filteredArray = userinput.filter(userinput =>(buyerCurrencyList.value == userinput[2] && buyerLocation.value == userinput[3]));
    if (filteredArray.length < 1){
        logOutput;
        let newDiv = document.createElement('div');
        newDiv.textContent = "Nothing available right now";
        logOutput.appendChild(newDiv);
    }else{
        for(i = 0; i < filteredArray.length; i++){
            logOutput;
            let newDiv = document.createElement('div');
            newDiv.textContent = `Amount: ${filteredArray[i][0]} 
            Rate at Submission: ${filteredArray[i][1]} 
            Currency: ${filteredArray[i][2]} 
            Location: ${filteredArray[i][3]}`;
            logOutput.appendChild(newDiv);
        }
    }
}
// When a seller clicks the subit button, the CalculateRate function is called
submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  calculateRate()
})

//This function first filters out invalid seller submissions, then it makes an API request and 
//returns the exchange value. Then is pushes all of the seller's criteria to the userinput array
function calculateRate() {
    if (currencyLog.value == "NULL" || entryForm.value < 1 || sellerCity.value == "NULL"){
        maindiv.textContent = "Please make a valid selection"
    }else{
        fetch(URL + APIKEY)
        .then(function(response) {return response.json();})
        .then(function(myJson) {
            let exRate = myJson.rates[currencyLog.value];
            //this "if" statment rounds to nearest whole number for currencies that don't use units less than one,
            //and round to two decimal places if units between zero and one are used in practice.
            if (currencyLog.value == "VND" || 
                currencyLog.value == "HUF" || 
                currencyLog.value == "ILS" ||
                currencyLog.value == "JPY" ||
                currencyLog.value == "THB" ||
                currencyLog.value == "MMK"){
                    maindiv.textContent = Math.round(exRate * entryForm.value);
                        pushToUserInput(parseFloat(entryForm.value), 
                            (Math.round(exRate * entryForm.value)), 
                            currencyLog.value, 
                            sellerCity.value, 
                            // new Date()
                        );
            }else{
                maindiv.textContent = (exRate * entryForm.value).toFixed(2);
                    pushToUserInput(parseFloat(entryForm.value), 
                        parseFloat((exRate * entryForm.value).toFixed(2)), 
                        currencyLog.value, 
                        sellerCity.value, 
                        // new Date()
                    );
            }
            function pushToUserInput(startingRate, rateAtSubmission, currency, location){
                userinput.push([startingRate, rateAtSubmission, currency, location]);
            }
           });
    }
}
