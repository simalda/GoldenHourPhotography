import React from "react";
import history from "../../JS/history";
import * as dateManager from "../../JS/dateManipulations";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import classes from "./endPage.module.scss";
class EndPage extends React.Component {
  constructor(props) {
    super(props);
    this.position = [
      this.props.locationDescription.longitude,
      this.props.locationDescription.latitude,
    ];
  }

  clicked() {
    history.push("/location");
  }

  render() {
    const hebrewDate = dateManager.hebrewDate(this.props.order.date);
    return (
      <div className={classes.endPage}>
        <div className="locationName">נתראה בצילומים</div>

        <div className="">
          <div id="mapid">
            <MapContainer
              center={this.position}
              zoom={16}
              scrollWheelZoom={true}
              className={classes.endMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={this.position}></Marker>
            </MapContainer>
          </div>
          <div className={classes.vase}>
            {this.props.dictionary[this.props.order.location]}
          </div>
        </div>
        <div className={classes.endPageDate}>
          <div className={classes.endPageDateHeader}>
            {hebrewDate.dateString}
          </div>
          <div>
            <span>{this.props.order.time} </span>שעה
          </div>
        </div>
        <div className={classes.endPageRecomendations}>
          <div style={{ textAlign: "right" }}>
            לבוש מותאם בצבאעים ואחיד, להשתדל לא ללבוש בגדים עם טקסטורות ופסים
          </div>
          <div style={{ textAlign: "right" }}>
            כדאי להביא אקססוריז מגניבים כמו כובעים, פרחים ועוד..
          </div>
        </div>
        <div className={classes.endPageWatsap}>
          <div>להמלצות ביגוד זמינה בוואצאפ</div>
          <div>קטי 0524550656</div>
        </div>
      </div>
    );
  }
}

export default EndPage;
