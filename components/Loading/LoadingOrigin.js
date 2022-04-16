import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const LoadingOrigin = (props) => (
  <ActivityIndicator 
  style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
  animating={true} color={props.color} size={props.size} />
);

export default LoadingOrigin;