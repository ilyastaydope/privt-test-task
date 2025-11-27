import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { linkButtonStyles } from '../styles/molecules/LinkButton.styles';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = React.memo(({ title, onPress, disabled = false }) => (
  <TouchableOpacity
    style={[linkButtonStyles.button, disabled && linkButtonStyles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={linkButtonStyles.text}>{title}</Text>
  </TouchableOpacity>
));

LinkButton.displayName = 'LinkButton';


