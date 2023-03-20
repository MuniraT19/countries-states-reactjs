let countries = [];
httpGet('https://xc-countries-api.fly.dev/api/countries/')
    .then(data => {
        countries = data;
        console.log(countries);
        let countrySelect = document.getElementById('countrySelect');
        let countrySelect2 = document.getElementById('countrySelect2');
        // remove previous options
        for (i = countrySelect.options.length - 1; i >= 0; i--) {
            countrySelect.remove(i);
        }
        for (i = 0; i < countries.length; i++) {
            // console.log(countries[i]);
            let opt = document.createElement('option');
            opt.value = countries[i].code;
            opt.text = countries[i].name;
            countrySelect.add(opt);
            
            let opt2 = document.createElement('option');
            opt2.value = countries[i].id;
            opt2.text = countries[i].name;
            countrySelect2.add(opt2);
        }
    })
    .catch(error => {
        console.log('Error getting countries:', error);
    });

function callStatesApi() {
    let countrySelect = document.getElementById('countrySelect');
    let selectedCountryCode = countrySelect.value;
    let apiURL =
        'https://xc-countries-api.fly.dev/api/countries/' +
        selectedCountryCode +
        '/states/';
    httpGet(apiURL)
        .then(states => {
            console.log(states);
            generateStatesSelector(states);
        })
        .catch(error => {
            console.log('Error getting states:', error);
        });
}

function generateStatesSelector(stateList) {
    let stateSelect = document.getElementById('stateSelect');
    // remove previous options
    for (i = stateSelect.options.length - 1; i >= 0; i--) {
        stateSelect.remove(i);
    }
    for (i = 0; i < stateList.length; i++) {
        // console.log(stateList[i]);
        let opt = document.createElement('option');
        opt.value = stateList[i].code;
        opt.text = stateList[i].name;
        stateSelect.add(opt);
    }
}

function sortByName(resObj) {
    // sorting the array by name
    resObj.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    return resObj;
}


function onSubmit(event) {
    
    var countryInput = document.getElementById("countryInput");
    var countryCodeInput = document.getElementById("countryCodeInput");

    var payload = {
        code: countryCodeInput.value,
        name: countryInput.value
    };
    var url = "https://xc-countries-api.fly.dev/api/countries/";
    console.log(payload);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}

function onSubmitState(event) {
    var stateInput = document.getElementById("stateInput");
    var stateCodeInput = document.getElementById("stateCodeInput");
    var countrySelect2 = document.getElementById("countrySelect2");

    var payload = {
        code: stateCodeInput.value,
        name: stateInput.value,
        countryId: countrySelect2.value
    };
    var url = "https://xc-countries-api.fly.dev/api/states/";
    console.log(payload);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}