import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  progress: {
    margin: theme.spacing.unit,
  },
  wraploadingmsg: {
    display: 'flex',
  }
});

class ConsecutiveSnackbars extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  // createMessageLoading = (message) => {
  //   const func_clicked = this.handleClick(
  //     <div className={this.classes.wraploadingmsg}>
  //       <CircularProgress className={this.classes.progress} />
  //       <p>{message}</p>
  //     </div>
  //   )
  //   return func_clicked
  // }

  // handleClick = message => () => {
  //   this.queue.push({
  //     message,
  //     key: new Date().getTime(),
  //   });

  //   if (this.state.open) {
  //     // immediately begin dismissing current message
  //     // to start showing new one
  //     this.setState({ open: false });
  //   } else {
  //     this.processQueue();
  //   }
  // };

  // processQueue = () => {
  //   if (this.queue.length > 0) {
  //     this.setState({
  //       messageInfo: this.queue.shift(),
  //       open: true,
  //     });
  //   }
  // };

  // handleExited = () => {
  //   this.processQueue();
  // };

  createMessage = (loading, message) => {
    let msg
    if (loading) {
      msg = (
        <div className={this.classes.wraploadingmsg}>
          <CircularProgress className={this.classes.progress} />
          <p>{message}</p>
        </div>
      )
    }
    else
      msg = message
    return msg
  }

  render() {
    const { classes } = this.props;
    // const { messageInfo } = this.state;
    const to_open = this.props.open
    const message_prop = this.props.message
    const handleClose = this.props.handleClose
    const loading = this.props.loading
    this.classes = classes

    // const ff = this.createMessageLoading('Creating Series')
    // ff()
    const msg = this.createMessage(loading, message_prop)

    return (
      <div>
        {/* {this.createMessageLoading('Creating!')} */}
        {/* <Button onClick={this.createMessageLoading('Creating Series')}>Show message A</Button> */}
        {/* <Button onClick={this.handleClick('message b')}>Show message B</Button> */}
        <Snackbar
          // key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={to_open}
          autoHideDuration={2000}
          onClose={handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{msg}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsecutiveSnackbars)
// const injectedObserved = inject("store")(observer(ConsecutiveSnackbars))
// export default withStyles(styles)(injectedObserved)
