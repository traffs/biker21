import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import _ from 'lodash';

export default class WebsocketSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '0',
    };
    this.ws = new WebSocket('ws:192.168.1.65:81');
  }

  componentDidMount() {
    this.ws.onopen = () => {
      this.ws.send('someonre');
      console.warn('sent');
    };

    this.ws.onmessage = (e) => {
      
      //console.warn(e.data);
      const data = JSON.parse(e.data).data;
      //const data = e.data.toString();
      //console.warn(data);
      //this.ws.send(data);

      this.setState({
        message: data,
      });
    };

    this.ws.onerror = (e) => {
      console.log('onerror', e.message);
    };

    this.ws.onclose = (e) => {
      console.log('onclose', e.code, e.reason);
    };
  }

  render() {
    return (
          <Text Style={styles.texxt}>
             {this.state.message}
          </Text>
    );
 }
}
const styles = StyleSheet.create({
  texxt: {
    color:'white',
    fontSize: 20,
  }
});