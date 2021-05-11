/* global PhotoSphereViewer */
import React, { Component } from "react";
import * as PhotosphereViewer from "photo-sphere-viewer";

import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

import ImageLinkerHandler from "../JS/ImageLinkerHandler";
import lisa from "../static/photos/galery/pic_18.jpg";
// import zvezda from "../static/photos/zvezda.jpg";
// import atlit from "../static/photos/photo_sphere/Atlit_Panorama.jpg";
class D3images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panorama:
        "./static/" + this.props.locationDescription.sphereImageList[0].name,
      image: this.props.locationDescription.sphereImageList[0],
      markers: [],
    };
    this.divStyle = {
      width: "100vw",
      height: "70vh",
    };
  }

  componentDidMount() {
    this.createMarkers();
    this.viewer = new PhotosphereViewer.Viewer({
      navbar: false,
      container: document.querySelector("#viewer"),
      panorama: this.state.panorama,

      plugins: [
        [
          PhotoSphereViewer.MarkersPlugin,
          {
            markers: [
              ...this.state.markers,
              {
                id: "new-marker",
                longitude: "45deg",
                latitude: "0deg",
                width: 100,
                height: 100,
                image: lisa,
                className: "imageMarker",
                tooltip: "Adam. <b>Click me!</b>",
              },
              {
                // circle marker
                id: "circle",
                circle: 20,
                height: 30,
                x: 0.3,
                y: 0.2,
                tooltip: "A circle marker",
                className: "imageMarker",
              },
            ],
          },
        ],
      ],
    });

    const markersPlugin = this.viewer.getPlugin(
      PhotoSphereViewer.MarkersPlugin
    );
    if (this.props.admin.length !== 0) {
      this.viewer.on("click", (e, data) => {
        console.log(
          `${data.rightclick ? "right clicked" : "clicked"} at longitude: ${
            data.longitude
          } latitude: ${data.latitude}`
        );
      });
    }
    // markersPlugin.on("select-marker", (e, marker) => {
    //   markersPlugin.updateMarker({
    //     id: marker.id,
    //     image: lisa,
    //   });  });
    markersPlugin.on("select-marker", (e, marker) => this.TestClick(e, marker));

    // viewer.on("click", (marker) => {
    //   if (marker.id === "imageLisa") {
    //     viewer.setPanorama(lisa, null, true);
    //   }
    // });
  }
  createMarkers() {
    const linkHandler = new ImageLinkerHandler();
    linkHandler.getAllLinksToImage(this.state.image).then((connections) => {
      const markers = connections.map((connection) => ({
        id: connection.destination,
        longitude: connection.longitude,
        latitude: connection.latitude,
        image: "./static/" + connection.destination,
        width: 62,
        height: 62,
        tooltip: {
          content: "Click, to see that location",
          position: "bottom center",
        },
        className: "imageMarker",
      }));
      this.setState({
        markes: markers,
      });
    });
  }

  componentDidUpdate() {
    this.viewer.setPanorama(this.state.panorama, undefined, true);
  }

  TestClick(e, marker) {
    console.log(`Cursor is over marker ${marker.config.image}`);
    this.setState({
      panorama: marker.config.image,
    });
  }
  render() {
    return <div style={this.divStyle} id="viewer"></div>;
  }
}

export default D3images;
