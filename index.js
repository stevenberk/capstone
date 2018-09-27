let URL = 'http://data.fixer.io/api/latest?access_key=';

let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let currencyLog = document.querySelector('.currencyList');
let entryForm = document.querySelector('.entryform')


let userimput = [];

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  CalculateRate()
});

function CalculateRate() {
    if (currencyLog.value == "NULL" || entryForm.value < 1){
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
            pushToUserInput(parseFloat(entryForm.value), (Math.round(exRate * entryForm.value)), currencyLog.value, new Date());
            }else{
            maindiv.textContent = (exRate * entryForm.value).toFixed(2);
            pushToUserInput(parseFloat(entryForm.value), parseFloat((exRate * entryForm.value).toFixed(2)), currencyLog.value, new Date());
            }
            function pushToUserInput(startingRate, rate, currency, date){
                    userimput.push([startingRate, rate, currency, date]);
                    console.log(userimput);
            }
           });
    }
}


       

       