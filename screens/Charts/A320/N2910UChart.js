import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Polyline, Svg } from 'react-native-svg';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

class N2910UChart extends Component {

    render () {

        const barEstData    = [1.5, 0.5, 4, 2, 0.5, 6, 1, 0.25, 4, 2, 3, 8, 5, 0, 3, 2, 
                                5, 1, 4, 3, 5, 2, 0.5, 0.5, 9, 12, 8, 2, 0.5, 2, 8, 7, 
                                24, 14, 0.5, 8, 2, 32, 1, 0.5, 40];
        const barN2910UData = [1.5, 0.5, 4.2, 2.25, 0.25, 5.5, 1, 0.35, 3.5, 1, 2, 0, 
                                8, 6, 0, 5.5, 2, 5.5, 1, 4, 3.5, 5.5, 2.5, 1, 0, 15, 0, 
                                8.8, 2, 0.5, 2, 8, 0, 0, 0, 0.5, 0, 33, 2, 0, 0];
        
        const XAxisLabels = ['Aircraft Catch', 'Disconnect Batteries', 'Remove Nacelle Items', 
                            'Defuel Aircraft', 'Open cargo doors', 'Complete post arrival checklist',
                            'Remove portable O2 bottles', 'Remove ELTs', 'Remove slides/rafts',
                            'Remove Electrical Control Devices (batteries)', 'Remove Air Data Modules', 'Remove flap tracks',
                            'Remove flap torque tubes and gearboxes', 'Remove Thrust Reversers', 'Remove Flaperons',
                            'Remove Spoiler Actuation', 'Remove all components from trailing edge of wings', 
                            'Remove flap assemblies', 'Remove flap transmissions', 'Remove slat drive gearboxes and slat arms',
                            'Remove Aileron Actuation', 'Remove Spoilers',
                            'Remove all fuel components accessable w/o tank entry',
                            'Wiper Motors', 'Remove APU GEN', 'Remove Rudder assemblies',
                            'Remove Vertical Leading Edge', 'Remove AC Bay Equipment', 'Remove forward cargo bay door',
                            'Remove aft cargo bay door actuator', 'Remove Ram Air Turbine', 'Remove hydraulic and fuel rotables from LH wheel well',
                            'Remove all exterior lighting including navigation lights', 'Remove Cabin Seating (if necessary)', 'Remove lav assemblies (if necessary)',
                            'Remove Cockpit Emer Ropes, Cabin Interphones, Emer...', 'Remove Passenger Service Units', 'Remove main landing gear assemblies',
                            'Remove Landing Gear door actuation', 'Window cut (ea)', 'Final walkthrough for scrap approval & Scrap Release', 'Crushing & Loading into Bins for Transport'
                        ];
        const yAxisValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];

        const barData = [
            {
                data: barEstData,
                svg: { fill: 'blue' }
            },
            {
                data: barN2910UData,
                svg: { fill: 'red' }
            }
        ]



        return (
            <ScrollView horizontal>
                <View>
                    <Text style={{backgroundColor: 'blue', color: 'white'}}>Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: 'red', color: 'white'}}>N2910U Actual Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#00FF17', color: 'black'}}>Linear Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#FFB600', color: 'black'}}>Linear N2910U Time</Text>
                </View>
                <ScrollView horizontal>
                    
                    <YAxis 
                        style={{height: 330, marginLeft: 16}}
                        svg={{ fill: 'grey', fontSize: 12 }}
                        data={yAxisValues}
                        numberOfTicks={5}    
                    />
                    <BarChart 
                        style={{ height: 350, width: ScreenWidth }}
                        data={ barData }
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.3}
                        xAccessor={ ({ item }) => item.data}
                    >
                        <Grid/>
                        {/* Lines */}
                        <Svg height="350" width={ScreenWidth}>
                            {/* Linear (EST. TIME) */}
                            <Polyline
                                points="0,315 200,300 1000,245"
                                fill="none"
                                stroke="#00FF17"
                                strokeWidth="4"
                            />
                            {/* Linear (N2910U ACTUAL) */}
                            <Polyline
                                points="0,305 200,300 1000,305"
                                fill="none"
                                stroke="#FFB600"
                                strokeWidth="4"
                            />
                        </Svg>
                        <XAxis
                            data={ barData }
                            svg={{
                                fill: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                                textAnchor: 'start',
                                rotation: 90,
                                originY: 20,
                                y: 5,
                                x: 10
                            }}
                            numberOfTicks={ 32 }
                            style={{ height: 500, width: ScreenWidth + 150 }}
                            formatLabel={ (value, index) => XAxisLabels[index] }
                        />
                    </BarChart>
                    
                </ScrollView>

            </ScrollView>

        )

    }
}

const styles = StyleSheet.create({
    labels: {
        flexDirection: 'row',
        width: ScreenWidth
    },
    label: { 
        transform: [
            {rotate: '90deg'},
            {translateY: -30},
            {translateX: 100}
        ], 
        position: 'relative'
    }
})
export default N2910UChart;