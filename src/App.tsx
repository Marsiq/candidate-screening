import './App.css';
import Header from "./components/Header";
import data from "./data.json";
import {useState} from "react";

interface IDataObject {
    "id": number,
    "task":string,
    "complete":boolean
}

function App() {

    const [toDoList, setToDoList] = useState<Array<IDataObject>>(data);

    return (
        <div className="App">
            <Header/>
            {toDoList.map(element => <p>{element.task}</p>)}
        </div>
    );
}

export default App;