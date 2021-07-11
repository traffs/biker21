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
      message: '',
      chatListMsg: [],
    };
    this.ws = new WebSocket('ws:192.168.1.65:81');
  }

  componentDidMount() {
    this.ws.onopen = () => {
      this.ws.send('someonre');
      //console.warn('sent');
    };

    this.ws.onmessage = (e) => {
      
      //console.warn(e.data);
      const data = JSON.parse(e.data).data;
      //const data = e.data.toString();
      //console.warn(data);
      //this.ws.send(data);

      this.setState({
        chatListMsg: data.reverse(),
        chatListMsg: [data, ...this.state.chatListMsg],
      });

      console.warn(chatListMsg);


      if (_.isArray(data)) {
        this.setState({ 
          chatListMsg: data.reverse(),
        });
        
      } else {
        if (_.isObject(data)) {
          this.setState({
            chatListMsg: [data, ...this.state.chatListMsg],
            message:{data},
          });
        }
      }
    };

    this.ws.onerror = (e) => {
      console.log('onerror', e.message);
    };

    this.ws.onclose = (e) => {
      console.log('onclose', e.code, e.reason);
    };
  }

  onChangeText = (text) => {
    this.setState({ message: text });
  };

  send = () => {
    this.ws.send(this.state.message);
    this.setState({
      message: '',
    });
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
        }}>
        <Text style={{ color: item.color }}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => index;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 6 }}>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: '#bbb' }} />
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
          }}>
          <TextInput
            style={{ flex: 1, paddingRight: 20 }}
            placeholder="message"
            onChangeText={this.onChangeText}
            value={this.state.message}
          />
          <TouchableOpacity style={styles.button} onPress={this.send}>
            <Text style={styles.buttonText}>send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'red',
    fontSize: 18,
  },
});
