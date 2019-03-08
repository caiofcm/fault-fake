import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Card'
// import FileUploadIcon from '@material-ui/icons/InputRounded'
import { observer, inject } from 'mobx-react'
import { FormControlLabel, Switch } from '@material-ui/core';
// import Icon from '@material-ui/core/Icon'

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
  form: {
    display: 'flex',
    width: '100%',
    flexFlow: 'column',
    // justifyContent: 'flex-start',
  },
  card: {
    flexBasis: 800,
    margin: theme.spacing.unit * 2,
  },
  labelUpload: {
    marginLeft: 15,
  },
  submitBut: {
    alignSelf: 'center'
    // marginTop: 30,
    // textAlign: 'center',
  }
})

class Import extends React.Component {

  state = {
    fileName: 'File not chosen',
  }

  handleFileChosen = (e) => {
    // const dataStore = this.props.store.store
    const file = e.target.files[0]
    this.fileAtt = file
    // console.log(e)
    // console.log(file)
    this.setState({ fileName: file.name })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const dataStore = this.props.store.store
    // console.log('aow', e)
    // console.log('aow', this.fileAtt)
    const fileReader = new FileReader();
    fileReader.onloadend = dataStore.importSeriesFromFile
    fileReader.readAsText(this.fileAtt)
  }


  render() {
    const { classes } = this.props
    const dataStore = this.props.store.store

    return (
      <div className={classes.root}>
        <h3>Todo: fix</h3>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} id="myform" className={classes.form}>
            <div className="">
              <input type='file'
                id='file'
                className='input-file'
                accept='.csv'
                hidden
                onChange={this.handleFileChosen}
              />
              <label htmlFor="file">
                <Button variant="contained" component="span" className={classes.button}
                >
                  Choose File
             </Button>
              </label>
              <span className={classes.labelUpload}>{this.state.fileName}</span>
            </div>
            <FormControlLabel
              control={
                <Switch
                  // checked={dataStore.appendImportedSeries}
                  onChange={dataStore.handleAppendImportedSeries}
                  value="appendImportedSeriesVal"
                  color="primary"
                />
              }
              label="Append to Series"
            />

            <div className={classes.submitBut}>
              <Button variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                form="myform"
              >
                Submit
               </Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }

}

const styled = withStyles(styles)(Import)
export default inject("store")(observer(styled))
