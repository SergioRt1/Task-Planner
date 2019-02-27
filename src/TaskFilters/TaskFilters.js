import {Component} from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

class TaskFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {description: "", responsible: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if (this.state.confirmPassword === this.state.password) {

            this.setState({dueDate: "", responsible: "", status: "", confirmPassword: ""});
        } else alert("The password and the confirmation do not make match")
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h2">Task filters</Typography>
                    <br/><br/>

                    <form className="form" onSubmit={this.handleSubmit}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                margin="normal"
                                label="Due Date"
                                value={this.state.dueDate}
                                onChange={event => this.setState({dueDate: event.target.value})}

                            />
                        </MuiPickersUtilsProvider>

                        <TextField label="Responsible" fullWidth
                                   onChange={event => this.setState({responsible: event.target.value})}/>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Status
                            </InputLabel>
                            <Select
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


                        <br/><br/>
                        <Button type="submit" color="primary" variant="raised" fullWidth>
                            Apply
                        </Button>
                        <br/><br/>
                        <Button type="submit" color="primary" variant="raised" fullWidth>
                            Clear All
                        </Button>
                    </form>
                </Paper>
            </>
        );
    }
}

export default TaskFilters;