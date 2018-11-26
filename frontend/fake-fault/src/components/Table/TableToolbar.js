import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles/colorManipulator'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})

let EnhancedTableToolbar = props => {
  const { selected, classes } = props
  const handleDeleteClick = props.handleDeleteClick
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      <div className={classes.title}>
        {selected.length > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {selected.length} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Data Series
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={(e) => handleDeleteClick(selected, props.store)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
}

const styled = withStyles(toolbarStyles)(EnhancedTableToolbar)
// export default inject("store")(observer(styled))
export default styled
