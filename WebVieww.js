import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebVieww = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://www.google.com/search?q=tutorialspoint&cad=h",
        }}
      />
    </View>
  );
};
export default WebVieww;

const styles = StyleSheet.create({
  container: {
    height: 350,
  },
});
