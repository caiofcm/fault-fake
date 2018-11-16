import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js'
import { Paper } from '@material-ui/core';
import FormEdit from './FormEdit'
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';

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

  // myDiv.on('plotly_relayout',
  //   function(eventdata) {
  //   alert('ZOOM!' + '\n\n' +
  //     'Event data:' + '\n' +
  //     JSON.stringify(eventdata) + '\n\n' +
  //     'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
  //     'x-axis end:' + eventdata['xaxis.range[1]']);
  // })
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
      // alert('ZOOM!' + '\n\n' +
      //   'Event data:' + '\n' +
      //   JSON.stringify(eventdata) + '\n\n' +
      //   'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
      //   'x-axis end:' + eventdata['xaxis.range[1]'])
    }
  }

  // conditionalHandleRelayout = (event) => {
  //   if (this.state.checkedSelection) {
  //     this.handleReLayout(event)
  //   }
  // }

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

  handleFaultConfig = (event) => {
    const faultConfig = { ...this.state.faultConfig }
    faultConfig.value = event.target.value
    console.log(this.state.faultConfig.value)
    this.setState({ faultConfig })
  }

  handleBackBut = (event) => {

  }

  buildPlot(classes, serie) {
    return (
      <Plot
        onRelayout={this.handleReLayout}
        data={[
          {
            // x: [1, 2, 3],
            y: serie.values,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'black', symbol: 'circle-open', size: 12 },
          },
        ]}
        layout={{ title: serie.tag }}
      />
    )
  }

  handleTypeSelection = (event) => {
    console.log(event);
    this.setState({ faultType: event.target.value });
  }

  handleEdit = (e, id) => {
    this.props.handleEditBut(e, id, this.state.faultConfig,
      {lowBound: this.state.lowBound, uppBound: this.state.uppBound },
      this.state.faultType
    )
  }

  render() {
    const { classes } = this.props;
    const id = parseInt(this.props.match.params.id)
    const serie = this.props.data.filter(v => v.id === id)[0]
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.wrapMain}>
            {this.buildPlot(classes, serie)}
            <FormEdit
              checkedSelection={this.state.checkedSelection}
              handleCheckedSelection={this.handleCheckedSelection}
              lowBound={this.state.lowBound}
              handleLowBound={this.handleLowBound}
              uppBound={this.state.uppBound}
              handleUppBound={this.handleUppBound}
              faultConfig={this.state.faultConfig}
              handleFaultConfig={this.handleFaultConfig}
              faultType={this.state.faultType}
              handleTypeSelection={this.handleTypeSelection}
            >
            </FormEdit>
          </div>
          <div className={classes.wrapButtons}>
            <Button
              variant="contained" color="primary" className={classes.button}
              onClick={(e) => this.handleEdit(e, id)}>
              Edit
              </Button>
            <Button
              variant="contained" color="secondary" className={classes.button}
              onClick={this.handleBackBut}>
              Back
            </Button>
          </div>
        </Paper>
        {/* </div> */}



      </div>
    );
  }
}

export default withStyles(styles)(EditFaults)

// function EditFaultsF(props) {
//   console.log(props);
//   const id = parseInt(props.match.params.id)
//   const serie = props.data.filter(v => v.id === id)[0]

//   return (
//     <div>
//       <h3>Foi! {id}</h3>
//       <p>
//         {serie.tag}
//       </p>
//     </div>
//   )
// }
