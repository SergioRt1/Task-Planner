import React, {Component} from 'react';
import './App.css';
import {Login} from './Login/Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PersistentDrawerLeft from "./Drawer/Drawer";
import NewTask from "./NewTask/NewTask";
import NewUser from "./NewUser/NewUser";


class App extends Component {

    constructor(props) {
        super(props);
        const lastUsername = localStorage.getItem('lastUser');
        this.state = {
            tasks: [],
            users: [],
            info: JSON.parse(localStorage.getItem(lastUsername)),
            page: localStorage.getItem('page')
        };
        // this.URL = "http://localhost:8080";
        this.URL = "https://api-task-planner.herokuapp.com";
        this.reloadPage = this.reloadPage.bind(this);
        this.getUsername = this.getUsername.bind(this)
    }

    componentDidMount() {

        fetch(this.URL + '/tasks')
            .then(response => response.json())
            .then(data => {
                let tasks = [];
                data.forEach(function (task) {
                    tasks.push(task)
                });
                localStorage.setItem('tasks',JSON.stringify(tasks));
                this.setState({tasks: tasks});
            });
        fetch(this.URL + '/users')
            .then(response => response.json())
            .then(data => {
                let users = [];
                data.forEach(function (user) {
                    users.push(user)
                });
                localStorage.setItem('users',JSON.stringify(users));
                this.setState({users: users});
            });
    }

    getUsername(username) {
        fetch(this.URL + '/users/' + username)
            .then(response => response.json())
            .then(inf => {
                localStorage.setItem(username,JSON.stringify(inf));
                this.setState({info: inf})
            });
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
                        </Switch>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Login callback={this.getUsername} reloadPage={this.reloadPage}
                                                        users={this.state.users}/>}/>
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
