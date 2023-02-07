import React, { Component } from "react";
import { ScrollView, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from "@paraboly/react-native-card";

class ListTaskCardsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reg: null,
            cards: []
        }
    }

    getTaskCards(reg) {
        let data = [];

        fetch(`${global.route}/taskcardinfo/${reg}/get/all`)
            .then(response => response.json())
            .then(values => {
                for (let i = 0; i < values.length; ++i) {

                    let entry = {};
                    entry['title'] = values[i].job_name;
                    entry['description'] = values[i].description;
                    entry['employee'] = values[i].assigned_to;
                    entry['phase'] = values[i].phase;
                    // entry['completed_by'] = values[i].completed_by;
                    entry['time'] = values[i].time

                    data.push(entry);
                }

                this.setState({cards: data});

            })
            .catch(function(error) {
              console.error(error);
              alert('Error getting tasks. Make sure the registration is correct.\n Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
            })
    }

    floatToTime(float) {

        // Separate the int from the decimal part
        var hour = Math.floor(float);
        var dec = float - hour;

        var min = 1 / 60;
        // Round to nearest minute
        dec = min * Math.round(dec / min);

        var minute = Math.floor(dec * 60) + '';

        // Add padding if need
        if (minute.length < 2) {
            minute = '0' + minute; 
        }

        // Concate hours and minutes
        var time = hour + ':' + minute;

        return time;
    }

    render() {

        return (
            <ScrollView>
                <TextInput 
                    placeholder="Enter registration to see tasks"
                    value={this.state.reg}
                    style={styles.input}
                    onEndEditing={(value) => this.getTaskCards(value.nativeEvent.text)}
                />

                {this.state.cards.map(value =>{

                if (value.time) // if task was completed have the card be checked off
                    {
                        return <Card 
                                iconName="check"
                                iconType="Entypo"
                                title={value.title}
                                description={`Time: ${this.floatToTime(value.time)}`}
                                bottomRightText={`Assigned to: ${value.employee}`}
                                style={styles.card}
                            />
                    }
                    else { // if task is incomplete
                        return <Card 
                                    iconDisable
                                    title={value.title}
                                    description={value.description}
                                    bottomRightText={`Assigned to: ${value.employee}`}
                                    style={styles.card}
                                />
                    }
                })}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        height: 40,
        margin: 12,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'gray'
    },
    card: {
    }
})

export default ListTaskCardsScreen;