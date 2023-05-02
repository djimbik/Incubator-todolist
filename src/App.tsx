import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const [tasks, setTasks] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "Redux", isDone: false}
        ]
    )

    const [filteredTasks, setFilteredTasks] = useState([...tasks])

    function removeTask(id:number) {
        const updatedTasks  = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks)
    }

    function filterTasks(isDone: boolean | null) {
        const updatedTasks = isDone === null ? tasks : tasks.filter(item => item.isDone === isDone)
        setFilteredTasks(updatedTasks)
    }

    return (
        <div className="App">
            <Todolist removeTask={removeTask} tasks={filteredTasks} title={'What to learn'} filterTasks = {filterTasks} />
        </div>
    );
}

export default App;
