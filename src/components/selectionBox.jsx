  
export const SelectionBox = (props) => {
    let {options, onChangeSelection, title, forAddingState} = props;

    function handleChange(event) {
        onChangeSelection(event);
    }
    return (
        <>
        <h2>Select {title} from the list:</h2>
        <select onChange={handleChange}>
            {options && options.map((option) => {
                if (forAddingState) {
                    return (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    );
                }
                else return (
                    <option key={option.id} value={option.code}>{option.name}</option>
                );
            })}
        </select>
        </>
    );
}

export default SelectionBox;