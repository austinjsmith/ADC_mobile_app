import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class B777_B747Chart extends Component {

    render() {

        const EstTime = [5.5, 27.75, 29.25, 19.5, 16, 100.5, 100.5, 4, 89, 141, 359, 73.5, 54, 100.5]
            .map((value) => ({ value }))
        const N351BU = [4.2, 18.7, 29.45, 12.75, 25, 77, 77, 2, 3.5, 88, 41, 71, 20, 0]
            .map((value) => ({ value }))

        const barData = [
            {
                data: EstTime,
                svg: {
                    fill: 'rgb(77, 135, 125)',
                },
            },
            {
                data: N351BU,
                svg: {
                    fill: 'rgb(61, 161, 114)',
                },
            },

        ]

        const tableData = [
            [5.5, 27.75, 29.25, 19.5, 16, 100.5, 100.5, 4, 89, 141, 359, 73.5, 54, 100.5],
            [4.2, 18.7, 29.45, 12.75, 25, 77, 77, 2, 3.5, 88, 41, 71, 20, 0]
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
                        spacingOuter={1.5}
                        contentInset={ { top: 50, left: 25, right: 25 } }
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
                            <Col data={['Est. Time (hr)', 'N351BU Actual Time']} 
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
                        <Text style={{paddingRight: 20}}> N351BU Actual Time</Text>
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

export default B777_B747Chart;