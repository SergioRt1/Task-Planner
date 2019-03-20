import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import brain from './../brain.jpg';
import './Login.css';
import axios from "axios";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let login = false;
        axios.post("https://api-task-planner.herokuapp.com/user/login",
            {
                username: this.state.username,
                password: this.state.password
            }).then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem('page', "home");
                localStorage.setItem('username', this.state.username);
                this.props.reloadPage();
        }).catch(function (error) {
            console.log(error);
            alert("Wrong credentials");
            this.setState({username: "", password: ""});
        });
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
                        <Link to={"/NewUser"}>Create account</Link>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}