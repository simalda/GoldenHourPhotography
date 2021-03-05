import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// import Button from "../Button";
// import history from "../../JS/history";

// import { DivIcon } from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPos: null,
    };
    this.position = [32.8, 35];
    // this.icons = [
    //   new L.Icon({
    //     iconUrl: "./static/Pic_01.jpg",
    //     iconRetinaUrl: "./static/Pic_01.jpg",
    //     iconAnchor: [22, 94],
    //     popupAnchor: [-3, -76],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null,
    //     iconSize: new L.Point(60, 60),
    //     className: "leaflet-div-icons",
    //   }),
    //   new L.Icon({
    //     iconUrl: "./static/UnHaifaRahbal.jpg",
    //     iconRetinaUrl: "./static/UnHaifaRahbal.jpg",
    //     iconAnchor: [22, 94],
    //     popupAnchor: [-3, -76],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null,
    //     iconSize: new L.Point(60, 60),
    //     className: "leaflet-div-icons",
    //   }),
    // ];
    // this.markerStatesList = [
    //   [32.704402, 34.935493],
    //   [32.761082, 35.018606],
    // ];
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
    let editoptions = <div></div>;
    if (this.props.admin) {
      editoptions = <this.LocationMarker iconPerson={this.iconPerson} />;
    }
    let markerList = this.createMarkersList();

    return (
      <div id="mapid" className="mainDiv">
        <div className="locationName">ביחרו מקום</div>
        <MapContainer
          center={this.position}
          zoom={11}
          scrollWheelZoom={true}
          className={"locationsMap"}
        >
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
          {editoptions}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
