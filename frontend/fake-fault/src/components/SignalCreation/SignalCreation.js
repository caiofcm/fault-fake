import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, withStyles } from '@material-ui/core';
import ConstantFault from './ConstantFault';
import { observer, inject } from 'mobx-react'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
})


const faultTypesSelections = [
  { value: 'constant', label: 'Constant' },
  { value: 'random', label: 'Random' },
  { value: 'arima', label: 'ARIMA' },
  { value: 'ramp', label: 'Ramp' },
  { value: 'senoidal', label: 'Senoidal' },
]


class SignalCreation extends Component {

  state = {
    labelWidth: 0,
    // faultType: 'constant',
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  // handleFaultConfig = (event) => {
  //   const faultConfig = { ...this.state.faultConfig }
  //   faultConfig.value = event.target.value
  //   console.log(this.state.faultConfig.value)
  //   this.setState({ faultConfig })
  // }

  addFormAfterTypeSelection = () => {
    switch (this.dataStore.faultType) {
      case 'constant':
        return (
          <ConstantFault
            >
          </ConstantFault>)
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props
    this.dataStore = this.props.store.store

    return (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            Fault Type
          </InputLabel>
          <Select
            value={this.dataStore.faultType}
            onChange={this.dataStore.handleFaultTypeSelection}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="falttype"
                id="outlined-age-simple"
              />
            }
          >
            {faultTypesSelections.map(v => {
              return (
                <MenuItem value={v.value}
                  key={v.value}>
                  {v.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {this.addFormAfterTypeSelection()}
      </div>
    )
  }
}


const styled = withStyles(styles)(SignalCreation)
export default inject("store")(observer(styled))
