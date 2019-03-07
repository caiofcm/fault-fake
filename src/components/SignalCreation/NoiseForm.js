

import React from 'react'
import { TextField, withStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function NoiseForm(props) {
  const { classes } = props
  const dataStore = props.store.store
  return (
    <div className={""}>
      <TextField
        label="Noise Standard Deviation"
        // defaultValue=""
        className={classes.textField}
        // helperText="Corresponding t"
        // type="number"
        value={dataStore.noiseStd}
        onChange={dataStore.handleNoiseAddition}
        margin="normal"
        variant="outlined"
      />
    </div>
  )
}

const injectedObserved = inject("store")(observer(NoiseForm))
export default withStyles(styles)(injectedObserved)
