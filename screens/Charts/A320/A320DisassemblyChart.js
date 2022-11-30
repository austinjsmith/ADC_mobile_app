import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class A320DisassemblyChart extends Component {

    render() {

        const EstTime = [3.75, 25.75, 29.25, 11.5, 14, 64, 64, 2, 63, 77, 108, 52.5, 46, 60.5]
            .map((value) => ({ value }))
        const N2910U = [2.7, 18.7, 17.45, 9.65, 12.5, 57.5, 59, 3, 42.4, 70.3, 6, 53.55, 13, 0.5]
            .map((value) => ({ value }))
        const N4912U = [2.75, 17.5, 16.05, 12.35, 13.5, 48, 46.5, 3.5, 31.3, 64.7, 21, 50.25, 0, 0]
            .map((value) => ({ value }))
        const N1913U = [1.95, 16.25, 11.8, 2.5, 2, 8, 8, 0, 4, 0, 0, 0, 0, 0]
            .map((value) => ({ value }))
        const N4911U = [1.65, 11.5, 4,  3.25, 2.25, 7, 9, 0, 4, 0, 0, 0, 0, 0]
            .map((value) => ({ value }))
        const N1914U = [1.55, 20.75, 16.25, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0]
            .map((value) => ({ value }))

        const barData = [
            {
                data: EstTime,
                svg: {
                    fill: 'rgb(77, 135, 125)',
                },
            },
            {
                data: N2910U,
                svg: {
                    fill: 'rgb(61, 161, 114)',
                },
            },
            {
                data: N4912U,
                svg: {
                    fill: 'rgb(84, 206, 222)',
                },
            },
            {
                data: N1913U,
                svg: {
                    fill: 'rgb(212, 255, 153)',
                },
            },
            {
                data: N4911U,
                svg: {
                    fill: 'rgb(75, 255, 140)',
                },
            },
            {
                data: N1914U,
                svg: {
                    fill: 'rgb(8, 169, 180)',
                },
            },
        ]

        const tableData = [
            [3.75, 25.75, 29.25, 11.5, 14, 64, 64, 2, 63, 77, 108, 52.5, 46, 60.5],
            [2.7, 18.7, 17.45, 9.65, 12.5, 57.5, 59, 3, 42.4, 70.3, 6, 53.55, 13, 0.5],
            [2.75, 17.5, 16.05, 12.35, 13.5, 48, 46.5, 3.5, 31.3, 64.7, 21, 50.25, 0, 0],
            [1.95, 16.25, 11.8, 2.5, 2, 8, 8, 0, 4, 0, 0, 0, 0, 0],
            [1.65, 11.5, 4,  3.25, 2.25, 7, 9, 0, 4, 0, 0, 0, 0, 0],
            [1.55, 20.75, 16.25, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0]
        ]

        return (
            <ScrollView horizontal>
                <View>
                    <BarChart
                        style={ { height: 500, width: 3200 } }
                        data={ barData }
                        yAccessor={({ item }) => item.value}
                        svg={{
                            fill: 'green',
                        }}
                        spacingInner={0.5}
                        spacingOuter={0.85}
                        { ...this.props }
                    >
                        <Grid/>
                    </BarChart>
                    <Table borderStyle={{borderWidth: 1}}>
                        <Row data={['',
                                    'Arrival', 
                                    'Engine Removals', 
                                    'Quarantine', 
                                    'Phase 1\n Emer equipment removal', 
                                    'Phase 2\n Avionic system removal', 
                                    'Phase 3\n Left Wing', 
                                    'Phase 4\n Right Wing', 
                                    'Phase 5\n Nose', 
                                    'Phase 6\n Tail', 
                                    'Phase 7\n Exterior Fuselage', 
                                    'Phase 8\n Interior', 
                                    'Phase 9\n Landing Gear Removal', 
                                    'Phase 10\n Specialty Cuts', 
                                    'Phase 11\n Demolition']}
                            style={styles.head}
                            textStyle={styles.text}
                            widthArr={[170, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]}
                        />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={['Est. Time (hr)', 'N2910U Actual Time', 'N4912U Actual Time', 'N1913U Actual Time', 'N4911U Actual Time', 'N1914U Actual Time']} 
                                 style={styles.title}
                                 width={170}
                                 heightArr={[28,28,28,28,28,28]}
                                 />
                            <Rows data={tableData} style={styles.row} textStyle={styles.text} widthArr={[200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]}/>
                        </TableWrapper>
                    </Table>
                    <View style={{flexDirection: 'row', padding: 20}}>
                        <View style={{ backgroundColor: 'rgb(77, 135, 125)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> Est. Time</Text>
                        <View style={{ backgroundColor: 'rgb(61, 161, 114)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> N2910U Actual Time</Text>
                        <View style={{ backgroundColor: 'rgb(84, 206, 222)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> N4912U Actual Time</Text>
                        <View style={{ backgroundColor: 'rgb(212, 255, 153)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> N1913U Actual Time</Text>
                        <View style={{ backgroundColor: 'rgb(75, 255, 140)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> N4911U Actual Time</Text>
                        <View style={{ backgroundColor: 'rgb(8, 169, 180)', width: 10, height: 10, flex: 0}}/>
                        <Text style={{paddingRight: 20}}> N1914U Actual Time</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
});

export default A320DisassemblyChart;