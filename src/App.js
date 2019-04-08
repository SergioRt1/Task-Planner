import React, {Component} from 'react';
import './App.css';
import {Login} from './Login/Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PersistentDrawerLeft from "./Drawer/Drawer";
import NewUser from "./NewUser/NewUser";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {AxiosInstance} from "./AxiosInstance";

const theme = createMuiTheme({
    palette: {
        common: {black: "#000", white: "#fff"},
        background: {paper: "rgba(225, 205, 151, 1)", default: "#FFE591"},
        primary: {
            light: "rgba(255, 116, 0, 0.69)",
            main: "rgba(255, 116, 0, 1)",
            dark: "rgba(255, 80, 0, 1)",
            contrastText: "#fff"
        },
        secondary: {
            light:"#F7B442",
            main:"#FFA000",
            dark:"#D28503",
            contrastText:"#fff"
        }
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: localStorage.getItem('page')
        };
        this.reloadPage = this.reloadPage.bind(this);
        AxiosInstance.setCallback(this.reloadPage)
    }


    reloadPage() {
        this.setState({page: localStorage.getItem('page')})
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.state.page === 'home' ?
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                   render={() => <PersistentDrawerLeft reloadPage={this.reloadPage}/>}/>
                        </Switch>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Login reloadPage={this.reloadPage}/>}/>
                            <Route exact path="/NewUser" render={() => <NewUser/>}/>
                        </Switch>
                    </BrowserRouter>
                }
            </MuiThemeProvider>
        );
    }
}

export default App;
