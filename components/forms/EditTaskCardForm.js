import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ViewMaterialModal from '../Modals/ViewMaterialsModal';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

// used for custom ask cards
function TaskCardForm() {
    // general hooks
    const [airReg, setAirReg] = useState('');
    const [reg, setReg] = useState('');
    const [jobName, setJobName] = useState('');
    const [employeeAssigned, setEmployeeAssigned] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [approvedBy, setApprovedBy] = useState(global.user);
    const [approvalId, setApprovalId] = useState(0);
    const [phase, setPhase] = useState('');

    // description hooks
    const [workDesc, setWorkDesc] = useState('');
    const [toolsNeeded, setToolsNeeded] = useState(' ');

    // time hook
    const [estTime, setEstTime] = useState('');

    // tech hooks
    const [techCount, setTechCount] = useState('');
    const [laborCount, setLaborCount] = useState('');
    
    // material hooks
    const [materialNeeded, setMaterialNeeded] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [materials, setMaterials] = useState([]);


    function retrieveInfo(reg, job_name) {

        fetch(`${global.route}/taskcardinfo/${reg}/update/${job_name}/${global.user}`)
            .then(response => response.json())
            .then(values => {
                setAirReg(values[0].air_registration);
                setJobName(values[0].job_name);
                setEmployeeAssigned(values[0].assigned_to);
                setJobLocation(values[0].location);
                setPhase(values[0].phase);
                setWorkDesc(values[0].description);
                setToolsNeeded(values[0].tools);
                setEstTime(values[0].est_time);

                if (values[0].techs == null)
                    setTechCount(0);
                else
                    setTechCount(values[0].techs);
                
                if (values[0].labor == null)
                        setLaborCount(0);
                else
                    setLaborCount(values[0].labor);
    
            })
            .catch(function(error) {
                alert('Could not find task for the registration. Either you entered the registration incorrectly, or you do not have permission to access it.')
                console.error(error);
            })
    
    }
    
    function getApprovalID() {
        let id = 0;

        fetch(`${global.route}/approvedBy/${approvedBy}`)
            .then(response => response.json())
            .then(values => {
                id = values.id;
                setApprovalId(id);
            })
    }

    async function postForm(url = '', data={}) {
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

    const addMaterial = (name, quantity, amount) => {
        let materialsCopy = materials;

        let entry = {
            name: name, 
            quantity: quantity, 
            amount: amount
        }
        materialsCopy.push(entry);
        setMaterials(materialsCopy);

        setMaterialNeeded('');
        setQuantity('');
        setAmount('');
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getApprovalID();

        Alert.alert('Are you sure you want to submit?', '',
                [
                    {text: 'Cancel', onPress: () => console.log('cancelled')},
                    {text: 'Confirm', onPress: () => {
                        postForm(`${global.route}/update/`, {reg: reg, jobName: jobName, employeeAssigned: employeeAssigned, jobLocation: jobLocation, desc: workDesc, toolsNeeded: toolsNeeded, phase: phase, estTime: estTime, technicians: techCount, labor: laborCount, materials: materials, approvalId: approvalId})
                            .catch(function(error) {
                                console.error(error);
                                alert('Error updating task card. Make sure the information is correct.\n Contact Austin Smith (austin.smith@uaminc.com) if you continue having issues');
                            })
                        }     
                    }
                ]
            );
    }

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; // month is off for some reason
    var year = new Date().getFullYear();

    return (
        <KeyboardAwareScrollView style={{height: '90%', backgroundColor: 'white'}}>
            <Text style={styles.dateHeader}>Date: {month}/{date}/{year}</Text>
            <Input placeholder='Approved By'
                name="approvedBy"
                value={approvedBy}
                onChangeText={setApprovedBy}
            />
            <Input placeholder='Registration' 
                name="reg"
                onChangeText={setReg}
                keyboardType='numeric'
                autoCorrect={false}
            />

            <Input placeholder='Job Name' 
                name="jobName"
                value={jobName}
                onChangeText={setJobName}
                onEndEditing={(value) => {
                    retrieveInfo(reg, value.nativeEvent.text);
                    setJobName(value.nativeEvent.text);
                }}
            />
            
            <Text style={styles.header}>GENERAL INFO</Text>
            <Input placeholder='Air Registration'
                name="airReg"
                value={airReg}
                onChangeText={setAirReg}
                autoCorrect={false}
            />

            <Input placeholder='Employee(s) Assigned' 
                name="employeeAssigned"
                value={employeeAssigned}
                onChangeText={setEmployeeAssigned}
            />

            <Input placeholder='Job Location' 
                name="jobLocation"
                value={jobLocation}
                onChangeText={setJobLocation}
            />

            <Input placeholder='Description of work'
                name='workDesc'
                value={workDesc}
                onChangeText={setWorkDesc}
            />

            <Input placeholder='Tools needed' 
                name='toolsNeeded'
                value={toolsNeeded}
                onChangeText={setToolsNeeded}
            />

            <Input placeholder='Disassembly Phase' 
                name='dissPhase'
                value={phase}
                onChangeText={setPhase}
            />

            <Text style={styles.header}>TIME INFO</Text>
            <Input placeholder='Estimated Time for Completion' 
                name='estTime'
                value={estTime.toString()}
                onChangeText={setEstTime}
            />

            <Text style={styles.header}>TECHNICIAN INFO</Text>
            <Input placeholder='Total Technicians' 
                name='techCount'
                value={techCount.toString()}
                onChangeText={setTechCount}
            />
            <Input placeholder='Total Labor' 
                name='laborCount'
                value={laborCount.toString()}
                onChangeText={setLaborCount}
            />

            <Text style={styles.header}>ADD NEW MATERIAL</Text>
            <Input placeholder='Material Needed' 
                name='materialNeeded'
                value={materialNeeded}
                onChangeText={setMaterialNeeded}
            />
            <Input placeholder='Quantity' 
                name='quantity'
                value={quantity}
                onChangeText={setQuantity}
            />
            <Input placeholder='Amount' 
                name='amount'
                value={amount}
                onChangeText={setAmount}
            />

            <Button title="Add Material" style={styles.materialButton} onPress={() => addMaterial(materialNeeded, quantity, amount)}/>
            <ViewMaterialModal reg={reg} job_name={jobName}/>

            <Button title="Submit" style={{paddingTop: 25}} onPress={onSubmit} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: "400",
        fontSize: 25
    },
    dateHeader: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: "400",
        fontSize: 25,
        padding: 20
    },
    approvedHeader: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: "400",
        fontSize: 25,
        padding: 10,
        justifyContent: 'flex-start'
    },
    materialButton: {
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20
    }
});

export default TaskCardForm;