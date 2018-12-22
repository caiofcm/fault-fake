import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class Ramp extends React.Component {

  render() {
    const { classes } = this.props
    this.dataStore = this.props.store.store
    const fault = this.dataStore.faultStores.ramp
    return (
      <form className={""}>
        <TextField
          label="Start Value"
          value={fault.start_vals}
          onChange={fault.handleModifyValue}
          type="number"
          className={classes.textField}
          variant="outlined"
          name="start_vals"
        />
        <TextField
          label="Final Value"
          value={fault.final_vals}
          onChange={fault.handleModifyValue}
          type="number"
          className={classes.textField}
          variant="outlined"
          name="final_vals"
        />
      </form>
    )
  }
}

const injectedObserved = inject("store")(observer(Ramp))
export default withStyles(styles)(injectedObserved)
