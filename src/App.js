import './App.css';
import SelectionBox from './components/selectionBox';
import {useState, useEffect} from 'react';
import {httpGET,httpPOST} from "./api";

function App() {
    const postCountryURL = "https://xc-countries-api.fly.dev/api/countries/";

    const [localState, setState] = useState({
        search: '',
        countries: [],
        states: [],
        selectedCountry: '',
        selectedState: '',
        count: 0,
        newCountry: '',
        newCountryCode: '',
        newState: '',
        newStateCode: ''
    });

    useEffect(() => {
        httpGET('https://xc-countries-api.fly.dev/api/countries/')
            .then(data => {
                    setState({
                        ...localState,
                        countries: data
                    });
                }
            );
    }, []);

    function handleSubmitCountry() {
        const {newCountry, newCountryCode} = localState;
        const payload = {
            name: newCountry,
            code: newCountryCode
        };

        httpPOST(postCountryURL, payload)
            .then(data => {
                console.log(data);
                setState({
                    ...localState,
                    countries: [...localState.countries, data],
                    newCountry: '',
                    newCountryCode: ''
                });
            }
        );
    }
    function handleCountryChange(value) {
        let apiURL = 'https://xc-countries-api.fly.dev/api/countries/' + value.target.value + '/states/';
        // setState({...localState, count: localState.count + 1});
        httpGET(apiURL)
            .then(states => {
                    setState({
                        ...localState,
                        selectedCountry: value.target.value,
                        states: states
                    });
                }
            );
    }

    console.log("after Change:", localState);

    return (
        <div>
            <div>
                <h1>Select a country from the list </h1>
                <SelectionBox
                    title="Country"
                    options={localState.countries}
                    count={localState.count}
                    onChangeSelection={handleCountryChange}
                />
                <SelectionBox
                    title="State"
                    options={localState.states}
                    count={localState.count}
                    onChangeSelection={handleCountryChange}
                />
            </div>

            <div>
                <h2>Add a new country</h2>
                <div>
                    <label>Country Name: </label>
                    <input type={"text"} value={localState.newCountry} onChange={e => setState({...localState, newCountry: e.target.value})}/>
                </div>
                <div>
                    <label>Country Code: </label>
                    <input type={"text"} value={localState.newCountryCode} onChange={e => setState({...localState, newCountryCode: e.target.value})}/>
                </div>
                <button onClick={handleSubmitCountry}>Add Country</button>
            </div>
        </div>
    );
}

export default App;