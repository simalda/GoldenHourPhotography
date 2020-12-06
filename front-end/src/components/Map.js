import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import Button from "./Button";
import history from "../JS/history";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "test";

    // this.position = [51.505, -0.09];
    this.position = [32.8, 35];
  }

  clicked() {
    history.push("/location");
  }

  render() {
    return (
      <div id="mapid" className="mainDiv">
        <div className="locationName">ביחרו מקום</div>
        <MapContainer center={this.position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.position}>
            <Popup>
              <button onClick={() => this.clicked()}>
                A pretty CSS3 popup. <br /> Easily customizable.
              </button>
            </Popup>
          </Marker>
        </MapContainer>
        S:K SOFA
        <Button buttonText={this.buttonText} clicked={() => this.clicked()} />
      </div>
    );
  }
}

export default Map;
