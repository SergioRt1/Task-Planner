import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Edit from '@material-ui/icons/Edit';
import {Link, Redirect} from "react-router-dom";
import userimage from './../user.svg'
import {CardTask} from "../CardTask/CardTask";
import FloatingActionButton from "../FloatingActionButton";
import AddIcon from '@material-ui/icons/Add';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const drawerWidth = 320;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class PersistentDrawerLeft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false, tasks: props.tasks};
        this.changeState = this.changeState.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    changeState = (element) => {
        this.setState(element)
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleFilter = event => {
        this.setState({ anchorEl: null, doRedirectFilter: true});
    };

    handleLogout = () => {
        localStorage.setItem('page', "login");
        this.props.reloadPage()
    };

    render() {
        const {classes, theme} = this.props;
        const {open} = this.state;
        const { anchorEl } = this.state;
        const openMenu = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <div className="rigth">
                            <IconButton

                                color="inherit"
                                aria-label="More"
                                aria-owns={openMenu ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                className={classNames(classes.menuButton)}
                                onClick={this.handleClick}
                            >
                                <MoreVert/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open= {openMenu}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleFilter}>Filter</MenuItem>
                                {this.state.doRedirectFilter && <Redirect to={"/TaskFilters"}/>}

                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <div className="grid">
                        <img src={userimage} alt="userimg" className="img2"/>
                        <div>
                            <br/>
                            <Typography variant="h5">
                                {this.props.info.name}
                            </Typography>
                            <Typography variant="h6">
                                {this.props.info.email}
                            </Typography>
                        </div>
                        <br/>
                        <div className="rigth">
                            <Edit/>
                        </div>
                    </div>
                    <Divider/>
                    <div className="bottom">
                        <ExitToApp/>
                        <Link to={"/"} onClick={this.handleLogout}>Logout</Link>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    {this.state.tasks.map((task, id) => {
                        return (<CardTask info={task} key={id}/>);
                    })}
                    <div className="rigth">
                        <FloatingActionButton icon={<AddIcon/>} toRoute={"/NewTask"}/>
                    </div>
                </main>
            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(PersistentDrawerLeft);