import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import brain from './../brain.jpg';
import './Login.css';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        let login = false;
        for (const i in users) {
            if (users[i].username === this.state.username && users[i].password === this.state.password) {
                login = true;
            }
        }
        if (login) {
            localStorage.setItem('page', "home");
            localStorage.setItem('lastUser', this.state.username);
            this.props.callback(this.state.username);
            this.props.reloadPage();
        } else {
            alert("Wrong credentials");
            this.setState({username: "", password: ""});
        }
    }


    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className="layout">
                    <Paper elevation={5} className="paper">
                        <Typography variant="h4">
                            Task Planner
                        </Typography>
                        <img src={brain} alt="logo" className="img"/>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <TextField required label="Username" fullWidth
                                       onChange={event => this.setState({username: event.target.value})}/>
                            <TextField required label="Password" type="password" fullWidth
                                       onChange={event => this.setState({password: event.target.value})}/>
                            <br/><br/>
                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                Login
                            </Button>
                        </form>
                        <br/>
                        <Link to={"/NewUser"} >Create account</Link>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}