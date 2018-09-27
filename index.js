let URL = 'http://data.fixer.io/api/latest?access_key=';

let maindiv = document.querySelector(".apioutput");
let submitButton = document.querySelector('.submitButton');
let currenyLog = document.querySelector('.currencyList');
let valueLog = document.querySelector('.valueList');



submitButton.addEventListener("click", LogCunch);

function LogCunch() {
    if (currenyLog.value == "NULL" || valueLog.value == "NULL"){
        console.log('please make a valid selection');
    }else{
        fetch(URL + APIKEY)
        .then(function(response) {return response.json();})
        .then(function(myJson) {
            let exRate = myJson.rates[currenyLog.value] ;
            maindiv.textContent = exRate * valueLog.value;
           });
    }
}


       

       