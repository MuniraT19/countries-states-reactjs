import './App.css';
import SelectionBox from './components/selectionBox';
import { useState, useEffect } from 'react';
import { httpGET, httpPOST } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    const postCountryURL = "https://xc-countries-api.fly.dev/api/countries/";
    const postStateURL = "https://xc-countries-api.fly.dev/api/states/";

    const [localState, setState] = useState({
        search: '',
        countries: [],
        states: [],
        selectedCountry: '',
        selectedState: '',
        newCountry: '',
        newCountryCode: '',
        newState: '',
        newStateCode: '',
        countryIdForNewState: ''
    });

    useEffect(() => {
        httpGET(postCountryURL)
            .then(data => {
                setState({
                    ...localState,
                    countries: data
                });
            }
            );
    }, []);

    function handleSubmitCountry() {
        const { newCountry, newCountryCode } = localState;
        const payload = {
            name: newCountry,
            code: newCountryCode
        };

        httpPOST(postCountryURL, payload)
            .then(data => {
                setState({
                    ...localState,
                    countries: [...localState.countries, data],
                    newCountry: '',
                    newCountryCode: ''
                });
            }
            );
    }

    function handleSubmitState() {
        const { newState, newStateCode, countryIdForNewState } = localState;
        const payload = {
            code: newStateCode,
            name: newState,
            countryId: countryIdForNewState
        };

        httpPOST(postStateURL, payload)
            .then(data => {
                setState({
                    ...localState,
                    States: [...localState.states, data],
                    newState: '',
                    newCountryCode: ''
                });
            }
            );
    }
    function handleCountryChange(value) {
        let apiURL = postCountryURL + value.target.value + '/states/';

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

    function handleCountryChangeForAddingState(value) {
        setState({
            ...localState,
            countryIdForNewState: value.target.value.toString()
        });
    }

    return (

        <>
            <div class="container" >
                <div class="col-sm-4">
                    <SelectionBox
                        title="Country"
                        options={localState.countries}
                        onChangeSelection={handleCountryChange}
                    />
                    <SelectionBox
                        title="State"
                        options={localState.states}
                    // onChangeSelection={handleCountryChange}
                    />
                </div>
                    <div class="row">
                        <div class="col-sm-4">

                            <h2 className=''>Add a new country</h2>
                            <div>
                                <label>Country Name: </label>
                                <input type={"text"} value={localState.newCountry} onChange={e => setState({ ...localState, newCountry: e.target.value })} />
                            </div>
                            <div>
                                <label>Country Code: </label>
                                <input type={"text"} value={localState.newCountryCode} onChange={e => setState({ ...localState, newCountryCode: e.target.value })} />
                            </div>
                            <button type='button' className='btn btn-success' onClick={handleSubmitCountry}>Add Country</button>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-sm-4">
                        <h2>Add a new state</h2>
                        <div>
                            <SelectionBox
                                title="Country"
                                options={localState.countries}
                                onChangeSelection={handleCountryChangeForAddingState}
                                forAddingState={true}
                            />
                            <label>State Name: </label>
                            <input type={"text"} value={localState.newState} onChange={e => setState({ ...localState, newState: e.target.value })} />
                            <label>State Code: </label>
                            <input type={"text"} value={localState.newStateCode} onChange={e => setState({ ...localState, newStateCode: e.target.value })} />
                            <div>
                                <button type='button' className='btn btn-success' onClick={handleSubmitState}>Add State</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default App;