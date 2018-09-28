let URL = 'http://data.fixer.io/api/latest?access_key=';

let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let currencyLog = document.querySelector('.currencyList');
let entryForm = document.querySelector('.entryform')
let logOutput = document.querySelector('.logOutput');
let newLi = document.createElement('li');
let newHOne = document.createElement('h1');
let newPTage = document.createAttribute('p');
let sellerCity = document.querySelector('.sellerLocation');

//dumby data 
let userinput = [[90, 3395, "THB", "Washington DC"], [150, 630, "ILS", "Boston"]];

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  CalculateRate()
});

function CalculateRate() {
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
                console.log(userinput);
            }
           });
    }
}





       