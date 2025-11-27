import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { buttonStyles } from '../styles/atoms/Button.styles';
import { COLORS } from '../utils/constants';

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) => {
  const buttonStyle = [
    buttonStyles.button,
    variant === 'primary' ? buttonStyles.primary : buttonStyles.secondary,
    (loading || disabled) && buttonStyles.disabled,
    style,
  ].filter(Boolean);

  const textStyle = [
    buttonStyles.text,
    variant === 'primary' ? buttonStyles.primaryText : buttonStyles.secondaryText,
  ].filter(Boolean);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? COLORS.secondary : COLORS.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';


