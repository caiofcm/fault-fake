import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import ConstantFault from '../CreateSeries/ConstantFault';
import SignalCreation from '../SignalCreation/SignalCreation';
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
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
    minWidth: 120,
  },
})

const faultTypesSelections = [
  { value: 'constant', label: 'Constant' },
  { value: 'random', label: 'Random' },
  { value: 'arima', label: 'ARIMA' },
  { value: 'ramp', label: 'Ramp' },
  { value: 'senoidal', label: 'Senoidal' },
]

class FormEdit extends Component {
  // const classes = props.classes

  // handleTypeSelection = (event) => {
  //   console.log(event);
  //   this.setState({ faultType: event.target.value });

  // }

  render() {
    const props = this.props
    const classes = props.classes
    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              checked={props.checkedSelection}
              onChange={props.handleCheckedSelection}
              // value="checkedB"
              color="primary"
            />
          }
          label="Select Region in Chart to Add Fault"
        />

        <div>
          <TextField
            id="outlined-helperText"
            label="Lower Bound"
            // defaultValue=""
            className={classes.textField}
            // helperText="Corresponding t"
            value={props.lowBound}
            onChange={props.handleLowBound}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-helperText"
            label="Upper Bound"
            // defaultValue=""
            value={props.uppBound}
            onChange={props.handleUppBound}
            className={classes.textField}
            // helperText="Corresponding t"
            margin="normal"
            variant="outlined"
          />
        </div>
        <SignalCreation />
        {/* <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            Fault Type
          </InputLabel>
          <Select
            value={this.props.faultType}
            onChange={this.props.handleTypeSelection}
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
        {this.addFormAfterTypeSelection()} */}
      </div>
    )
  }
}

export default inject("store")(
  observer(
    withStyles(styles)(FormEdit)
  )
)
