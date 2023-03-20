import './App.css';
import SelectionBox from './components/selectionBox';
import { useState, useEffect} from 'react';

function App() {

  const [localState, setState] = useState({
    search: '',
    countries: [],
    states: [],
    selectedCountry: '',
    selectedState: '',
    count: 0
  });

  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => {
        setState({
          ...localState,
          countries: data
        }); 
      });
  }, []);

  function handleClick() {
    setState({...localState, count: localState.count + 1});
  }

  return (
    <div>
      <h1>Select a country from the list </h1>
      {/* <Profile /> */}
      <SelectionBox countries={localState.countries} count={localState.count} onClick={handleClick} />
    </div>
  );
}

export default App;