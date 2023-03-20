  
export const SelectionBox = (props) => {
    console.log(props);
    let {countries, count, onClick} = props;
    return (
        <>
        <h2>Select Country:</h2>
        <button onClick={onClick}>Clicked {count} times</button>
        <select>
            {countries && countries.map((option) => {
                return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                );
            })}
        </select>
        </>
    );
}

export default SelectionBox;