import React from 'react';
import {Text, View, Dimensions, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = Dimensions.get('window').width;
export default function natima() {
return (
    <View style={{ flex:1, justifyContent:'center',alignItems:'center',alignContent:'center'}}>
        <Text>{SIZE}</Text>
        <Svg width={SIZE} height={SIZE} viewBox='0 0 1 1'>
            
        </Svg>
    </View>
  );
}