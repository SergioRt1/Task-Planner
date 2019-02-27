import {Component} from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import user from "../user.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {description: "", responsible: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if(this.state.confirmPassword === this.state.password){

            this.setState({name: "", email: "", password: "", confirmPassword: ""});
        }else alert("The password and the confirmation do not make match")
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h2">Registration</Typography>
                    <img src={user} alt="user" className="img"/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Full name" fullWidth
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField required label="Email" fullWidth
                                   onChange={event => this.setState({email: event.target.value})}/>
                        <TextField required label="Password" type="password" fullWidth
                                   onChange={event => this.setState({password: event.target.value})}/>
                        <TextField required label="Confirm password" type="password" fullWidth
                                   onChange={event => this.setState({confirmPassword: event.target.value})}/>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="raised" fullWidth>
                            Save
                        </Button>
                    </form>
                </Paper>
            </>
        );
    }
}

export default UserProfile;
