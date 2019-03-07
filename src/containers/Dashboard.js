import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
// import NotificationsIcon from '@material-ui/icons/Notifications'
import SnackBarInformation from '../components/SnackBarInformation/SnackBarInformation'
// import CircularProgress from '@material-ui/core/CircularProgress'

// import Button from '@material-ui/core/Button';

import { mainListItems } from './listitems'
// import SimpleLineChart from '../components/SimpleLineChart/SimpleLineChart'
// import Table from '../components/Table/Table'
// import LoadSeries from '../components/LoadSeries/LoadSeries'
// import CreateSeries from '../components/CreateSeries/CreateSeries'
// import { Route, Switch } from "react-router-dom"
// import { Route, Switch, withRouter } from "react-router"
// import EditFaults from '../components/EditFaults/EditFaults'
// import Visualize from '../components/Visualize/Visualize'
// import Import from '../components/Import/SendToServerExample'
import { observer, inject } from 'mobx-react'
import { MobxRouter } from 'mobx-router'
// import { CircularProgress } from 'material-ui';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Dashboard extends React.Component {
  // queue = [];

  state = {
    open: true,
    openNested: false,
    fakeState: false,

    // open_snackbar: false,
    // messageInfo: {},
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  handleNestedClick = () => {
    this.setState(state => ({ openNested: !state.openNested }));
  }

  showSnackBar = (signal_generating_status, handleCloseSnackBar) => {
    // let msg
    // if (signal_generating_status.loading){
    //   msg = (
    //     <React.Fragment>
    //       <CircularProgress />
    //       <p>{signal_generating_status.message}</p>
    //     </React.Fragment>
    //   )
    // }
    // else
    //   msg = signal_generating_status.message
    return (< SnackBarInformation
      open={signal_generating_status.open_snack_bar}
      message={signal_generating_status.message}
      handleClose={handleCloseSnackBar}
      loading={signal_generating_status.loading}
      >
      </SnackBarInformation >)
  }

  render() {
    const { classes } = this.props
    const { signal_generating_status } = this.props.store.store
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Fake Fault Builder
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems(classes, this.handleNestedClick, this.state.openNested, this.props.store.router)}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <MobxRouter />

          {/* {this.showSnackBar(is_generating_serie)} */}

          {/* <Button onClick={this.createMessageLoading('Creating Series')}>Show message A</Button> */}
          {/* <Button onClick={this.createMessageLoading('Creating Series')}>Test</Button> */}

          {this.showSnackBar(signal_generating_status, this.props.store.store.handleCloseSnackBar)}

        </main>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const styled = withStyles(styles)(Dashboard);
// const mobxed = inject("store")(observer(styled))
// export default mobxed

const injectedObserved = inject("store")(observer(Dashboard))
export default withStyles(styles)(injectedObserved)

// export default mobxed
