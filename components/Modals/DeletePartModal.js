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

function DeletePartModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  // part states
  const [id, setId] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const onSubmit = () => {
    postPart(`${global.route}/deletePart/${id}`)
        .catch(function(error) {
            console.error(error);
        })

    toggleModal();
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onSubmit} 
        style={styles.deletePartButton}
      >
        <Text style={{fontSize: 16}}>Delete Part</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <KeyboardAwareScrollView style={styles.window}>
          <Text style={styles.title}>Delete Part</Text>
          
          <Text style={styles.label}>Part ID</Text>
          <TextInput placeholder='Part ID'
                value={id}
                onChangeText={setId}
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
  deletePartButton: {
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

export default DeletePartModal;