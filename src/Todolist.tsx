import React, {useState} from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = { // это не объект, а тип данных, запятые ставить не надо
    // он предоставляет набор свойств с указанными типами
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number)=>void
    filterTasks: (isDone: boolean | null) => void
}

export function Todolist(props: TodolistPropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(item =>
                    <li key={item.id}>
                        <input type="checkbox" checked={item.isDone}/>
                        <span>{item.title} </span>
                        <button onClick={() => props.removeTask(item.id)}>x</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => props.filterTasks(null)}>All</button>
                <button onClick={() => props.filterTasks(true)}>Active</button>
                <button onClick={() => props.filterTasks(false)}>Completed</button>
            </div>
        </div>
    )
}