import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
class M  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()};
    }
    
    onChange(ev){
         console.log(ev);
            // this.setState({
            //   date: new Date()
            // })
    }
 
    render(){
        // const [value, onChange] = useState(new Date());
        return (
          <div>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
            />
          </div>
        );}
}
 
export default M;