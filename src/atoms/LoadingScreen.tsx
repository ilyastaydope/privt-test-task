import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { loadingScreenStyles } from '../styles/atoms/LoadingScreen.styles';
import { COLORS } from '../utils/constants';

export const LoadingScreen: React.FC = React.memo(() => (
  <View style={loadingScreenStyles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    <Text style={loadingScreenStyles.text}>Loading...</Text>
  </View>
));

LoadingScreen.displayName = 'LoadingScreen';


