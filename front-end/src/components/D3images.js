import React, { Component } from "react";
import * as PhotosphereViewer from "photo-sphere-viewer";
import { MarkersPlugins } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

import more from "../static/photos/Homepage+LEI.jpg";
import lisa from "../static/photos/galery/pic_18.jpg";
import face from "../static/photos/cuts/facebook.svg";

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
    const viewer = new PhotosphereViewer.Viewer({
      container: document.querySelector("#viewer"),
      panorama: more,
      // navbar: [
      //   "autorotate",
      //   "zoom",
      //   {
      //     id: "my-button",
      //     content: "Custom",
      //     title: "Hello world",
      //     className: "custom-button",
      //     onClick: () => {
      //       alert("Hello from custom button");
      //     },
      //   },
      //   "caption",
      //   "fullscreen",
      // ],

      plugins: [
        [
          PhotoSphereViewer.MarkersPlugin,
          {
            markers: [
              {
                // image marker that opens the panel when clicked
                id: "imageLisa",
                longitude: 0.32,
                latitude: 0.11,
                image: lisa,
                width: 62,
                height: 62,
                anchor: "bottom center",
                tooltip: "A image marker. <b>Click me!</b>",
                // content: document.getElementById("lorem-content").innerHTML,
              },

              {
                // image marker that opens the panel when clicked
                id: "image2",
                longitude: 0.3,
                latitude: 0.12,
                image: face,
                width: 62,
                height: 62,
                anchor: "bottom center",
                tooltip: "A image marker. <b>Click me!</b>",
                backgroundColor: "black",
                // content: document.getElementById("lorem-content").innerHTML,
              },
              {
                id: "new-marker",
                longitude: "45deg",
                latitude: "0deg",
                width: "20px",
                height: "100px",

                image: lisa,
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
        image: lisa,
      });
    });
    // viewer.on("click", function (e, data) {
    //   if (!data.rightclick) {
    //     markersPlugin.addMarker({
    //       id: "#" + Math.random(),
    //       longitude: data.longitude,
    //       latitude: data.latitude,
    //       image: lisa,
    //       width: 62,
    //       height: 62,
    //       anchor: "center",
    //       tooltip: "Generated pin",
    //       data: {
    //         generated: true,
    //       },
    //     });
    //   }
    // });
    viewer.on("click", (marker) => {
      if (marker.id === "imageLisa") {
        viewer.setPanorama(lisa, null, true);
      }
    });
  }

  render() {
    return <div style={this.divStyle} ref={this.sphereDiv} id="viewer"></div>;
  }
}

export default D3images;
