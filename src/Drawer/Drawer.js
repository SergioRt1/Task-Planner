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
import {CardTask} from "../CardTask/CardTask";
import FloatingActionButton from "../FloatingActionButton";
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import Modal from "@material-ui/core/Modal";
import TaskFilters from "../TaskFilters/TaskFilters";
import NewTask from "../NewTask/NewTask";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuList from "@material-ui/core/MenuList";
import {AxiosInstance} from "../AxiosInstance";
import EditUser from "../EditUser/EditUser";

const drawerWidth = 256;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    avatarBox: {
        width: '100%',

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
        backgroundColor: theme.palette.background.default
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
        this.state = {open: false, tasks: [], openModal: false, openModalNew: false, userInfo: {name:"",email:""},openModalUser: false};
        this.changeState = this.changeState.bind(this);
        this.formNewTask = this.formNewTask.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        AxiosInstance.getInstance().get('/user/' + username)
            .then(response => {
                this.setState({userInfo: response.data});
            });
        AxiosInstance.getInstance().get('/tasks/byUser/'+username)
            .then(response => {
                let tasks = [];
                response.data.forEach(function (task) {
                    tasks.push(task)
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                this.setState({tasks: tasks});
            });

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
        localStorage.clear();
        localStorage.setItem('page', "login");
        this.props.reloadPage()
    };

    handleModalNewOpen = () => {
        this.setState({openModalNew: true});
    };

    handleModalNewClose = () => {
        this.setState({openModalNew: false});
    };

    handleModalUserOpen = () => {
        this.setState({openModalUser: true});
    };

    handleModalUserClose = () => {
        this.setState({openModalUser: false});
    };

    handleModalOpen = () => {
        this.setState({openModal: true});
    };

    handleModalClose = () => {
        this.setState({openModal: false});
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.tasks !== this.props.tasks)
            this.setState({tasks: nextProps.tasks})
    }

    formNewTask(newTask) {
        this.setState((state) => {
                const newTasks = [...state.tasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                return {tasks: newTasks}
            }
        );
        this.handleModalNewClose()
    }

    updateUserInfo(userInfo) {
        this.setState({userInfo: userInfo});
    }

    removeTask(task){
        let tasks = this.state.tasks.filter((t)=>{return task.id !== t.id});
        this.setState({tasks:tasks})
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
                        <Typography variant="h6" color="inherit" noWrap>
                            Task planner
                        </Typography>
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
                    variant="temporary"
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
                    <List className={classes.avatarBox}>
                        <ListItem>
                            <ListItemAvatar style={{
                                left: -8,
                            }}>
                                <Avatar>{this.state.userInfo.name.charAt(0).toUpperCase()}</Avatar>
                            </ListItemAvatar>

                            <ListItemText

                                primary={this.state.userInfo.name}

                                secondary={
                                    <Typography color="textSecondary" noWrap>
                                        {this.state.userInfo.email}
                                    </Typography>}
                            />
                            <ListItemSecondaryAction style={{
                                position: 'absolute',
                                left: 204,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}>
                                <IconButton onClick={this.handleModalUserOpen}>
                                    <Edit/>
                                </IconButton>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.openModalUser}
                                    onClose={this.handleModalUserClose}
                                >
                                    <EditUser callback={this.updateUserInfo} close={this.handleModalUserClose}/>
                                </Modal>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Divider/>
                    <div className="bottom">
                        <MenuList>
                            <ListItem button key="sign-out" onClick={this.handleLogout}>
                                <ListItemIcon className={classes.item}>
                                    <ExitToApp/>
                                </ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                        </MenuList>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    {this.state.tasks.map((task, id) => {
                        return (<CardTask info={task} key={id} callback={this.removeTask}/>);
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