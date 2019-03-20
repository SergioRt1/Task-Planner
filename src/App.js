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
        const lastUsername = localStorage.getItem('username');
        this.state = {
            tasks: JSON.parse(localStorage.getItem("tasks")),
            info: JSON.parse(localStorage.getItem(lastUsername)),
            page: localStorage.getItem('page')
        };
        this.reloadPage = this.reloadPage.bind(this);
    }

    componentDidMount() {
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
                        </Switch>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Login reloadPage={this.reloadPage}/>}/>
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
