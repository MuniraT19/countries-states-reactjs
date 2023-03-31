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
            <div className="container" >
                <div className="row centered-flex">
                    <div className="col-md-6">
                        <SelectionBox
                            title="Country"
                            options={localState.countries}
                            onChangeSelection={handleCountryChange}
                        />
                    </div>
                </div>
                <div className="row centered-flex">
                    <div className="col-md-6">
                        <SelectionBox
                            title="State"
                            options={localState.states}
                        />
                    </div>
                </div>
                <div className="row centered-flex margin-top-big">
                    <div className="col-sm-6 d-flex flex-column">

                        <h2 className=''>Add a new country</h2>
                        <div>
                            <input
                                className="form-control mt-2"
                                placeholder = "Enter Country Name"
                                type={"text"}
                                value={localState.newCountry}
                                onChange={e => setState({ ...localState, newCountry: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                className="form-control mt-2"
                                placeholder = "Enter Country Code"
                                type={"text"}
                                value={localState.newCountryCode}
                                onChange={e => setState({ ...localState, newCountryCode: e.target.value })}
                            />
                        </div>
                        <button type='button' className='btn btn-success mt-3 w-100' onClick={handleSubmitCountry}>Add Country</button>
                    </div>
                </div>
                <div className="row centered-flex margin-top-big">
                    <div className="col-sm-6">
                        <h2>Add a new state</h2>
                        <div className="d-flex flex-column">
                            <SelectionBox
                                title="Country"
                                options={localState.countries}
                                onChangeSelection={handleCountryChangeForAddingState}
                                forAddingState={true}
                            />
                            <input
                                className="form-control mt-2"
                                placeholder = "Enter State Name"
                                type={"text"}
                                value={localState.newState}
                                onChange={e => setState({ ...localState, newState: e.target.value })}
                            />
                            <input
                                className="form-control mt-2"
                                placeholder = "Enter State Code"
                                type={"text"}
                                value={localState.newStateCode}
                                onChange={e => setState({ ...localState, newStateCode: e.target.value })}
                            />
                            <div>
                                <button type='button' className='btn btn-success mt-3 w-100' onClick={handleSubmitState}>Add State</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default App;