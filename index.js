let URL = 'http://data.fixer.io/api/latest?access_key=';

//DOM elements
let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let buyerSubmitButton = document.querySelector('.buyerSubmitButton');
let buyerLocation = document.querySelector('.buyerLocation');
let buyerCurrencyList = document.querySelector('.buyerCurrencyList');
let currencyLog = document.querySelector('.currencyList');
let entryForm = document.querySelector('.entryform')
let logOutput = document.querySelector('.logOutput');
let newHOne = document.createElement('h1');
let newPTage = document.createAttribute('p');
let sellerCity = document.querySelector('.sellerLocation');

//dummy data 
let userinput = [[90, 3395, "THB", "Washington DC"], [150, 630, "ILS", "Boston"]];

//when a buyer search is submitted, after the "if" statement filters out invalid searches,
//the displayAvailableMoney function is called
buyerSubmitButton.addEventListener("click", function(event){
    event.preventDefault();
    if (buyerCurrencyList.value == "NULL" || buyerLocation.value == "NULL"){
        logOutput;
        let newDiv = document.createElement('div');
        newDiv.textContent = "Please make a valid selection";
        logOutput.appendChild(newDiv)
    }else{
    displayAvailableMoney();
    }
})

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