import React, {Component} from 'react';
import './App.css';
import {Login} from './Login/Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PersistentDrawerLeft from "./Drawer/Drawer";
import NewTask from "./NewTask/NewTask";
import NewUser from "./NewUser/NewUser";
import TaskFilters from "./TaskFilters/TaskFilters";


class App extends Component {

    constructor(props) {
        super(props);
        const lastUsername = localStorage.getItem('lastUser');
        this.state = {
            tasks: tasksList,
            info: JSON.parse(localStorage.getItem(lastUsername)),
            page: localStorage.getItem('page')
        };
        this.formNewTask = this.formNewTask.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.getUsername = this.getUsername.bind(this)
    }

    getUsername(username) {
        const inf = JSON.parse(localStorage.getItem(username));
        this.setState({info: inf})
    }

    formNewTask(newTask) {
        this.setState((state) => ({
            tasks: [...state.tasks, newTask]
        }));
    }

    reloadPage() {
        this.setState({page: localStorage.getItem('page')})
    }

    render() {
        return (
            <div>
                {this.state.page === 'home' ?
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                   render={() => <PersistentDrawerLeft info={this.state.info}
                                                                       tasks={this.state.tasks}
                                                                       reloadPage={this.state.reloadPage}/>}/>
                            <Route exact path="/NewTask" render={() => <NewTask callback={this.formNewTask}/>}/>
                            <Route exact path="/TaskFilters" render={() => <TaskFilters/>}/>
                        </Switch>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={() => <Login callback={this.getUsername} reloadPage={this.reloadPage}/>}/>
                            <Route exact path="/NewUser" render={() => <NewUser/>}/>
                        </Switch>
                    </BrowserRouter>
                }
            </div>
        );
    }
}

export default App;

const tasksList = [
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
