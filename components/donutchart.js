import React from 'react';
import {Text, View, Animated } from 'react-native';
import Svg, {G, Circle} from 'react-native-svg'

const Animatedcircle = Animated.createAnimatedComponent(Circle);

export default function Donut({
    percentage =75,
    radius =40,
    strokewidth=10,
    duration =500,
    color ='tomato',
    delay = 0,
    textcolor,
    max =100,
}) {
    const animatedValue =React.useRef(new Animated.Value(0)).current;
    const circlref =React.useRef();
    const halfcrcle =radius +strokewidth;
    const circlecircumferernce =2 * Math.PI *radius;
    const animation = (toValue) => {
        return Animated.timing(animatedValue,{
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        }).start(() =>{
            animation(toValue === 0? percentage : 0)
        });
    };

    React.useEffect(() =>{
        animation(percentage);
        
        animatedValue.addListener((v) =>{
            if(circlref?.current){
                const maxPerc =100 * v.value / max;
        const strokeDashoffset= circlecircumferernce-(circlecircumferernce * maxPerc)/100;
                circlref.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        })
    });

  return (
    <View>
      <Svg width={radius*2} height={radius*2} viewBox='0 0 100 100'>
          <G /*rotation='-90' origin={'${halfcrcle}, ${halfcrcle}'}*/ >
              <Circle
              cx='50%'
              cy='50%'
              stroke={'lime'}
              strokeWidth={strokewidth+2}
              r={radius}
              strokeOpacity={1}
              fill= 'transparent'
              />
              <Animatedcircle
              ref={circlref}
              cx='50%'
              cy='50%'
              stroke={color}
              strokeWidth={strokewidth}
              r={radius}
              strokeOpacity={1}
              fill= 'transparent'
              strokeDasharray={circlecircumferernce}
              strokeDashoffset={circlecircumferernce}
              strokeLinecap='round'
              />
          </G>
      </Svg>
    </View>
  );
}