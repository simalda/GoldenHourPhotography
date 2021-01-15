import React, { Component } from "react";
import * as PhotosphereViewer from "photo-sphere-viewer";
import { MarkersPlugins } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

import more from "../static/photos/Homepage+LEI.jpg";
import lisa from "../static/photos/galery/pic_18.jpg";
import face from "../static/photos/cuts/facebook.svg";
import zvezda from "../static/photos/zvezda.jpg";

class D3images extends Component {
  constructor(props) {
    super(props);
    this.state ={
      panorama:more
    }
    this.divStyle = {
      width: "100vw",
      height: "50vh",
    };
 
  }

  componentDidMount() {
    this.viewer = new PhotosphereViewer.Viewer({
      container: document.querySelector("#viewer"),
      panorama: this.state.panorama,
  

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
                image: zvezda,
                width: 62,
                height: 62,
                // anchor: "bottom center",
                tooltip: {content :"Sofa. <b>Click me!</b>",
                          position: "bottom center"
              },
              // content: document.getElementById('lorem-content').innerHTML,
                className: "imageMarker"
                },           
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
                height:30,
                x: 0.3,
                y: 0.2,
                tooltip: "A circle marker",
                className: "imageMarker"
              },
            ],
          },
        ],
      ],
    });

  

    const markersPlugin = this.viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);

    // markersPlugin.on("select-marker", (e, marker) => {
    //   markersPlugin.updateMarker({
    //     id: marker.id,
    //     image: lisa,
    //   });  });
      markersPlugin.on('select-marker', (e, marker)=> this.TestClick(e, marker))
  

    // viewer.on("click", (marker) => {
    //   if (marker.id === "imageLisa") {
    //     viewer.setPanorama(lisa, null, true);
    //   }
    // });
  }

  componentDidUpdate(){
    this.viewer.setPanorama(this.state.panorama, undefined, true)      
  }

TestClick(e, marker) {  
    console.log(`Cursor is over marker ${marker.config.image}`);
    this.setState({
      panorama:marker.config.image
    })
   
}
  render() {
    return <div style={this.divStyle} id="viewer"></div>;
  }
}

export default D3images;
