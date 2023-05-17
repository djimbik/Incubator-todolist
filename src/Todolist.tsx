import React, {ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = { // это не объект, а тип данных, запятые ставить не надо
    // он предоставляет набор свойств с указанными типами
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (ms: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    addTask,
                                                    changeTaskStatus,
                                                    filter
                                                }) => {

    const tasksJSX: Array<JSX.Element> = tasks.map(item => {
        const onRemovehandler = () => {
            removeTask(item.id)
        }

        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(item.id, event.currentTarget.checked)
        }

        return <li key={item.id}
                   className={item.isDone ? 'is-done' : ''}>
            {/*// key нужен, чтобы реакт использовал предыдущий стейт и не рисовал заново*/}
            {/*// уже отрисованные части списка при добавлении новых */}
            <input type="checkbox" checked={item.isDone} onChange={onChangeHandler} />
            <span >{item.title}</span>
            <button onClick={onRemovehandler}>x</button>
        </li>
    }

    )

    const [newTaskTitle, setNewTaskTittle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskButtonHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        addTask(newTaskTitle)
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Если пользователь нажал Enter, добавляем задачу
        if (event.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    const onAllClickFilterHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskButtonHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickFilterHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}