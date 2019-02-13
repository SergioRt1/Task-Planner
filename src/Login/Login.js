import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import userimage from './../logo.svg';

export class Login extends React.Component{
     constructor(props) {
            super(props);
            this.state={username:"", password: ""};
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if(localStorage.getItem('emailDefault') === this.state.email && localStorage.getItem('passwordDefault') === this.state.password)
            localStorage.setItem('isLoggedIn', "true");
        this.setState({email:"", password: ""});
    }

    render(){
        return (
            <React.Fragment>
                <h2>Task Planner</h2>
                <img src={userimage} className="App-logo" alt="logo" />

                <TextField required label="Username" margin="normal"/>
                <TextField required label="Password" margin="normal"/>
                <Button type="submit" color="primary"/>
            </React.Fragment>
        );
    }
}