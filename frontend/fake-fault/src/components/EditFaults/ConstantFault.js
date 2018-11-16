import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class ConstantFault extends Component {

  // state = {
  //   // value: 0.0,
  //   faultConfig: {
  //     value: 0.0,
  //   }
  // }

  // handleChange = (event) => {
  //   console.log(this.props.faultConfig.value)
  //   this.props.handleFaultConfig(event)
  //   // const faultConfig = { ...this.state.faultConfig }
  //   // faultConfig.value = event.target.value
  //   // console.log(event.target.value)
  //   // console.log(this.state.faultConfig.value)
  //   // this.setState({ faultConfig })
  // }

  render() {
    const classes = this.props.classes
    return (
      <form className={classes.container}>
        <TextField
          id="outlined-number"
          label="Value"
          value={this.props.faultConfig.value}
          onChange={this.props.handleFaultConfig}
          type="number"
          className={classes.textField}
          // InputLabelProps={{
          //   shrink: true,
          // }}
          margin="normal"
          variant="outlined"
        />
      </form>
    )
  }
}

// function ConstantFault(props) {
//   classes = props.classes
//   return (
//     <form className={classes.container}>
//       <TextField
//         id="outlined-number"
//         label="Number"
//         // value={}
//         // onChange={}
//         type="number"
//         className={classes.textField}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         margin="normal"
//         variant="outlined"
//       />
//     </form>
//   )
// }

export default withStyles(styles)(ConstantFault)

// import React, { Component } from 'react'

// export default class ConstantFault extends Component {
//   render() {
//     return (
//       <div>
//         <h3>Oi!</h3>
//       </div>
//     )
//   }
// }

