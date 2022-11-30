import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//custom hooks
import TaskCardForm from '../../components/forms/EditTaskCardForm';

class EditTaskCardsScreen extends Component {
        
    render() {
        const help = (event) => {
            Alert.alert('To edit a task card, please fill in the registration and job name sections.\nWhen you make the necessary changes, press the submit button at the bottom.', 
                'If you have an issue or any other questions. Please contact Austin Smith (austin.smith@uaminc.com).',
                [
                    {text: 'Got it!'}
                ]
            );
        }

        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', paddingLeft: 30}}>
                    <View style={{flex:1}}>
                        {/* UAM LOGO */}
                        <Image 
                            source={
                                require('../../assets/Images/UAM_logo.png')
                            }
                            style={styles.logo}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity 
                            onPress={help}
                            style={styles.helpButton}
                        >
                            <Text style={{fontSize: 20}}>Help</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
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
    },
    helpButton: {
        backgroundColor: '#d4eefc',
        alignItems: 'center',
        padding: 10,
        marginEnd: 50,
        borderRadius: 10,
        justifyContent: 'flex-end'
      },
})

export default EditTaskCardsScreen;