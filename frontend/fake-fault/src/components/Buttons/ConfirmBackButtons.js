

import React from 'react'
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, withStyles } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';

const styles = theme => ({

  wrapButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
  },
  button: {
    width: 100,
  },
})

const handleBackButton = (event) => {
  window.history.back()
}

function ConfirmBackButtons(props) {
  const { classes } = props
  const handleOkButton = props.handleOkButton
  const handleBackButton = props.handleBackButton ? props.handleBackButton : handleBackButton
  const confirmLabel = props.confirmLabel ? props.confirmLabel : 'Ok'
  const backLabel = props.backLabel ? props.backLabel : 'Back'
  return (
      <div className={classes.wrapButtons}>
        <Button
          variant="contained" color="primary" className={classes.button}
          onClick={handleOkButton}>
        {confirmLabel}
        </Button>
        <Button
          variant="contained" color="secondary" className={classes.button}
        onClick={handleBackButton}>
          {backLabel}
        </Button>
      </div>
  )
}

const injectedObserved = inject("store")(observer(ConfirmBackButtons))
export default withStyles(styles)(injectedObserved)
