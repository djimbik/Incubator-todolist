import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "Redux", isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id:number) {
        const updatedTasks  = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
    }

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(item => item.isDone === false)
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(item => item.isDone === true)
    }

    function changeFilter(filter: FilterValuesType) {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist removeTask={removeTask} tasks={filteredTasks} title={'What to learn'} changeFilter = {changeFilter}/>
        </div>
    );
}

export default App;
