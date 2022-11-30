import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


function ViewMaterialModal({reg, job_name}) {
  const [isModalVisible, setModalVisible] = useState(false);

  // material states
  const [materialsList, setMaterialsList] = useState([]);

  function getMaterials(reg, job_name) {

    fetch(`${global.route}/materials/${reg}/${job_name}`)
        .then(response => response.json())
        .then(values => {
            let data = [];

            for (let i in values) 
            {
                let entry = {};
                
                entry['key'] = i + 1;
                entry['title'] = values[i].title;
                entry['quantity'] = values[i].quantity;
                entry['amount'] = values[i].amount;

                data.push(entry);
            }
            setMaterialsList(data);
        })
        .catch(function(error) {
            console.error(error);
        })
}

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    getMaterials(reg, job_name)
  }

  const onSubmit = () => {

    toggleModal();
  }

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal} 
        style={styles.materialButton}
      >
        <Text style={styles.buttonContent}>View/Edit Materials</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <KeyboardAwareScrollView style={styles.window}>

            <Text style={styles.title}>Edit Materials</Text>

            {materialsList.map((material) => {
                return (
                    <View key={material.key}>
                        <Text style={styles.materialLabel}>Material</Text>
                            <TextInput 
                                value={material.title}
                                autoCorrect={true}
                                style={styles.input}
                            />
                            
                            <Text style={styles.label}>Quantity: {material.quantity}</Text>
                            <TextInput
                                placeholder='Update Quantity' 
                                value={material.quantity}
                                onChangeText={material.quantity}
                                keyboardType='numeric'
                                autoCorrect={false}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Quantity: {material.quantity}</Text>

                            <Text style={styles.label}>Amount: {material.amount}</Text>
                            <TextInput
                                placeholder='Update Amount' 
                                value={material.amount}
                                onChangeText={material.amount}
                                autoCorrect={false}
                                style={styles.input}
                            />
                    </View>
                )
            })}

            <View style={{flexDirection: 'row', alignSelf: 'center', paddingTop: 25}}>
                <Button title='Cancel' onPress={toggleModal}/>
                <Button title='Submit Changes' onPress={onSubmit} />
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
  materialLabel: {
    fontSize: 20,
    textAlign: 'left',
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingLeft: 30
  },
  label: {
    fontSize: 16,
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
  materialButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2089dc',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonContent: {

    fontSize: 16, 
    color: 'white', 

  }
})

export default ViewMaterialModal;