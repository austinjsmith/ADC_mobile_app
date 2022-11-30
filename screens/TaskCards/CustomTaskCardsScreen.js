import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
//custom hooks
import TaskCardForm from '../../components/forms/TaskCardForm';

class CustomTaskCardsScreen extends Component {
        
    render() {

        return (
            <View style={{backgroundColor: 'white'}}>
                <Image 
                    source={
                        require('../../assets/Images/UAM_logo.png')
                    }
                    style={styles.logo}
                />
                <TaskCardForm />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    demoImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: window.width-100,
        height: window.height-100
    },
    logo: {
        width: 200,
        height: 50
    },
    section1: {
        marginLeft: 10
    }
})

export default CustomTaskCardsScreen;