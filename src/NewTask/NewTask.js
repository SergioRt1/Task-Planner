import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab"
import CheckCircle from '@material-ui/icons/CheckCircle';
import {Redirect} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from "@material-ui/core/FormLabel";
import 'date-fns';

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {description: "", name: "", email: "", status: "", dueDate: new Date(), doRedirect: false};
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        const data = {
            "description": this.state.description,
            "responsible": {
                "name": this.state.name,
                "email": this.state.email
            },
            "status": this.state.status,
            "dueDate": this.state.dueDate
        };
        this.props.callback(data);
        this.setState({description: "", name: "", email: "", status: "", dueDate: new Date(), doRedirect:true})
    }

    render() {

        return (
            <Paper elevation={5} className="paper">
                <Typography variant="h4">New Task</Typography>
                <br/>
                <form className="form" onSubmit={this.handleSubmit}>
                    <TextField required label="Description" fullWidth
                               onChange={event => this.setState({description: event.target.value})}/>
                    <br/><br/>
                    <FormLabel component="legend">Responsible</FormLabel>
                    <TextField required label="Name"
                               onChange={event => this.setState({name: event.target.value})}/>
                    <TextField required label="Email"
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
                            <option value={"In Progress"}>In Progress</option>
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

                    <div className="rigth">
                        <Fab type="submit" color="primary" variant="round">
                            <CheckCircle/>
                        </Fab>
                    </div>
                    {this.state.doRedirect && <Redirect to={"/"}/>}
                </form>
            </Paper>
        );
    }

}

export default NewTask;