/* global PhotoSphereViewer */
import React, { Component } from "react";
import * as PhotosphereViewer from "photo-sphere-viewer";

import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

import ImageLinker from "../JS/ImageLinker";
class D3images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.divStyle = {
      width: "100vw",
      height: "70vh",
    };
  }

  componentDidMount() {
    const markers = this.createMarkers();
    this.viewer = new PhotosphereViewer.Viewer({
      navbar: false,
      container: document.querySelector("#viewer"),
      panorama: this.props.panorama.path,

      plugins: [
        [
          PhotoSphereViewer.MarkersPlugin,
          {
            markers: [...markers],
          },
        ],
      ],
    });

    const markersPlugin = this.viewer.getPlugin(
      PhotoSphereViewer.MarkersPlugin
    );
    if (!this.props.admin.length) {
      markersPlugin.on("select-marker", (e, marker) =>
        this.changePanorama(e, marker)
      );
    } else if (this.props.admin.length) {
      this.viewer.on("click", (e, data) => {
        console.log(
          `${data.rightclick ? "right clicked" : "clicked"} at longitude: ${
            data.longitude
          } latitude: ${data.latitude}`
        );
        const linker = new ImageLinker(
          this.props.panorama.name,
          "",
          "",
          data.latitude,
          data.longitude
        );
        this.props.openDestinations(linker);
      });
      markersPlugin.on("select-marker", (e, marker) => {
        const splitPath = marker.config.image.split("/");
        const imName = splitPath[splitPath.length - 1];
        const linker = new ImageLinker(
          this.props.panorama.name,
          imName,
          marker.config.image,
          marker.props.position.latitude,
          marker.props.position.longitude
        );
        this.props.openDestinations(linker);
      });
    }
  }

  createMarkers() {
    return this.props.connections.map((connection) => ({
      id: connection.destination,
      longitude: connection.longitude,
      latitude: connection.latitude,
      image: connection.destinationImagePath,
      width: 62,
      height: 62,
      tooltip: {
        content: "Click, to see that location",
      },
      className: "imageMarker",
    }));
  }

  componentDidUpdate() {
    this.viewer.setPanorama(this.props.panorama.path, undefined, true);
    this.viewer.plugins.markers.setMarkers(this.state.markers);
  }

  changePanorama(e, marker) {
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
