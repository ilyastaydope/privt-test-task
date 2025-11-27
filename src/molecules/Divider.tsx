import React from 'react';
import { View, Text } from 'react-native';
import { dividerStyles } from '../styles/molecules/Divider.styles';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = React.memo(({ text = 'OR' }) => (
  <View style={dividerStyles.container}>
    <View style={dividerStyles.line} />
    <Text style={dividerStyles.text}>{text}</Text>
    <View style={dividerStyles.line} />
  </View>
));

Divider.displayName = 'Divider';


