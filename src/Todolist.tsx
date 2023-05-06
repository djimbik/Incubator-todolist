import React, {ChangeEvent, FC, KeyboardEventHandler, useState} from "react";
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
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    addTask,
                                                }) => {

    const tasksJSX: Array<JSX.Element> = tasks.map(item => {
    const onRemovehandler = () => {
        removeTask(item.id)
    }
        return <li key={item.id}>
            {/*// key нужен, чтобы реакт использовал предыдущий стейт и не рисовал заново*/}
            {/*// уже отрисованные части списка при добавлении новых */}
            <input type="checkbox" checked={item.isDone} readOnly/>
            <span>{item.title}</span>
            <button onClick={onRemovehandler}>x</button>
        </li>
    }

    )

    const [newTaskTitle, setNewTaskTittle] = useState('')
    const addTaskButtonHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTittle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTittle(event.currentTarget.value)
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
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskButtonHandler}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onAllClickFilterHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}