import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

// completion handlers
async function postPart(url = '', data={}) {
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

function AddPartModal({jobName, currentPhase, currentReg}) {
  const [isModalVisible, setModalVisible] = useState(false);

  // part states
  const [partNum, setPartNum] = useState('');
  const [modelValue, setModelValue] = useState('');
  const [reg, setReg] = useState(currentReg);
  const [description, setDesc] = useState('');
  const [phase, setPhase] = useState(currentPhase);
  const [expDate, setExpDate] = useState(null);
  const [ipc, setIPC] = useState(null);
  const [ata, setATA] = useState(null);
  const [cage, setCage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const onSubmit = () => {
    
    postPart(`${global.route}/newPart/${partNum}/${currentReg}/${description}/${currentPhase}/${modelValue}/${expDate}/${ipc}/${ata}/${cage}`)
      .catch(function(error) {
        console.error(error);
      })

    toggleModal();
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onSubmit} 
        style={styles.addPartButton}
      >
        <Text style={{fontSize: 16}}>Add Part</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <KeyboardAwareScrollView style={styles.window}>
          <Text style={styles.title}>Add new Part for {jobName}</Text>
          
          <Text style={styles.label}>Part Number</Text>
          <TextInput placeholder='Part #'
                value={partNum}
                onChangeText={setPartNum}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Registration</Text>

          <Text style={styles.input}>{currentReg}</Text>

          <Text style={styles.label}>Description</Text>
          <TextInput placeholder='Description'
                value={description}
                onChangeText={setDesc}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Expiration Date</Text>
          <TextInput placeholder='yyyy-mm-dd Format (optional)'
                value={expDate}
                onChangeText={setExpDate}
                autoCorrect={false}
                style={styles.input}
          />


          <Text style={styles.label}>Model Value</Text>
          <TextInput placeholder='In dollars (optional)'
                value={modelValue}
                onChangeText={setModelValue}
                autoCorrect={false}
                style={styles.input}
          />
          <Text style={styles.label}>IPC</Text>
          <TextInput placeholder='IPC (optional)'
                value={ipc}
                onChangeText={setIPC}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>ATA</Text>
          <TextInput placeholder='Can be found in the IPC. (optional)'
                value={ata}
                onChangeText={setATA}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Cage</Text>
          <TextInput placeholder='Cage. (optional)'
                value={cage}
                onChangeText={setCage}
                autoCorrect={false}
                style={styles.input}
          />

          <View style={{flexDirection: 'row', alignSelf: 'center', paddingTop: 25}}>
            <Button title='Cancel' onPress={toggleModal}/>
            <Button title='Submit' onPress={onSubmit} />
          </View>

        </KeyboardAwareScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  window: {
    flex: 1, 
    backgroundColor: 'white', 
    borderRadius: 10
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 20,
    textDecorationLine: 'underline',
    backgroundColor: '#f1f8ff'
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 15,
    paddingLeft: 30,
  },
  input: {
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 15,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50
  },
  addPartButton: {
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

export default AddPartModal;