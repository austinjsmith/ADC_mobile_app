import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Alert} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Stopwatch } from 'react-native-stopwatch-timer';
import AddPartModal from '../../components/Modals/AddPartModal';
import EditPartModal from '../../components/Modals/EditPartModal';
import DeletePartModal from '../../components/Modals/DeletePartModal';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

let stopwatchTime = 0;

class TaskCardsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

          // table props
          descTableHead: 'Description of Work',
          descTableData: '',

          toolTableHead: 'Tool/Equipment Needed',
          toolTableData: [],

          partInfoHead: ['Part Description',
                         'Part Number', 
                         'Part Serial Number', 
                         'Part ID'],
          partInfoData: [],

          // time props
          stopwatchTime: 0,
          stopwatchStart: false,  
          stopwatchRestart: false,
          estTime: '',

          timeTableHead: ['Est. Time',
                          'Actual Time', 
                          'Button', 
                          'Remarks on Time'],
          timeTableData: 
              ['', ],
          
          remarks: null,

          totalTableHead: ['Total Techs',
                           'Total Labor', 
                           'Material Needed', 
                           'Quantity', 
                           'Amount'],
          totalTableData: [],

          jobsList: [
            {
                key: 0,
                label: 'Please fill in Registration first.',
                value: '',
            }
          ],
          jobColor: 'rgba(0, 0, 0, .54)',
          open: false,

          // task card data
          reg: '',
          jobName: 'none',
          location: '',
          labor: '',
          airRegistration: '',
          assignedTo: '',
          techCount: '',
          approvedBy: '',
          approvedByJobTitle: '',
          completedBy: '',
          completedByJobTitle: ''
        }
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.setValue = this.setValue.bind(this);

    }

    toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchRestart: false});
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchRestart: true});
    }

    timeToFloat(time) {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }


    retrieveInfo(job_name) {
        const mode = 'get';
        const reg = this.state.reg;

        fetch(`${global.route}/taskcardinfo/${reg}/${mode}/${job_name}/${global.user}`)
            .then(response => response.json())
            .then(values => {
                const assigned_to = values[0].assigned_to;

                if (global.user == assigned_to) {
                    this.setState({
                        phase: values[0].phase,
                        assignedTo: values[0].assigned_to,
                        descTableData: values[0].description,
                        airRegistration: values[0].air_registration,
                        estTime: values[0].est_time + ' hr(s)',
                        techCount: values[0].techs,
                        labor: values[0].labor,
                    });

                    this.getApproval(values[0].job_name);

                    this.getTools(values[0].tools);
                    this.getParts(reg, job_name);
                    this.getMaterials(reg, job_name);
                }
            })
            .catch(function(error) {
                console.error(error);
            })

    }

    getJobs(reg) {
        let data = [];

        fetch(`${global.route}/jobs/${reg}/${global.user}`)
            .then((response) => response.json())
            .then(values => {
                for (let i = 0; i < values.length; ++i) {
                    let entry = {};

                    entry['key'] = i + 1;
                    entry['label'] = values[i].job_name;
                    entry['value'] = values[i].job_name;
                    
                    if (values[i].completed_by) {
                        entry['icon'] = () => <Icon name="check" color='rgba(39, 255, 0, 1)'/>
                    }

                    data.push(entry);
                }

                this.setState({jobsList: data});

            })
            .catch(function(error) {
              console.error(error);
              alert('Could not find task for the Registration. Either you entered the Registration incorrectly, or you do not have permission to access it.')
            })
        
    }

    getTools(tools) {

        let data = '';

        for (let i in tools) {
            if (tools[i] != ' ' || tools[i] != null) {
                data += tools[i];
            }
        }
        
        this.setState({toolTableData: data});
    }

    getParts(reg, job_name) {
        
        let data = [];
        let entry = [];

        fetch(`${global.route}/parts/${reg}/${job_name}`)
            .then(response => response.json())
            .then(values => {
                for (let i = 0; i < values.length; ++i) {

                    entry = [values[i].description, values[i].part_number, 'TBD', values[i].id];

                    data.push(entry);
                }
                this.setState({partInfoData: data});
            })
            .catch(function(error) {
                console.error(error);
                alert('Error getting parts. Make sure the registration and the job name is correct. Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
            })
    }

    getMaterials(reg, jobName) {

        let entry = [];
        let data = [];
        fetch(`${global.route}/materials/${reg}/${jobName}`)
            .then(response => response.json())
            .then(values => {

                entry = [this.state.techCount, this.state.labor, values.title, values.quantity, values.amount];

                data.push(entry);

                if (values != null) {
                    
                    for (let i = 0; i < values.length; ++i) {
                        entry = ['  ', '    ', values[i].title, values[i].quantity, values[i].amount];

                        data.push(entry);
                    }

                    this.setState({totalTableData: data});
                }
                else
                {
                    console.log('no values');
                    this.setState({totalTableData: []});
                }
            })
            .catch(function(error) {
                console.error(error);
                alert('Error getting materials. Make sure the registration and the job name is correct. Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
            })
    }

    getApproval(jobName) {

        fetch(`${global.route}/approval/${jobName}`)
            .then(response => response.json())
            .then(values => {
                this.setState({
                    approvedBy: values[0].name,
                    approvedByJobTitle: values[0].title
                })
            })
            .catch(function(error) {
                console.error(error);
                alert('Error getting approval. Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
            })
        
    }

    getCompletedJobTitle(name) {

        this.setState({completedBy: name});

        fetch(`${global.route}/completed/${name}`)
            .then(response => response.json())
            .then(values => {
                this.setState({
                    completedByJobTitle: values[0].title
                })
            })
            .catch(function(error) {
                console.error(error);
            })
    }

    // completion handlers
    async postCompleted(url = '', data={}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        });

        return response.text();
    }

    setToComplete(jobName = this.state.jobName, completedBy = this.state.completedBy) {

        let time = this.timeToFloat(stopwatchTime);

        this.postCompleted(`${global.route}/setCompleted/${jobName}/${completedBy}/${time}/${this.state.reg}/${this.state.remarks}/${this.state.toolTableData}`)
            .catch(function(error) {
                console.error(error);
                alert('Error setting completion. Make sure the following are filled out: job name, and completed by.\n Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
            })

        // reset all states
        this.setState({
            // table props
            descTableHead: 'Description of Work',
            descTableData: '',

            toolTableHead: 'Tool/Equipment Needed',
            toolTableData: '',

            partInfoHead: ['Part Description', 
                            'Part Number', 
                            'Part Serial Number',
                            'AMM/IPC Referance'],
            partInfoData: [],

            // time props
            stopwatchStart: false,  
            stopwatchRestart: true,
            estTime: '                                    ',

            timeTableHead: ['Est. Time', 
                            'Actual Time', 
                            'Button', 
                            'Remarks on Time'],
            timeTableData: 
                [''],

            totalTableHead: ['Total Techs',
                            'Total Labor', 
                            'Material Needed', 
                            'Quantity', 
                            'Amount'],
            totalTableData: [],

            remarks: '',

            stopwatchColor: this.getBackGroundColor,

            // task card data
            reg: '',
            phase: '',
            jobName: '',
            location: '',
            labor: '',
            airRegistration: '',
            assignedTo: '',
            techCount: '',
            approvedBy: '',
            approvedByJobTitle: '',
            completedBy: '',
            completedByJobTitle: ''

        });

    }

    // listing functions below. These are what will fill in the tables
    listTools(props) {
        let tools = props.tools;

        const listItems = tools.map((tool) => 
            <View style={styles.borderEntry}>
                <View style={{ flex: 1, alignSelf: 'stretch', paddingBottom: 5 }} >
                    <Text>{tool}</Text>
                </View>
            </View>
        );

        return listItems;
    }

    listParts(props) {
        let parts = props.parts;
        const listItems = parts.map((part) =>
            <View style={styles.borderEntry}>
                <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{ flex: 1, maxWidth: '20%' }}>{part[0]}</Text>
                    <Text>{part[1]}</Text>
                    <Text>{part[2]}</Text>
                    <Text>{part[3]}</Text>
                </View>
            </View>
        );

        return listItems;
    }

    listMaterials(props) {
        let materials = props.materials;

        const listItems = materials.map((material) =>
            <View style={styles.borderEntry}>
                <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{paddingEnd: 50}}>{material[0]}</Text>
                    <Text style={{paddingStart: 150, paddingEnd: 150}}>{material[1]}</Text>
                    <Text>{material[2]}</Text>
                </View>
                <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{paddingEnd: 50}}>{material[3]}</Text>
                    <Text>{material[4]}</Text>
                </View>
            </View>
        );

        return listItems;
    }

    setOpen() {
        this.setState({open: !this.state.open});
    }

    setValue(callback) {
        this.setState(state => ({jobName: callback(state.value)}));
    }

    // render function
    render() {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1; // off by one so I made up for it. Not sure why it's off
        let year = new Date().getFullYear();

        const onSubmit = (event) => {
            Alert.alert('Are you sure you want to submit?', '',
                [
                    {text: 'Cancel', onPress: () => console.log('canceled')},
                    {text: 'Confirm', onPress: () => this.setToComplete()},

                ]
            );
        }
        const help = (event) => {
            Alert.alert('To generate the task card, please fill in the registration and select the job from the dropdown.\nPress the start button when you begin the task and pause it when you need to take a break.\nBe sure to print your name and press the submit button when you are finished!', 
                'If you have an issue or any other questions, please contact Austin Smith (austin.smith@uaminc.com).',
                [
                    {text: 'Got it!'}
                ]
            );
        }

        return (
            
            <ScrollView style={styles.page}>
                
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

                {/* Top section of form */}
                <View style={{flexDirection: 'row', paddingLeft: 30}}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{justifyContent: 'flex-start'}}>Registration: </Text>
                            <TextInput
                                style={{justifyContent: 'flex-end'}} 
                                placeholder='Enter here'
                                onEndEditing={(value) => {
                                    this.setState({reg: value.nativeEvent.text});
                                    this.getJobs(value.nativeEvent.text);
                                }} 
                                keyboardType='number-pad' />
                        </View>


                    </View>

                    <View style={{flex:1}}>
                        <Text style={{justifyContent: 'flex-end'}}>Date of Task Card: {month}/{date}/{year}</Text>
                        <Text style={{justifyContent: 'flex-end'}}>Employee Assigned: {this.state.assignedTo}</Text>
                        <Text style={{justifyContent: 'flex-end'}}>Phase: {this.state.phase}</Text>
                    </View>
                </View>
                <DropDownPicker 
                    open={this.state.open}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    items={this.state.jobsList}
                    placeholder='Select a job.'
                    value={this.state.jobName}
                    onChangeValue={(value) => {
                        this.retrieveInfo(value);
                    }}
                    containerStyle={{height: 40, paddingLeft: 20, paddingRight: 20}}
                    dropDownContainerStyle={{marginLeft: 20, paddingRight: 20}}
                />

                {/* Desc Table */}
                <View style={{padding:20}}>
                    <View>
                        <Text style={styles.head}> {this.state.descTableHead} </Text>
                        <Text style={styles.text}> {this.state.descTableData} </Text> 
                    </View>
                </View>
                
                {/* Tools Table */}
                <View style={{padding:20}}>
                    <View>
                        <Text style={styles.head}>{this.state.toolTableHead}</Text>
                        <Text style={styles.text}>{this.state.toolTableData}</Text>

                        <TextInput 
                            placeholder='Enter additional tools here'
                            onEndEditing={(value) => {

                                if (this.state.toolTableData == '')
                                {
                                    this.setState({toolTableData: value.nativeEvent.text})
                                }
                                else
                                    this.setState({toolTableData: this.state.toolTableData + `, ${value.nativeEvent.text}`})
                            }}
                        />
                    </View>
                </View>

                {/* Parts Table */}
                <View style={styles.head}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20, paddingBottom: 5, justifyContent: 'space-between' }} >
                        <Text>Part Description</Text>
                        <Text>Part Number</Text>
                        <Text>Part Serial Number</Text>
                        <Text>Part ID</Text>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <this.listParts parts={this.state.partInfoData}/>
                </View>
                
                <View>
                    <View>
                        <AddPartModal jobName={this.state.jobName} currentPhase={this.state.phase} currentReg={this.state.reg}/>
                    </View>
                    <View>
                        <EditPartModal />
                    </View>
                    <View>
                        <DeletePartModal />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => 
                                {
                                    this.getParts(this.state.reg, this.state.jobName);
                                }}
                            style={styles.refreshPartButton}
                        >
                            <Text style={{fontSize: 18}}>Refresh Parts</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
                {/* Time information */}
                <View style={{padding: 20, justifyContent: 'flex-start'}}>
                    <View>
                        <View style={styles.timeTableHead}>
                            <Text>Est. Time</Text>
                            <Text>Actual Time</Text>
                            <Text>Button</Text>
                            <Text>Remarks</Text>
                        </View>
                        <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{this.state.estTime}</Text>
                            <Stopwatch 
                                start={this.state.stopwatchStart}
                                reset={this.state.stopwatchRestart} 
                                options={options} 
                                getTime={(time) => {stopwatchTime = time}}/>
                            <TouchableOpacity 
                                onPress={this.toggleStopwatch}
                                style={{justifyContent: 'flex-end', marginLeft: 5}}
                            >
                                <Text style={{fontSize: 20}}>{!this.state.stopwatchStart ? "Start" : "Pause"}</Text>
                            </TouchableOpacity>
                            <TextInput
                                value={this.state.remarks} 
                                multiline 
                                style={{paddingLeft: 55}} 
                                placeholder='Enter remarks here!'
                                onChangeText={(value) => this.setState({remarks: value})}/>
                        </View>
                    </View>
                </View>

                <View style={{padding: 20}}>
                    <View style={styles.head}>
                        <Text>Total Techs</Text>
                        <Text>Total Labor</Text>
                        <Text>Material Needed</Text>
                        <Text>Quantity Amount</Text>                        
                    </View>

                    <View style={{paddingLeft: 20}}>
                        <this.listMaterials materials={this.state.totalTableData}/>
                    </View>
                </View>

                {/* Signatures section */}
                <View style={{flexDirection: 'row', paddingLeft: 30}}>
                    <View style={{flex:1}}>
                        <Text style={{justifyContent: 'flex-start'}}>Task card completed by: </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{justifyContent: 'flex-start'}}>Print: </Text>
                            <TextInput name='completed_by' placeholder='Enter your name' onEndEditing={(value) => 
                                this.getCompletedJobTitle(value.nativeEvent.text)}/>
                        </View>
                        <Text style={{justifyContent: 'flex-start'}}>Sign: {this.state.completedBy}</Text>
                        <Text style={{justifyContent: 'flex-start'}}>Title: {this.state.completedByJobTitle}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{justifyContent: 'flex-start'}}>Task card approved by: </Text>
                        <Text style={{justifyContent: 'flex-start'}}>Print: {this.state.approvedBy}</Text>
                        <Text style={{justifyContent: 'flex-end'}}>Sign: {this.state.approvedBy}</Text>
                        <Text style={{justifyContent: 'flex-end'}}>Title: {this.state.approvedByJobTitle}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={onSubmit}
                    style={styles.submitButton}
                >
                    <Text style={{fontSize: 20}}>Submit</Text>
                </TouchableOpacity>
                
            </ScrollView>
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
    page: {
        backgroundColor: 'white',
        flex: 1
    },
    logo: {
        width: 200,
        height: 50,
        paddingLeft: 40,
        paddingBottom: 50,
        justifyContent: 'flex-start'
    },
    section1: { // registration, job name
        textDecorationLine: 'underline',
        justifyContent: 'space-between'
    },

    head: { 
        height: 40,
        backgroundColor: '#f1f8ff', 
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },
    text: { 
        margin: 6, 
        textAlign: 'left', 
        justifyContent: 'space-between' 
    },
    timeTableHead: {
        height: 40,
        // width: '100%',
        backgroundColor: '#f1f8ff',
        // textAlign: 'left',
        flex: 1, 
        flexDirection: 'row', 
        paddingLeft: 20, 
        paddingBottom: 5, 
        justifyContent: 'space-between' 
    },
    timeTableText: {
        margin: 6,
        width: '100%',
        flex: 1,
        paddingLeft: 20,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#d4eefc',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: width - 600,
        borderRadius: 5,
        marginTop: 30
    },
    helpButton: {
        backgroundColor: '#d4eefc',
        alignItems: 'center',
        padding: 10,
        marginEnd: 50,
        borderRadius: 10,
        justifyContent: 'flex-end'
      },
    editPartButton: {
        flex: 1,
        backgroundColor: '#d4eefc',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: width - 600,
        borderRadius: 5,
      },
    borderEntry: { 
        flex: 1, 
        alignSelf: 'stretch', 
        flexDirection: 'row', 
        borderBottomWidth: 3,
        borderBottomStartRadius: 30,
        borderBottomColor: '#cacaca' 
    },
    refreshPartButton: {
        flex: 1,
        backgroundColor: '#d4eefc',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: width - 600,
        borderRadius: 5,
      },
})

// for start/stop button
const options = {
    container: {
        width: '20%',
        justifyContent: 'flex-start',
    }
}

export default TaskCardsScreen;