import React, {ChangeEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTittle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(event.currentTarget.value)
        setError(null)
    }

    const addTaskButtonHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        setNewTaskTittle('')
        props.addItem(newTaskTitle)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Если пользователь нажал Enter, добавляем задачу
        if (event.key === 'Enter') {
            addTaskButtonHandler()
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskButtonHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}