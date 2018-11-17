import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Card'

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  paper: {
    display: 'flex',
    // 'align-items': 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 3,
    height: '90vh',
    overflow: 'auto',
  },
  card: {
    flexBasis: 800,
    margin: theme.spacing.unit * 2,
  }
})

function Visualize(props) {
  const { classes } = props

  let fileReader
  const handleFileChosen = (e) => {
    const file = e.target.files[0]
    console.log(e)
    console.log(file)
    fileReader = new FileReader();
    fileReader.onloadend = props.onFileLoad
    fileReader.readAsText(file)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <input type='file'
          id='file'
          className='input-file'
          accept='.csv'
          hidden
          onChange={handleFileChosen}
        />
        <label htmlFor="file">
          <Button variant="contained" color="primary" component="span" className={classes.button}
            >
            Upload CSV
          </Button>
        </label>

      </Paper>
    </div>
  )
}

export default withStyles(styles)(Visualize)
