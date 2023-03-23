  
export const SelectionBox = (props) => {
    let {options, onChangeSelection, title} = props;

    function handleChange(event) {
        onChangeSelection(event);
    }
    return (
        <>
        <h2>Select {title}:</h2>
        <select onChange={handleChange}>
            {options && options.map((option) => {
                return (
                    <option key={option.id} value={option.code}>{option.name}</option>
                );
            })}
        </select>
        </>
    );
}

export default SelectionBox;