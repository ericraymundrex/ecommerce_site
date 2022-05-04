import React, { Fragment } from 'react'
import axios, { post } from 'axios';
import uuid from 'react-uuid';
class File extends React.Component {
  state={
    selectedFile:null
  }
  fileSelectorHandler=event=>{
    this.setState({
      selectedFile:event.target.files[0]
    })
  }
  uploadHandler=event=>{
    const fd=new FormData()
    const img_id=uuid()

    fd.append('files[]',this.state.selectedFile,`${img_id}.png`)
    console.log(img_id)
    localStorage.setItem("img_id",img_id)
    axios.post('/merchant/img',fd).then(res=>this.props.success())
    this.props.uploading()
  }
  render(){
    return(
      <Fragment>
        <input type="file" onChange={this.fileSelectorHandler}/>
        <button onClick={this.uploadHandler} className="btn btn-primary">Add Item</button>
      </Fragment>
    )
  }
}



export default File
