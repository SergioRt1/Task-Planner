import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DonutLarge from '@material-ui/icons/DonutLarge';
import './CardTask.css';
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {AxiosInstance} from "../AxiosInstance";

export class CardTask extends React.Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }


    delete() {
        this.props.callback(this.props.info);
        AxiosInstance.getInstance().delete("/tasks/"+this.props.info.id);
    }


    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className="layout">
                    <Card className="margin" elevation={5}>
                        <CardContent>
                            <div className="gridCard">
                                <div>
                                    <Typography variant="h5">
                                        {this.props.info.description}
                                    </Typography>
                                </div>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    {this.props.info.state === "Completed" ? <CheckCircle/> : <div/>}
                                    {this.props.info.state === "Ready" ? <CheckCircleOutline/> : <div/>}
                                    {this.props.info.state === "In_Progress" ? <DonutLarge/> : <div/>}
                                </div>
                                <IconButton onClick={this.delete}>
                                    <Delete/>
                                </IconButton>
                            </div>
                            <Typography variant="h5">
                                {this.props.info.state} - {new Date(this.props.info.dueDate).toDateString()}
                            </Typography>

                            <Typography variant="h5">
                                {this.props.info.responsible.name}
                            </Typography>
                            <Typography color="textSecondary" variant="h6">
                                {this.props.info.responsible.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </main>
            </React.Fragment>
        );
    }
}