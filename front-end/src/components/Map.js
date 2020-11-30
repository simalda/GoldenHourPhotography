import React, { Component } from 'react';
import { MapContainer , Marker, Popup, TileLayer } from "react-leaflet";
 
class Map extends React.Component {
    constructor(props) {
        super(props);    
        this.position = [51.505, -0.09]  
         
   }
   
   
        
   render(){
       return <div id="mapid">
     <MapContainer  center={this.position} zoom={13} scrollWheelZoom={false}>
       <TileLayer
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
       <Marker position={this.position}>
         <Popup>
           A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
       </Marker>
     </MapContainer>S:K SOFA</div>
   }
}
 
export default Map;