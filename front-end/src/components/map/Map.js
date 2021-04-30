import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "./map.css";

import history from "../../JS/history";
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPos: null,
    };
    this.position = [32.8, 35];
    this.iconPerson = new L.Icon({
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(60, 60),
      className: "leaflet-div-icons",
    });
  }

  LocationMarker(iconPerson) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.on("click", function (e) {
          alert(e.latlng);
          setPosition(e.latlng);
          history.push("/addLocation");
        });
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={iconPerson}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  createMarkersList() {
    if (!this.props.locationsInfo.length) {
      return <div></div>;
    }
    let markers = [];
    this.props.locationsInfo.forEach((locationDesc, index) => {
      let position = [locationDesc.longtitude, locationDesc.latitude];
      let icon = new L.Icon({
        iconUrl: "./static/" + locationDesc.images[0].name,
        iconRetinaUrl: "./static/" + locationDesc.images[0].name,
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 60),
        className: "leaflet-div-icons",
      });
      markers.push(
        <Marker position={position} icon={icon} key={index}>
          <Popup>
            <span style={{ height: "1vh" }}>
              {this.props.dictionary[locationDesc.name]}
            </span>
            <button
              className="buttonPopupMarker"
              onClick={() => this.props.locationClicked(locationDesc)}
            >
              לתיאור מפורט
            </button>
          </Popup>
        </Marker>
      );
    });
    markers.reduce((x, y) => x + y);
    return markers;
  }

  render() {
    let editOptions = <div></div>;
    if (this.props.admin.length) {
      editOptions = <this.LocationMarker iconPerson={this.iconPerson} />;
    }
    let markerList = this.createMarkersList();

    return (
      <div id="mapid" className="">
        <div className="locationName">ביחרו מקום</div>
        <MapContainer
          center={this.position}
          zoom={11}
          scrollWheelZoom={true}
          className={"locationsMap"}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markerList}
          {editOptions}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
