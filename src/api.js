function httpGet(theUrl) {
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

