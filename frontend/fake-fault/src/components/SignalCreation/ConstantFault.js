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

class ConstantFault extends React.Component {

  handleFaultConfig = (e) => {
    const valConstant = e.target.value
    const faultConfig = { value: valConstant }
    this.dataStore.handleFaultConfig(faultConfig)
  }


  render() {
    const { classes }= this.props
    this.dataStore = this.props.store.store

    return (
      <form className={""}>
        <TextField
          id="outlined-number"
          label="Value"
          value={this.dataStore.faultConfig.value}
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

const injectedObserved = inject("store")(observer(ConstantFault))
export default withStyles(styles)(injectedObserved)
