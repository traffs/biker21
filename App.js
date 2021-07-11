import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Dimensions, Text, View, TextInput, ImageBackground, Button } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import MapView from 'react-native-maps'

//import WebsocketSample from './components/websoc';
import WebsocketSample from './components/ws2'
import Constants from 'expo-constants';

import Donut  from './components/donutchart.js';
//import Anima from './components/anima.js';
import natima from'./components/natanim.js';

export default function App() {
  return (
    <LinearGradient 
    start={{x:0,y:0}} 
    end={{x:1,y:1}} 
    style={StyleSheet.absoluteFill} colors={['#D300B5', '#FF5400']}
    >
      <View style={styles.container}>
           <WebsocketSample /> 
       </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: 'orange',
     alignItems: 'center',
     justifyContent: 'center',
  },
  butt: {
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 70,
  },
  input: {
    borderColor:'red',
    width:'90%',
    color:'green',
    //backgroundColor:'black',
    //textDecorationColor:'red',
    borderWidth:2,
    borderRadius:4,
    //margin: 6,
    padding: 2,
    //paddingHorizontal: 12,
    textAlign:'left',
  }
});
