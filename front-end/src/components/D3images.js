import React, { Component } from "react";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugins } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

import zvezda from "../static/photos/Homepage+LEI.jpg";

class D3images extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      width: "100vw",
      height: "50vh",
    };
    this.sphereDiv = (element) => {
      this.photoSphereViewer = element;
    };
    this.sphereDiv.appendChild = (elem) => {
      this.subDiv.appendChild(elem);
    };
  }

  componentDidMount() {
    const viewer = new Viewer({
      container: document.querySelector("#viewer"),
      panorama: zvezda,
      navbar: [
        "autorotate",
        "zoom",
        {
          id: "my-button",
          content: "Custom",
          title: "Hello world",
          className: "custom-button",
          onClick: () => {
            alert("Hello from custom button");
          },
        },
        "caption",
        "fullscreen",
      ],
      plugins: [
        [
          PhotoSphereViewer.MarkersPlugin,
          {
            // list of markers
            markers: [
              {
                // image marker that opens the panel when clicked
                id: "image",
                longitude: 0.32,
                latitude: 0.11,
                image: "https://photo-sphere-viewer.js.org/assets/pin-blue.png",
                width: 32,
                height: 32,
                anchor: "bottom center",
                tooltip: "A image marker. <b>Click me!</b>",
                //   content: document.getElementById('lorem-content').innerHTML
              },
              {
                id: "new-marker",
                longitude: "45deg",
                latitude: "0deg",
                image: "assets/pin-red.png",
              },
              {
                // html marker with custom style
                id: "text",
                longitude: 0,
                latitude: 0,
                html: "HTML <b>marker</b> &hearts;",
                anchor: "bottom right",
                scale: [0.5, 1.5],
                style: {
                  maxWidth: "100px",
                  color: "white",
                  fontSize: "20px",
                  fontFamily: "Helvetica, sans-serif",
                  textAlign: "center",
                },
                tooltip: {
                  content: "An HTML marker",
                  position: "right",
                },
              },
              {
                // polygon marker
                id: "polygon",
                polylineRad: [
                  [6.2208, 0.0906],
                  [0.0443, 0.1028],
                  [0.2322, 0.0849],
                  [0.4531, 0.0387],
                  [0.5022, -0.0056],
                  [0.4587, -0.0396],
                  [0.252, -0.0453],
                  [0.0434, -0.0575],
                  [6.1302, -0.0623],
                  [6.0094, -0.0169],
                  [6.0471, 0.032],
                  [6.2208, 0.0906],
                ],
                svgStyle: {
                  fill: "rgba(200, 0, 0, 0.2)",
                  stroke: "rgba(200, 0, 50, 0.8)",
                  strokeWidth: "2px",
                },
                tooltip: {
                  content: "A dynamic polygon marker",
                  position: "right bottom",
                },
              },
              {
                // polyline marker
                id: "polyline",
                polylinePx: [
                  2478,
                  1635,
                  2184,
                  1747,
                  1674,
                  1953,
                  1166,
                  1852,
                  709,
                  1669,
                  301,
                  1519,
                  94,
                  1399,
                  34,
                  1356,
                ],
                svgStyle: {
                  stroke: "rgba(140, 190, 10, 0.8)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "10px",
                },
                tooltip: "A dynamic polyline marker",
              },
              {
                // circle marker
                id: "circle",
                circle: 20,
                x: 2500,
                y: 1000,
                tooltip: "A circle marker",
              },
            ],
          },
        ],
      ],
    });
    const markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);

    markersPlugin.on("select-marker", (e, marker) => {
      markersPlugin.updateMarker({
        id: marker.id,
        image: "assets/pin-blue.png",
      });
    });
  }

  render() {
    return <div style={this.divStyle} ref={this.sphereDiv} id="viewer"></div>;
  }
}

export default D3images;
