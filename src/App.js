import React, { Component } from 'react';
import './App.css';
import axios from 'axios';   


const apiUrl = 'http://localhost:4000/products';

class App extends Component {
  constructor(){
    super(); 
    this.state= {
      label : ''
    }
  }
  
  handleInputChange = (e)=>{
    this.setState({
      label : e.target.value  
    })
  }
  handleSubmit = (e)=>{ 
    e.preventDefault();
    axios.post( `${apiUrl}/addproduct`,  this.state.label  )
     .then((result) => {
      console.log('success' , result) 
     })
     .catch((err)=>{  
      console.log("err", err ); 
          }); 
  } 
  uploadImage = (e)=>{ 
    var file  =   e.target.files[0];  
    let data = new FormData()
    data.set('file', file); 
    axios.post( `${apiUrl}/file`, data )
     .then((result) => {
      console.log('succeess' , result) 
     })
     .catch((err)=>{ 
       console.log('errr', err )
     });
  } 
  render() {
    return (
      <div className="App"> 
      <form onSubmit={this.handleSubmit}> 
         <p>Product label </p> 
         <input
              type="text"
              placeholder="Label"
              name="label"
              onChange={this.handleInputChange}
              value={this.state.label}
            />
          <p> Upload your file here </p>
          <input type="file" name = "file" onChange= {this.uploadImage}/>
          <button type="submit"> Add product </button>  
      </form>

      </div>
    );
  }
}

export default App;
