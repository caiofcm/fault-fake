import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit*2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

function Inputs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h6" id="createTitle">
        Create a Generalized Binary Noise Signal
    </Typography>
      <div className={classes.container}>
        <Input
          defaultValue="Hello world"
          className={classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Placeholder"
          className={classes.input}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          value="Disabled"
          className={classes.input}
          disabled
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          defaultValue="Error"
          className={classes.input}
          error
          inputProps={{
            'aria-label': 'Description',
          }}
        />
      </div>
    </Paper>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
