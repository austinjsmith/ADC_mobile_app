import React, {Component} from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';


export default class IPCScreen extends Component{

    render(){
        return (
            <WebView source={{uri: 'https://drive.google.com/drive/u/3/folders/1cydJ6x_iPc3PH7uBnY9mvSKof281QDgD'}}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});