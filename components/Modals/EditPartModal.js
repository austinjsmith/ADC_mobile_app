import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

// completion handlers
async function editPart(url = '', data={}) {
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

function EditPartModal(currentReg) {
  const [isModalVisible, setModalVisible] = useState(false);

  // part states
  const [currentSn, setCurrentSN] = useState('');
  const [currentPartNum, setCurrentPartNum] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [currentDescription, setCurrentDesc] = useState('');
  const [currentExpDate, setCurrentExpDate] = useState(null);
  const [currentIpc, setCurrentIPC] = useState(null);
  const [currentAta, setCurrentATA] = useState(null);
  const [currentCage, setCurrentCage] = useState(null);

  const [id, setID] = useState('');
  const [sn, setSN] = useState('');
  const [partNum, setPartNum] = useState('');
  const [modelValue, setModelValue] = useState('');
  const [description, setDesc] = useState('');
  const [expDate, setExpDate] = useState(null);
  const [ipc, setIPC] = useState(null);
  const [ata, setATA] = useState(null);
  const [cage, setCage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const getPartInfo = (id) => {
    fetch(`${global.route}/part/${id}`)
      .then(response => response.json())
      .then(values => {

          setSN('0000'); // temporary
          setPartNum(values[0].partNum);
          setModelValue(values[0].model_value);
          setCurrentDesc(values[0].description);
          setExpDate(values[0].expiration_date);
          setIPC(values[0].ipc);
          setATA(values[0].ata);
          setCage(values[0].cage);
      })
  }

  const onSubmit = () => {
    
    editPart(`${global.route}/editPart/${partNum}/${modelValue}/${description}/${ipc}/${expDate}/${ata}/${cage}/${id}`)
      .catch(function(error) {
        console.error(error);
      })

    toggleModal();
  }

  return (
    <View style={{justifyContent: 'flex-end'}}>
      <TouchableOpacity
        onPress={onSubmit} 
        style={styles.editPartButton}
      >
        <Text style={{fontSize: 16}}>Edit Part</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <KeyboardAwareScrollView style={styles.window}>
          <Text style={styles.title}>Edit Part</Text>
          <Text style={styles.label}>ID</Text>
          <TextInput placeholder='ID' 
                value={id}
                onChangeText={setID}
                onEndEditing={
                  getPartInfo(id)
                }
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Serial Number: {currentSn}</Text>
          <TextInput placeholder='SN'
                value={sn}
                onChangeText={setSN}
                autoCorrect={false}
                style={styles.input}
          />
          
          <Text style={styles.label}>Part Number: {currentPartNum}</Text>
          <TextInput placeholder='Part #'
                value={partNum}
                onChangeText={setPartNum}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Model Value: {currentPartNum}</Text>
          <TextInput placeholder='In dollars'
                value={modelValue}
                onChangeText={setModelValue}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Description: {currentDescription}</Text>
          <TextInput placeholder='Description'
                value={description}
                onChangeText={setDesc}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Expiration Date: {currentExpDate}</Text>
          <TextInput placeholder='yyyy-mm-dd Format (optional)'
                value={expDate}
                onChangeText={setExpDate}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>IPC: {currentIpc}</Text>
          <TextInput placeholder='IPC (optional)'
                value={ipc}
                onChangeText={setIPC}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>ATA: {currentAta}</Text>
          <TextInput placeholder='Can be found in the IPC. (optional)'
                value={ata}
                onChangeText={setATA}
                autoCorrect={false}
                style={styles.input}
          />

          <Text style={styles.label}>Cage: {currentCage}</Text>
          <TextInput placeholder='Cage. (optional)'
                value={cage}
                onChangeText={setCage}
                autoCorrect={false}
                style={styles.input}
          />

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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
})

export default EditPartModal;