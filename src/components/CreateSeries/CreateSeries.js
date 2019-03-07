import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
import { Paper, TextField } from '@material-ui/core';
import SignalCreation from '../SignalCreation/SignalCreation'
import ConfirmBackButtons from '../Buttons/ConfirmBackButtons'
import NoiseForm from '../SignalCreation/NoiseForm'
import { observer, inject } from 'mobx-react'
import views from '../../config/views'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit*2,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


function CreateSeries(props) {
  const { classes } = props;
  // const classes = {}
  const router = props.store.router
  const dataStore = props.store.store
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" id="createTitle">
        Create a new Signal
      </Typography>
      <TextField
        label="Number of Points"
        // defaultValue=""
        className={classes.textField}
        // helperText="Corresponding t"
        type="number"
        value={dataStore.numberPointsCreation}
        onChange={dataStore.handleNumberPointsCreation}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Tag"
        // defaultValue=""
        className={classes.textField}
        // helperText="Corresponding t"
        // type="number"
        value={dataStore.tagCreation}
        onChange={dataStore.handleTagCreation}
        margin="normal"
        variant="outlined"
      />
      <SignalCreation></SignalCreation>
      <NoiseForm></NoiseForm>
      <ConfirmBackButtons
        handleOkButton={dataStore.handleSignalCreation}
        confirmLabel='Create'
        handleBackButton={(e) => { router.goTo(views.home)}}
      />
    </Paper>
  );
}

CreateSeries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const injectedObserved = inject("store")(observer(CreateSeries))
export default withStyles(styles)(injectedObserved)
