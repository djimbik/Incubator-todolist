import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const title: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    function removeTask(id: string) {
        const updatedTasks = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
    }

    function addTask(ms:string) {
        setTasks((prevState) => [...tasks, {id: v1(), title: ms, isDone: false}])
        console.log('проверка')
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let updatedTasks = tasks;
        if (filter === 'active') {
            updatedTasks = tasks.filter(item => !item.isDone)
        }
        if (filter === 'completed') {
            updatedTasks = tasks.filter(item => item.isDone)
        }

        return updatedTasks
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist
                removeTask={removeTask}
                tasks={filteredTasks}
                title={title}
                changeFilter={changeFilter}
                addTask = {addTask}
                />
        </div>
    );
}

export default App;
