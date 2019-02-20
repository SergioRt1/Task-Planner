import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DonutLarge from '@material-ui/icons/DonutLarge';
import './CardTask.css';

export class CardTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if (localStorage.getItem('emailDefault') === this.state.email && localStorage.getItem('passwordDefault') === this.state.password)
            localStorage.setItem('isLoggedIn', "true");
        this.setState({email: "", password: ""});
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
                                    <Typography variant="h6">
                                        {this.props.info.description}
                                    </Typography>
                                </div>
                                <div >
                                    {this.props.info.status === "Completed" ? <CheckCircle/> : <div/>}
                                    {this.props.info.status === "Ready" ? <CheckCircleOutline/> : <div/>}
                                    {this.props.info.status === "In Progress" ? <DonutLarge/> : <div/>}
                                </div>
                            </div>
                            <Typography variant="h6">
                                {this.props.info.status} - {new Date(this.props.info.dueDate).toDateString()}
                            </Typography>

                            <Typography variant="h6">
                                {this.props.info.responsible.name}
                            </Typography>
                            <Typography color="textSecondary" variant="h7">
                                {this.props.info.responsible.email}
                            </Typography>

                        </CardContent>
                    </Card>
                </main>
            </React.Fragment>
        );
    }
}