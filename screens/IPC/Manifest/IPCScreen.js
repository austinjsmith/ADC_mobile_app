import React, { Component } from "react";
import { View, StyleSheet, Webview } from 'react-native';

class IPCScreen extends Component {
    render(){
        return <Webview source={{uri: 'https://drive.google.com/file/d/1L_M5g2W1ripEnTQPXJDvweo_LOM8x2eA/view?usp=sharing'}}/>
    }
}

export default IPCScreen;