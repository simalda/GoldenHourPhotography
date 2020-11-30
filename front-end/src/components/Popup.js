import React, { useState } from 'react';
 
 
class Popup  extends React.Component {
    constructor(props) {
        super(props)
         
    }
   
    render(){
        return (
          <div>
            <button onClick = {this.props.onClick}>12:00 - 14:00</button>
          </div>
        );}
}
 
export default Popup;