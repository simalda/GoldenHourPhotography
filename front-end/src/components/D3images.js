import React from "react";
import { AppRegistry, asset, StyleSheet, Pano, Text, View } from "react-vr";

import D3 from '../static/photos/zvezda.jpg'

class D3images extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset({D3})} />
        <Text
          style={{
            backgroundColor: "blue",
            padding: 0.02,
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }]
          }}
        >
          hello
        </Text>
      </View>
    );
  }
}

export default D3images;