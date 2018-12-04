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
    const valConstant = e.target.value
    const faultConfig = { value: parseFloat(valConstant) }
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
        />
        <TextField
          label="Upper Value"
          value={this.dataStore.faultConfig.upp_value}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
        />
        <TextField
          label="Probability change"
          value={this.dataStore.faultConfig.prob_change}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
        />
        <TextField
          label="Min. constant"
          value={this.dataStore.faultConfig.min_constant}
          onChange={this.handleFaultConfig}
          type="number"
          className={classes.textField}
          // margin="normal"
          variant="outlined"
        />
      </form>
    )
  }
}

const injectedObserved = inject("store")(observer(RandomGBN))
export default withStyles(styles)(injectedObserved)
