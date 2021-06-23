import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "./map.css";

function MapJSX(props) {
  let position = [32.8, 35];
  let iconPerson = new L.Icon({
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
    className: "leaflet-div-icons",
  });

  let markerList = createMarkersList(props);

  return (
    <div id="mapid" className="">
      {/* <div className="locationName">ביחרו מקום</div> */}
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        className={"locationsMap"}
        onClick={(e) => props.addLocation(props, e)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markerList}
        <LocationMarker
          admin={props.admin}
          iconPerson={iconPerson}
          addLocation={(locationName, e) => props.addLocation(locationName, e)}
        />
      </MapContainer>
    </div>
  );
}

export default MapJSX;

function LocationMarker(props) {
  if (props.admin.length) {
    const map = useMapEvents({
      click() {
        map.on("click", function (e) {
          alert(e.latlng);
          let locationName = prompt("Please enter name of location:", "");
          while (locationName === "") {
            locationName = prompt("Name of location can't be empty:", "");
          }
          if (locationName !== null) {
            props.addLocation(locationName, e.latlng);
          }
        });
      },
    });
  }
  return <></>;
}

function createMarkersList(props) {
  if (!props.locationsInfo.length) {
    return <div></div>;
  }
  let markers = [];
  props.locationsInfo.map((locationDesc, index) => {
    if (
      locationDesc.regularImageList !== undefined &&
      locationDesc.regularImageList.length > 0
    ) {
      let position = [locationDesc.longitude, locationDesc.latitude];
      let icon = new L.Icon({
        iconUrl: locationDesc.regularImageList[0].path,
        iconRetinaUrl: locationDesc.regularImageList[0].path,
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
            <div style={{ paddingTop: "5vh" }}>
              <span style={{ height: "1vh", fontSize: "2vh" }}>
                {locationDesc.name}
              </span>
              <button
                className="buttonPopupMarker"
                onClick={() => props.locationClicked(locationDesc)}
              >
                לתיאור מפורט
              </button>
            </div>
          </Popup>
        </Marker>
      );
    }
  });
  markers.reduce((x, y) => x + y);
  return markers;
}
