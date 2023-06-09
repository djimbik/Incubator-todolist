import React, {ChangeEvent, FC} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = { // это не объект, а тип данных, запятые ставить не надо
    // он предоставляет набор свойств с указанными типами
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (ms: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    changeFilter,
                                                    addTask,
                                                    changeTaskStatus,
                                                    filter,
                                                    id,
                                                    removeTodolist,
                                                    changeTaskTitle,
                                                    changeTodolistTitle
                                                }) => {

    const tasksJSX: Array<JSX.Element> = tasks.map(item => {
            const onRemovehandler = () => {
                removeTask(item.id, id)
            }

            const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(item.id, event.currentTarget.checked, id)
            }

            const onChangeTitleHandler = (newValue: string) => {
                changeTaskTitle(item.id, newValue, id);
            }

            return <li key={item.id}
                       className={item.isDone ? 'is-done' : ''}>
                {/*// key нужен, чтобы реакт использовал предыдущий стейт и не рисовал заново*/}
                {/*// уже отрисованные части списка при добавлении новых */}
                <input type="checkbox" checked={item.isDone} onChange={onChangeStatusHandler}/>
                <EditableSpan title={item.title} onChange={onChangeTitleHandler}/>
                <button onClick={onRemovehandler}>x</button>
            </li>
        }
    )

    const onAllClickFilterHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }

    const onChangeTodolistTitleHandler = (newTitle:string) => {
        changeTodolistTitle(newTitle, id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickFilterHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}






















