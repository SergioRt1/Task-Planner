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
import FormLabel from "@material-ui/core/FormLabel"

class TaskFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {dueDate: new Date(), name: "", email: "", status: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearInfo = this.handleClearInfo.bind(this);
    }

    handleSubmit(e) {
        //TODO Filter actions
    }

    handleClearInfo(){
        this.setState({dueDate: new Date(), name: "", email: "", status: ""});
    }

    render() {
        return (
            <>
                <Paper elevation={5} className="paper">
                    <Typography variant="h4">Task filters</Typography>
                    <br/><br/>

                    <form className="form" onSubmit={this.handleSubmit}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                margin="normal"
                                label="Due Date"
                                value={this.state.dueDate}
                                onChange={date => this.setState({dueDate: date})}
                            />
                        </MuiPickersUtilsProvider>
                        <br/><br/>
                        <FormLabel component="legend">Responsible</FormLabel>
                        <TextField value={this.state.name} label="Name"
                                   onChange={event => this.setState({name: event.target.value})}/>
                        <TextField value={this.state.email} label="Email"
                                   onChange={event => this.setState({email: event.target.value})}/>
                        <br/><br/>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Status
                            </InputLabel>
                            <Select
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


                        <br/><br/>
                        <Button type="submit" color="primary" variant="contained" fullWidth>
                            Apply
                        </Button>
                        <br/><br/>
                        <Button  color="primary" variant="contained" fullWidth onClick={this.handleClearInfo}>
                            Clear All
                        </Button>
                    </form>
                </Paper>
            </>
        );
    }
}

export default TaskFilters;