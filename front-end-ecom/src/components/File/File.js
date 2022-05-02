import React, { Fragment } from 'react'
import axios, { post } from 'axios';

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
    fd.append('files[]',this.state.selectedFile,`${this.props.img_id}.png`)
    axios.post('/merchant/img',fd).then(res=>console.log(res))
  }
  render(){
    return(
      <Fragment>
        <input type="file" onChange={this.fileSelectorHandler}/>
        <button onClick={this.uploadHandler}>upload</button>
      </Fragment>
    )
  }
}



export default File
