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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Edit from '@material-ui/icons/Edit';
import {Link} from "react-router-dom";
import userimage from './../user.svg'
import {CardTask} from "../CardTask/CardTask";
import FloatingActionButton from "../FloatingActionButton";
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import Modal from "@material-ui/core/Modal";
import TaskFilters from "../TaskFilters/TaskFilters";
import NewTask from "../NewTask/NewTask";

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
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: "none",
        padding: theme.spacing.unit,
        [theme.breakpoints.up("xs")]: {
            display: "flex",
        },
    }
});

class PersistentDrawerLeft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false, tasks: props.tasks, openModal: false, openModalNew: false};
        this.changeState = this.changeState.bind(this);
        this.formNewTask = this.formNewTask.bind(this)
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

    handleLogout = () => {
        localStorage.setItem('page', "login");
        this.props.reloadPage()
    };

    handleModalNewOpen = () => {
        this.setState({openModalNew: true});
    };

    handleModalNewClose = () => {
        this.setState({openModalNew: false});
    };

    handleModalOpen = () => {
        this.setState({openModal: true});
    };

    handleModalClose = () => {
        this.setState({openModal: false});
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.tasks !== this.props.tasks)
            this.setState({tasks: nextProps.tasks})
    }

    formNewTask(newTask) {
        this.setState((state) => {
                const newTasks = [...state.tasks, newTask];
                localStorage.setItem('tasks',JSON.stringify(newTasks));
                return {tasks: newTasks}
            }
        );
    }

    render() {
        const {classes, theme} = this.props;
        const {open} = this.state;

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
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton onClick={this.handleModalOpen} color="inherit">
                                <FilterIcon/>
                            </IconButton>
                        </div>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openModal}
                                onClose={this.handleModalClose}
                            >
                                <TaskFilters tasks={this.state.tasks}/>
                            </Modal>
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
                        <div className="right">
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
                    <div className="right">
                        <FloatingActionButton icon={<AddIcon/>} callback={this.handleModalNewOpen}/>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openModalNew}
                            onClose={this.handleModalNewClose}
                        >
                            <NewTask callback={this.formNewTask} close={this.handleModalNewClose}/>
                        </Modal>
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