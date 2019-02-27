import React, {Component} from 'react';
import './App.css';
import {Login} from './Login/Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PersistentDrawerLeft from "./Drawer/Drawer";
import NewTask from "./NewTask/NewTask";
import UserProfile from "./UserProfile/UserProfile";
import TaskFilters from "./TaskFilters/TaskFilters";


class App extends Component {

    constructor(props) {
        super(props);
        localStorage.setItem('userDefault', "SergioRt");
        localStorage.setItem('passwordDefault', "12345");
    }

    render() {
        return (

            <div>
                {localStorage.getItem('page') === 'home' ?
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={() => <PersistentDrawerLeft info={inf} tasks={tasks}/>}/>
                            <Route exact path="/NewTask" render={() => <NewTask/>}/>
                            <Route exact path="/UserProfile" render={() => <UserProfile/>}/>
                            <Route exact path="/TaskFilters" render={() => <TaskFilters/>}/>
                        </Switch>
                    </BrowserRouter>
                    : <Login/>
                }
            </div>

        );
    }
}

export default App;

const inf = {
    "name": "Sergio Rodriguez",
    "email": "sergio200035@gmail.com"

};
const tasks = [
    {
        "description": "Implementation",
        "responsible": {
            "name": "Sergio Rodriguez",
            "email": "sergio200035@gmail"
        },
        "status": "Completed",
        "dueDate": 956464645646
    },
    {
        "description": "some description text ",
        "responsible": {
            "name": "Santiago Carrillo",
            "email": "sancarbar@gmail"
        },
        "status": "Ready",
        "dueDate": 156464648649
    },
    {
        "description": "Pass everything ",
        "responsible": {
            "name": "Sergio Rodriguez",
            "email": "sergio200035@gmail"
        },
        "status": "In Progress",
        "dueDate": 999999999999
    }
];
