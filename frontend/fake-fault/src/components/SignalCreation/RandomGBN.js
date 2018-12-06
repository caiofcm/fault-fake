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

class RandomGBN extends React.Component {

  handleFaultConfig = (e) => {
    let val
    if (e.target.name === 'min_constant'){
      val = parseInt(e.target.value)
    }
    else {
      val = parseFloat(e.target.value)
    }
    let faultConfig = {...this.dataStore.faultConfig}
    faultConfig[e.target.name] = val
    this.dataStore.handleFaultConfig(faultConfig)
  }


  render() {
    const { classes } = this.props
    this.dataStore = this.props.store.store

    return (
      <form className={""}>
        <TextField
          label="Lower Value"
          value={this.dataStore.faultConfig.low_value}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="low_value"
        />
        <TextField
          label="Upper Value"
          value={this.dataStore.faultConfig.upp_value}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="upp_value"
        />
        <TextField
          label="Probability change"
          value={this.dataStore.faultConfig.prob_change}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="prob_change"
        />
        <TextField
          label="Min. constant"
          value={this.dataStore.faultConfig.min_constant}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
          name="min_constant"
        />
      </form>
    )
  }
}

const injectedObserved = inject("store")(observer(RandomGBN))
export default withStyles(styles)(injectedObserved)
