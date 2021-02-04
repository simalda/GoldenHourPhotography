import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  Circle,
} from "react-leaflet";
import L from "leaflet";

import Button from "./Button";
import history from "../JS/history";

import { DivIcon } from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "test";
    this.state = {
      clickedPos: null,
    };
    this.position = [32.8, 35];
    this.icons = [
      new L.Icon({
        iconUrl: "./static/Pic_01.jpg",
        iconRetinaUrl: "./static/Pic_01.jpg",
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 60),
        className: "leaflet-div-icons",
      }),
      new L.Icon({
        iconUrl: "./static/UnHaifaRahbal.jpg",
        iconRetinaUrl: "./static/UnHaifaRahbal.jpg",
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 60),
        className: "leaflet-div-icons",
      }),
    ];
    this.markerStatesList = [
      [32.704402, 34.935493],
      [32.761082, 35.018606],
    ];
  }

  clicked() {
    history.push("/location");
  }

  LocationMarker(iconPerson) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.on("click", function (e) {
          alert(e.latlng);
          setPosition(e.latlng);
        });
      },
    });

    return position === null ? null : (
      // <div></div>
      <Marker position={position} icon={iconPerson}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  render() {
    var markerList = this.markerStatesList.map((position, index) => (
      <Marker position={position} icon={this.icons[index]} key={index}>
        <Popup>
          <span style={{ height: "1vh" }}>אוניברסיטת חיפה</span>
          <button className="buttonPopupMarker" onClick={() => this.clicked()}>
            לתיאור מפורט
          </button>
        </Popup>
      </Marker>
    ));
    markerList.reduce((x, y) => x + y);
    return (
      <div id="mapid" className="mainDiv">
        <div className="locationName">ביחרו מקום</div>
        <MapContainer center={this.position} zoom={11} scrollWheelZoom={true}>
          <TileLayer
            // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={this.position} icon={this.iconPerson}>
            <Popup>
              שם המקום
              <button onClick={() => this.clicked()}>לתיאור מפורט</button>
            </Popup>
          </Marker> */}
          {markerList}
          <this.LocationMarker iconPerson={this.iconPerson} />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
