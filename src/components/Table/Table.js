import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import Download from '@material-ui/icons/GetAppOutlined'
import { observer, inject } from 'mobx-react'
import views from '../../config/views'
import EnhancedTableToolbar from './TableToolbar'
import EnhancedTableHead from './TableHeader'
import download from 'downloadjs'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    // overflowX: 'auto',
  },
})

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  }

  handleDeleteClick = (selected, storeGlobal) => {
    const store = this.props.store.store
    // const { store } = storeGlobal
    store.handleDeleteTableClick(selected)
    this.setState({ selected: [] })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const dataTable = this.props.store.store.formattedTableData
      this.setState(state => ({ selected: dataTable.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  handleDownload = (event, id) => {
    // router.goTo(views.series, { id: n.id }, store)
    const serie = this.series.filter(v => v.id === id)[0]
    download(serie.values, "data.csv", "text/plain");
  }

  render() {
    const router = this.props.store.router
    const store = this.props.store.store
    const series = store.series
    const { classes } = this.props
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const dataTable = store.formattedTableData
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataTable.length - page * rowsPerPage)
    this.series = series

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar selected={selected} handleDeleteClick={this.handleDeleteClick}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={series.length}
            />
            <TableBody>
              {stableSort(dataTable, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox"
                        onClick={event => this.handleClick(event, n.id)}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell onClick={() => router.goTo(views.series, { id: n.id }, store)} >
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell >
                        {n.fault ? 'Yes': 'No'}
                      </TableCell>
                      <TableCell onClick={(event) => this.handleDownload(event, n.id)} >
                        <IconButton aria-label="Download">
                          <Download />
                        </IconButton>
                      </TableCell>
                      <TableCell>{n.min}</TableCell>
                      <TableCell>{n.max}</TableCell>
                      <TableCell>{n.size}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        {/* <h3>{this.props.store.store.seriesCount}</h3> */}
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

const styled = withStyles(styles)(EnhancedTable)
export default inject("store")(observer(styled))

