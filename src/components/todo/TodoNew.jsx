import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("eric")

    const { addNewToDo } = props;

    // addNewToDo()

    const handleOnClick = () => {
        addNewToDo(valueInput)
        setValueInput("")
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }

    return (
        <div className='todo-new'>
            <input type="text" placeholder='Enter your text'
                value={valueInput}
                onChange={(event) => { handleOnChange(event.target.value) }} />
            <button onClick={handleOnClick} >Add</button>
            <div>input = {valueInput}</div>
        </div>
    )
}

export default TodoNew;