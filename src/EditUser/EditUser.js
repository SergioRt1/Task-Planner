import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {sha256} from "js-sha256";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AxiosInstance} from "../AxiosInstance";

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", confirmPassword: "",errorMessage: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.confirmPassword === this.state.password) {
            this.updateUser();
        } else {
            this.setState({errorMessage: "The password and the confirmation do not make match"});
        }
    }

    updateUser() {
        const user = {
            "username": localStorage.getItem('username'),
            "password": sha256(this.state.password),
            "name": this.state.name,
            "email": this.state.email
        };
        AxiosInstance.getInstance().put("/user",user).then(() => {
            this.props.callback({"name": this.state.name, "email": this.state.email});
            this.props.close();
            this.clear();
        }).catch((error) => {
            console.log(error);
            alert(error);
            this.setState({errorMessage: "User with selected username already exists"});
        });
    }

    clear = () => {
        this.setState({name: "", email: "", password: "", confirmPassword: "",errorMessage: ""})
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Edit User</Typography>
                    <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth value={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField required label="Email" fullWidth value={this.state.email}
                                   onChange={event => this.setState({email: event.target.value})}/>
                        <TextField required label="Password" type="password" fullWidth value={this.state.password}
                                   onChange={event => this.setState({password: event.target.value})}/>
                        <TextField required label="Confirm password" type="password" fullWidth value={this.state.confirmPassword}
                                   onChange={event => this.setState({confirmPassword: event.target.value})}/>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Save
                        </Button>
                        <br/><br/>
                        <Button type="button" onClick={this.clear} color="primary" variant="contained" fullWidth>
                            Clear
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}

export default EditUser;
