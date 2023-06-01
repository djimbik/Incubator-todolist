import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Fruits", isDone: true},
            {id: v1(), title: "vegs", isDone: true},
            {id: v1(), title: "vitamins", isDone: false},
            {id: v1(), title: "fish", isDone: false}
        ]
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: "What to learn", filter: 'active'},
            {id: todolistId2, title: "What to buy", filter: 'completed'},
        ]
    )

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(item => item.id !== todolistId))

        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        setTasksObj(prevState => {
            let updatedList = prevState[todolistId].filter(item => item.id !== id)
            return {...prevState, [todolistId]: updatedList}
        })
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        setTasksObj(prevState => {
            const updatedList = prevState[todolistId].map(task => {
                if (task.id === id) {
                    return {...task, isDone}
                }
                return task
            })
            return {...prevState, [todolistId]: updatedList}
        })
    }

    function addTask(title: string, todolistId: string) {
        const task = {
            id: v1(),
            title,
            isDone: false
        }

        setTasksObj(prevState => {
            const updateList = [...prevState[todolistId], task]
            return {...prevState, [todolistId]: updateList}
        })
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(prevState => prevState.map(todolist => {
            if (todolist.id === todolistId) {
                return {...todolist, filter}
            }
            return todolist
        }))
    };
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let updatedTasks = tasks
        if (filter === 'active') {
            updatedTasks = tasks.filter(item => !item.isDone)
        }
        if (filter === 'completed') {
            updatedTasks = tasks.filter(item => item.isDone)
        }

        return updatedTasks
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                const filteredTasks: Array<TaskType> = getFilteredTasks(tasksObj[todolist.id], todolist.filter)

                return <Todolist title={todolist.title}
                                 key={todolist.id}
                                 removeTask={removeTask}
                                 tasks={filteredTasks}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todolist.filter}
                                 id={todolist.id}
                                 removeTodolist={removeTodolist}/>
            })}
        </div>
    )
};

export default App;
