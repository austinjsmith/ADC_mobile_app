import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Polyline, Svg } from 'react-native-svg';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

class N351BUChart extends Component {

    render () {
        const barEstData = [0.25, 1, 0.5, 16, 1.5, 10, 8, 2.5, 8, 5.5, 3, 10, 6,
            8, 1.5, 5, 8, 6, 4, 7.5, 2, 1.5, 8, 3, 3.5, 6, 16, 3,
            2.5, 15, 12, 8, 4, 3, 80, 8, 8, 7, 2, 14, 2.5, 32
        ];
        
        const barN351BUData = [0.2, 0, 0.25, 14, 2, 8, 14.5, 4, 0, 16, 0, 16, 0, 0,
                            8, 2, 8, 0, 0, 8, 4, 1, 4, 0, 3, 0, 0, 0, 5, 24, 16, 8, 4, 1, 10, 8, 8, 8, 2, 20, 0, 0
        ]

        const XAxisLabels = ['Pre-arrival meeting', 'Reciept and Inventory of Records', 'Engine Removal Meeting', 'Remove Engines', 'Drain hydraulic reservoirs/depressurize acc.',
                            'Open all fuel access panels', 'Depuddle Aircraft', 'Remove Fire Bottles', 'Remove O2 Generators',
                            'Remove E&E Electronic Boxes (avionics)', 'Remove Transformers and Contractors', 'Remove flap assemblies', 'Remove flap transmissions',
                            'Remove slat drive gearboxes and slat arms', 'Remove Aileron Actuation', 'Remove Spoilers',
                            'Remove all fuel components accessable w/o tank entry', 'Remove canoes', 'Remove carriages from tracks',
                            'Remove Leading Edge Devices (slat, kruger flaps)', 'Remove Ailerons', 'Remove Flaperon Acutation',
                            'Remove all rotables from pylons (coolers, hydraulic, etc)', 'Remove Wingtips-Winglets including nav light', 'Remove APU',
                            'Remove Elevator Actuator', 'Remove Horizontal Edges', 'Remove components from horizontal stabilizer compartment',
                            'Remove fwd cargo bay door actuator', 'Remove all Exterior Probes, Pilot Tubes, Sensors, and Antennas', 'Remove passenger doors (if required)',
                            'Remove hydraulic and fuel rotables from RH wheel well', 'Remove mast drain assemblies', 'Remove cockpit door',
                            'Remove galley assemblies (if required)', 'Remove Flight Att. Seats', 'Remove Galley Equip. (ovens, chillers, etc)', 'Remove nose landing gear assemblies and wheel well rotables',
                            'Remove anti-skid / wheel speed transducers', 'Pax door cut (ea)', 'Flag cut', 'Separation of Wire/Other Precious Metals'
        ];
        const yAxisValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];


        const barData = [
            {
                data: barEstData,
                svg: { fill: 'blue' }
            },
            {
                data: barN351BUData,
                svg: { fill: 'red' }
            }
        ]



        return (
            <ScrollView horizontal>
                <View>
                    <Text style={{backgroundColor: 'blue', color: 'white'}}>Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: 'red', color: 'white'}}>N351BU Actual Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#00FF17', color: 'black'}}>Linear Est. Time</Text>
                    <View style={{flex:0.1}}></View>
                    <Text style={{backgroundColor: '#FFB600', color: 'black'}}>Linear N351BU Time</Text>
                </View>
                <ScrollView horizontal>
                    <YAxis 
                        style={{height: 280, marginLeft: 16}}
                        svg={{ fill: 'grey', fontSize: 12 }}
                        data={yAxisValues}
                        numberOfTicks={10}    
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
                                points="0,285 160,265 1000,195"
                                fill="none"
                                stroke="#00FF17"
                                strokeWidth="4"
                            />
                            {/* Linear (N351BU ACTUAL) */}
                            <Polyline
                                points="0,270 160,265 1000,248"
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
export default N351BUChart;