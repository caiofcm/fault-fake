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

class RandomWalk extends React.Component {


  render() {
    const { classes } = this.props
    this.dataStore = this.props.store.store

    return (
      <form className={""}>
        <TextField
          label="Starting Value"
          value={this.dataStore.faultStores.randomWalk.start_val}
          onChange={this.dataStore.faultStores.randomWalk.handleModifyValue}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="start_val"
        />
        <TextField
          label="Probability Down"
          value={this.dataStore.faultStores.randomWalk.prob_down}
          onChange={this.dataStore.faultStores.randomWalk.handleModifyValue}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="prob_down"
        />
        <TextField
          label="Probability Up"
          value={this.dataStore.faultStores.randomWalk.prob_up}
          onChange={this.dataStore.faultStores.randomWalk.handleModifyValue}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="prob_up"
        />
        <TextField
          label="Amplitude"
          value={this.dataStore.faultStores.randomWalk.amplitude}
          onChange={this.dataStore.faultStores.randomWalk.handleModifyValue}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="amplitude"
        />
      </form>
    )
  }
}

const injectedObserved = inject("store")(observer(RandomWalk))
export default withStyles(styles)(injectedObserved)
