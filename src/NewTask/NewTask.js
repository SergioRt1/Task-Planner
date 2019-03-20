import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab"
import CheckCircle from '@material-ui/icons/CheckCircle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from "@material-ui/core/FormLabel";
import 'date-fns';
import axios from "axios";

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {description: "", name: "", email: "", status: "", dueDate: new Date()};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tokenAxios = axios.create({
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("accessToken")},
            baseURL: "https://api-task-planner.herokuapp.com/api"
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const data = {
            "description": this.state.description,
            "responsible": {
                "name": this.state.name,
                "email": this.state.email
            },
            "state": this.state.status,
            "dueDate": this.state.dueDate.getTime(),
            "owner": localStorage.getItem('username')
        };
        this.tokenAxios.post("/tasks",data);
        this.props.callback(data);
        this.setState({description: "", name: "", email: "", status: "", dueDate: new Date()});

    }

    render() {

        return (
            <Paper elevation={5} className="paper">
                <Typography variant="h4">New Task</Typography>
                <br/>
                <form className="form" onSubmit={this.handleSubmit}>
                    <TextField required label="Description" fullWidth
                               value={this.state.description}
                               onChange={event => this.setState({description: event.target.value})}/>
                    <br/><br/>
                    <FormLabel component="legend">Responsible</FormLabel>
                    <TextField required label="Name"
                               value={this.state.name}
                               onChange={event => this.setState({name: event.target.value})}/>
                    <TextField required label="Email"
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Status
                        </InputLabel>
                        <Select
                            required
                            native
                            value={this.state.status}
                            onChange={event => this.setState({status: event.target.value})}
                        >
                            <option value="" disabled hidden/>
                            <option value={"Ready"}>Ready</option>
                            <option value={"In_Progress"}>In_Progress</option>
                            <option value={"Completed"}>Completed</option>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            margin="normal"
                            label="Due Date"
                            value={this.state.dueDate}
                            clearable
                            onChange={date => this.setState({dueDate: date})}

                        />
                    </MuiPickersUtilsProvider>

                    <div className="right">
                        <Fab type="submit" color="primary" variant="round">
                            <CheckCircle/>
                        </Fab>
                    </div>
                </form>
            </Paper>
        );
    }

}

export default NewTask;