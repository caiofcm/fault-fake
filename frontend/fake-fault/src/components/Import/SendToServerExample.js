import React from 'react'
import axios, { post } from 'axios';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      phrase: '',
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    console.log('in submit', this.state.file)
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      this.setState({ phrase: response.data})
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:5000/file-upload'
    console.log('in upload', file)
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }
    console.log(formData)
    return post(url, formData, config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
        <div>
          {this.state.phrase}
        </div>
      </form>
   )
  }
}



export default SimpleReactFileUpload
