import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Polyline, Svg } from 'react-native-svg';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

class N4911UChart extends Component {

    render () {
        const barEstData = [0.25, 1, 0.5, 16, 1.5, 10, 8, 2.5, 0, 4.5, 3, 5, 1,
            4, 3, 5,  2, 4, 4, 4, 4, 0, 4, 2, 3.5, 4, 12, 4,
            0.5, 7, 12, 8, 4, 3, 16, 4, 6, 8, 0.5, 14, 2.5, 16
        ];
        const barN4911UData = [0.25, 0, 0.25, 13.25, 1, 0, 7.5, 1.75, 0, 4.5, 4, 5.5, 1,
            4, 1, 5.5, 2, 6, 0, 5, 3.5, 0, 2, 0.5, 3.4, 3, 0, 8,
            1, 10, 8, 8, 3, 2, 0, 3, 2, 7.8, 0.75, 13, 0, 0
        ];
        const XAxisLabels = ['Pre-arrival meeting', 'Reciept and Inventory of Records', 'Engine Removal Meeting', 'Remove Engines', 'Drain hydraulic reservoirs/depressurize acc.',
                            'Open all fuel access panels', 'Depuddle Aircraft', 'Remove Fire Bottles', 'Remove O2 Generators',
                            'Remove E&E Electronic Boxes (avionics)', 'Remove Transformers and Contractors', 'Remove flap assemblies', 'Remove flap transmissions',
                            'Remove slat drive gearboxes and slat arms', 'Remove Aileron Actuation', 'Remove Spoilers',
                            'Remove all fuel components accessable w/o tank entry', 'Remove canoes', 'Remove carriages from tracks',
                            'Remove Leading Edge Devices (slat, kruger flaps)', 'Remove Ailerons', 'Remove Flaperon Acutation',
                            'Remove all rotables from pylons (coolers, hydraulic, etc)', 'Remove Wingtips-Winglets', 'Remove APU',
                            'Remove Elevator Actuator', 'Remove Horizontal Edges', 'Remove components from horizontal stabilizer compartment',
                            'Remove fwd cargo bay door actuator', 'Remove all Exterior Probes, Pilot Tubes, Sensors, and Antennas', 'Remove passenger doors (if required)',
                            'Remove hydraulic and fuel rotables from RH wheel well', 'Remove mast drain assemblies', 'Remove cockpit door',
                            'Remove galley assemblies (if required)', 'Remove Flight Att. Seats', 'Remove Galley Equip. (ovens, chillers, etc)', 'Remove nose landing gear assemblies and wheel well rotables',
                            'Remove anti-skid / wheel speed transducers', 'Pax door cut (ea)', 'Flag cut', 'Separation of Wire/Other Precious Metals'
        ];
        const yAxisValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];


        const barData = [
            {
                data: barEstData,
                svg: { fill: 'blue' }
            },
            {
                data: barN4911UData,
                svg: { fill: 'red' }
            }
        ]



        return (
            <ScrollView horizontal>
                <View>
                    <Text style={{backgroundColor: 'blue', color: 'white'}}>Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: 'red', color: 'white'}}>N4911U Actual Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#00FF17', color: 'black'}}>Linear Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#FFB600', color: 'black'}}>Linear N4911U Time</Text>
                </View>
                <ScrollView horizontal>
                    
                    <YAxis 
                        style={{height: 280, marginLeft: 16}}
                        svg={{ fill: 'grey', fontSize: 12 }}
                        data={yAxisValues}
                        numberOfTicks={5}    
                    />
                    <BarChart 
                        style={{ height: 300, width: ScreenWidth }}
                        data={ barData }
                        contentInset={{ top: 20, bottom: 20 }}
                        spacingInner={0.3}
                        xAccessor={ ({ item }) => item.data}
                    >
                        <Grid/>
                        {/* Lines */}
                        <Svg height="300" width={ScreenWidth}>
                            {/* Linear (EST. TIME) */}
                            <Polyline
                                points="0,275 1000,200"
                                fill="none"
                                stroke="#00FF17"
                                strokeWidth="4"
                            />
                            {/* Linear (N4911U ACTUAL) */}
                            <Polyline
                                points="0,275 1000,170"
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
                            style={{ height: 500, width: ScreenWidth + 150}}
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
export default N4911UChart;