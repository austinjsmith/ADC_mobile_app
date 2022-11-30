import React from 'react';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer,  } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

// import screens
import TaskCardsScreen from './TaskCards/TaskCardsScreen';
import CustomTaskCardsScreen from './TaskCards/CustomTaskCardsScreen';
import EditTaskCardsScreen from './TaskCards/EditTaskCardsScreen';
import ListTaskCardsScreen from './TaskCards/ListTaskCardsScreen';


import IPCScreen from './IPC/IPC/IPCScreen';
// end import screens


function TaskScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={TaskCardsScreen} 
        options={{
          tabBarIconStyle: {display: 'none'},
          headerShown: false
        }}/>
      <Tab.Screen name="List" component={ListTaskCardsScreen}
        options={{headerShown: false, tabBarIconStyle: {display: 'none'}}}
      />
      { isAdmin == 'true' ? <Tab.Screen name="Custom" component={CustomTaskCardsScreen}
        options={{
          tabBarIconStyle: {display: 'none'},
          headerShown: false
        }}/> : <></>} 
        { isAdmin == 'true' ? <Tab.Screen name="Edit" component={EditTaskCardsScreen}
        options={{
          tabBarIconStyle: {display: 'none'},
          headerShown: false
        }}/> : <></>} 
    </Tab.Navigator>
  )
}


export default function HomeScreen() {
  const Tab = createBottomTabNavigator();

  let isAdmin = global.isAdmin;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Task Cards" component={TaskScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" color="blue" size={20}/>
            ),
            headerShown: false
          }}
        />

        { isAdmin == 'true' ? <Tab.Screen name="IPC" component={IPCScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="clipboard-list" color="blue" size={20}/>
            ),
            headerShown: false
          }}
        /> : <></>}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    padding: 10
  }
});
