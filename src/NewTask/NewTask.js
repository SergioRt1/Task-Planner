import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab"
import CheckCircle from '@material-ui/icons/CheckCircle';
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {description: "", responsible: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        localStorage.setItem('page', "home");
        this.setState({description: "", responsible: "", status: "", dueDate: ""});
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h2">New Task</Typography>
                    <br/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField required label="Description" fullWidth
                                   onChange={event => this.setState({description: event.target.value})}/>
                        <TextField required label="Responsible" fullWidth
                                   onChange={event => this.setState({responsible: event.target.value})}/>
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
                                <option value="" disabled selected={true} hidden/>
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
                                onChange={event => this.setState({dueDate: event.target.value})}

                            />
                        </MuiPickersUtilsProvider>

                        <div className="rigth">
                            <Fab type="submit" color="primary" variant="round">
                                <CheckCircle/>
                            </Fab>
                        </div>
                    </form>
                </Paper>
            </>
        );
    }

}

export default NewTask;