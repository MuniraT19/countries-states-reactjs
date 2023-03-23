function httpGET(theUrl) {
    return fetch(theUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // adding an empty option to the beginning of the array using "unshift"
            data.unshift({ id: 0, code: "", name: "(None selected)" });
            data = sortByName(data);
            return data;
        })
        .catch(error => {
            console.log('Fetch error:', error);
            return [];
        });
}

function httpPOST(theUrl, payload) {
    return fetch(theUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('Fetch error:', error);
            return [];
        });
}

function sortByName(resObj) {
    // sorting the array by name
    resObj.sort(function (a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
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

export {httpGET, httpPOST};
