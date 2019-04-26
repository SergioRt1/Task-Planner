import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import user from "../user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";

class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "",username: "", password: "", confirmPassword: "", doRedirect: false, errorMessage: "",loading:false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.confirmPassword === this.state.password) {
            this.createUser();
        } else {
            this.setState({errorMessage: "The password and the confirmation do not make match"});
        }
    }

    createUser() {
        const user = {
            "username": this.state.username,
            "password": this.state.password,
            "name": this.state.name,
            "email": this.state.email
        };
        this.setState({loading:true});
        axios.post("https://api-task-planner.herokuapp.com/register",user).then(() => {
            this.setState({name: "", email: "", password: "", confirmPassword: "",doRedirect: true,loading:false});
        }).catch((error) => {
            console.log(error);
            this.setState({errorMessage: "User with selected username already exists",loading:false});
        });
    }

    clear = () => {
        this.setState({name: "", email: "", username:"", password: "", confirmPassword: "",errorMessage: "",loading:false})
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Registration</Typography>
                    <img src={user} alt="user" className="img"/>
                    <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth value={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField required label="Email" fullWidth value={this.state.email}
                                   onChange={event => this.setState({email: event.target.value})}/>
                        <TextField required label="Username" fullWidth value={this.state.username}
                                   onChange={event => this.setState({username: event.target.value})}/>
                        <TextField required label="Password" type="password" fullWidth value={this.state.password}
                                   onChange={event => this.setState({password: event.target.value})}/>
                        <TextField required label="Confirm password" type="password" fullWidth value={this.state.confirmPassword}
                                   onChange={event => this.setState({confirmPassword: event.target.value})}/>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Create account
                        </Button>
                        <br/><br/>
                        <Button type="button" onClick={this.clear} color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                            Clear
                        </Button>
                        {this.state.doRedirect && <Redirect to={"/"}/>}
                    </form>
                    {this.state.loading && <CircularProgress style={{marginTop:"4%"}}/>}
                </Paper>
            </React.Fragment>
        );
    }
}

export default NewUser;
