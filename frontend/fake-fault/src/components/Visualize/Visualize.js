import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Card';
import PlotData from '../PlotData/PlotData'
import { observer, inject } from 'mobx-react'

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
  const series = props.store.series
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {series.map((v) => {
          return (
            <Card className={classes.card}
              key={v.id}>
             <PlotData serie={v}/>
            </Card>
          )
        })}
      </Paper>
    </div>
  )
}

// export default withStyles(styles)(Visualize)
const styled = withStyles(styles)(Visualize)
export default inject("store", "routing")(observer(styled))
