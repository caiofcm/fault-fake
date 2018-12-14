import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import Plot from 'react-plotly.js'
import { Paper } from '@material-ui/core';
import FormEdit from './FormEdit'
import Button from '@material-ui/core/Button';
import PlotData from '../PlotData/PlotData'
// import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react'
import ConfirmBackButtons from '../Buttons/ConfirmBackButtons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  wrapPaper: {

  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  wrapMain: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  wrapButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    width: 100,
  },
  textField: {
    flexBasis: 200,
  },
})

class EditFaults extends Component {

  state = {
    checkedSelection: false,
    lowBound: 0,
    uppBound: 0,
    faultConfig: {
      value: 0.0
    },
    faultType: 'constant',
  }

  handleReLayout = (eventdata) => {
    console.log(eventdata)
    if ('xaxis.autorange' in eventdata && 'yaxis.autorange' in eventdata) {
      return
    }
    if (this.state.checkedSelection) {
      const valLow = Math.floor(eventdata['xaxis.range[0]'])
      const valUpp = Math.floor(eventdata['xaxis.range[1]'])
      console.log(eventdata)
      console.log(eventdata['xaxis.range[0]'])
      console.log(this.state.lowBound)
      this.setState({
        lowBound: valLow,
        uppBound: valUpp,
      })
    }
  }

  handleCheckedSelection = (event) => {
    this.setState({ checkedSelection: event.target.checked })
  }

  handleLowBound = (event) => {
    const val = event.target.value
    this.setState({ lowBound: val })
  }

  handleUppBound = (event) => {
    const val = event.target.value
    this.setState(() => {
      return { uppBound: val}
    })
  }

  // handleFaultConfig = (event) => {
  //   const faultConfig = { ...this.state.faultConfig }
  //   faultConfig.value = event.target.value
  //   console.log(this.state.faultConfig.value)
  //   this.setState({ faultConfig })
  // }

  handleBackBut = (event) => {
    // this.props.history.goBack()
    window.history.back()
  }

  handleTypeSelection = (event) => {
    console.log(event);
    this.setState({ faultType: event.target.value });
  }

  handleEdit = (e, id, store) => {
    store.handleEditFaultWithBounds(id,
      {lowBound: this.state.lowBound, uppBound: this.state.uppBound }
    )
  }

  render() {
    const store = this.props.store.store;
    const router = this.props.store.router;
    const params = router.params
    const id = parseInt(params.id)
    const serie = this.props.store.store.series.filter(v => v.id === id)[0]
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.wrapMain}>
            <PlotData serie={serie} handleReLayout={this.handleReLayout} />
            <FormEdit
              checkedSelection={this.state.checkedSelection}
              handleCheckedSelection={this.handleCheckedSelection}
              lowBound={this.state.lowBound}
              handleLowBound={this.handleLowBound}
              uppBound={this.state.uppBound}
              handleUppBound={this.handleUppBound}
              // faultConfig={this.state.faultConfig}
              // handleFaultConfig={this.handleFaultConfig}
              // faultType={this.state.faultType}
              handleTypeSelection={this.handleTypeSelection}
            >
            </FormEdit>
          </div>
          <ConfirmBackButtons
            handleOkButton={(e) => this.handleEdit(e, id, store)}
            confirmLabel='Edit'
            handleBackButton={this.handleBackBut}
          />
        </Paper>

      </div>
    );
  }
}

const styled = withStyles(styles)(EditFaults)
export default inject(["store"])(observer(styled))
