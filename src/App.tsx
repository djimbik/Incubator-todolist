import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

    let [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistId1, title: "What to learn", filter: 'all'},
            {id: todolistId2, title: "What to buy", filter: 'all'},
        ]
    )

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(item => item.id !== todolistId))

        delete tasksObj[todolistId]
    }

    function removeTask(id: string, todolistId: string) {
        setTasksObj(prevState => {
            let updatedTasks = prevState[todolistId].filter(item => item.id !== id)
            return {...prevState, [todolistId]: updatedTasks}
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

    function changeTaskTitle(id: string, newTitle:string, todolistId: string) {
        setTasksObj(prevState => {
            const updateList = prevState[todolistId].map(task => {
                if (task.id === id) {
                    return {...task, title: newTitle}
                }
                return task
            })
            return {...prevState, [todolistId]: updateList}
        })
    }

    function addTask(title: string, todolistId: string) {
        const task = {
            id: v1(),
            title,
            isDone: false
        }

        setTasksObj(prevState => {
            const newList = [...prevState[todolistId], task]
            return {...prevState, [todolistId]: newList}
        })
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(prevState => prevState.map(todolist => {
            return todolist.id === todolistId ? {...todolist, filter} : todolist
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

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasksObj({...tasksObj, [newTodolist.id] : []})
    }

    const changeTodolistTitle = (newtTitle: string, id: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newtTitle;
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={(title: string) => {addTodolist(title)}}/>

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
                                 removeTodolist={removeTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}/>
            })}
        </div>
    )
};

export default App;
