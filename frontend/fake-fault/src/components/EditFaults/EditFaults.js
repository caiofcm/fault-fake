import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js'
import { Paper } from '@material-ui/core';
import FormEdit from './FormEdit'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  wrapPaper: {

  },
  // content: {
  //   padding: theme.spacing.unit * 3,
  //   height: '100vh',
  //   overflow: 'auto',
  // },
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
  textField: {
    flexBasis: 200,
  },
})

class EditFaults extends Component {

  state = {
    checkedSelection: false,
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
      alert('ZOOM!' + '\n\n' +
        'Event data:' + '\n' +
        JSON.stringify(eventdata) + '\n\n' +
        'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
        'x-axis end:' + eventdata['xaxis.range[1]'])
    }
  }

  conditionalHandleRelayout = (event) => {
    if (this.state.checkedSelection) {
      this.handleReLayout(event)
    }
  }

  handleCheckedSelection = (event) => {
    this.setState({ checkedSelection: event.target.checked })
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
            mode: 'lines+points',
            marker: { color: 'black' },
          },
        ]}
        layout={{ title: serie.tag }}
      />
    )
  }

  render() {
    const { classes } = this.props;
    const id = parseInt(this.props.match.params.id)
    const serie = this.props.data.filter(v => v.id === id)[0]
    return (
      <div className={classes.root}>
        {/* <div className={classes.wrapPaper}> */}
        <Paper className={classes.paper}>
          <div className={classes.wrapMain}>
            {this.buildPlot(classes, serie)}
            <FormEdit
              checkedSelection={this.state.checkedSelection}
              handleCheckedSelection={this.handleCheckedSelection}
            // faultType={this.state.faultType}
            // handleTypeSelection={this.handleTypeSelection}
            >
            </FormEdit>
          </div>
          <div className={classes.wrapButtons}>
            <Button
              className={classes.margin}
              variant="contained" color="primary" className={classes.button}>
              Edit
              </Button>
            <Button
              className={classes.margin}
              variant="contained" color="secondary" className={classes.button}>
              Cancel
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
