import React from 'react';
import { Text } from 'react-native';
import { passkeyHintStyles } from '../styles/molecules/PasskeyHint.styles';

interface PasskeyHintProps {
  text?: string;
}

export const PasskeyHint: React.FC<PasskeyHintProps> = React.memo(({
  text = 'Passkeys require a development build on a real device.\nUse email+OTP for now, or build with: npx expo run:ios'
}) => (
  <Text style={passkeyHintStyles.hint}>{text}</Text>
));

PasskeyHint.displayName = 'PasskeyHint';


