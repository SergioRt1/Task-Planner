import React, {Component} from 'react';
import './App.css';
import {Login} from './Login/Login';
import PersistentDrawerLeft from "./Drawer/Drawer";

class App extends Component {

    constructor (props){
        super(props);
        localStorage.setItem('userDefault',"SergioRt");
        localStorage.setItem('passwordDefault',"12345");
    }

    render() {
        const inf = {
            "name":"Sergio Rodriguez",
            "email":"sergio200035@gmail.com"
        }
        return (
            <div>
                {localStorage.getItem('page') === 'home' ?
                    <PersistentDrawerLeft info={inf}/> :
                    <Login/>
                }
            </div>
        );
    }
}


export default App;
