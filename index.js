let URL = 'http://data.fixer.io/api/latest?access_key=';

let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let currenyLog = document.querySelector('.currencyList');
let valueLog = document.querySelector('.valueList');



submitButton.addEventListener("click", LogCunch);

function LogCunch() {
    if (currenyLog.value == "NULL" || valueLog.value == "NULL"){
        maindiv.textContent = "Please make a valid selection"
    }else{
        fetch(URL + APIKEY)
        .then(function(response) {return response.json();})
        .then(function(myJson) {
            let exRate = myJson.rates[currenyLog.value];
            //this "if" statment rounds to nearest whole number for currencies that don't use units less than one,
            //and round to two decimal places if units between zero and one are used in practice.
            if (currenyLog.value == "VND" || 
            currenyLog.value == "HUF" || 
            currenyLog.value == "ILS" ||
            currenyLog.value == "THB"  ){
                maindiv.textContent = Math.round(exRate * valueLog.value);
            }else{
            maindiv.textContent = (exRate * valueLog.value).toFixed(2);
            }
           });
    }
}


       

       