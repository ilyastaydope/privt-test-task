import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { inputStyles } from '../styles/atoms/Input.styles';

interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  hint,
  error,
  style,
  ...props
}, ref) => {
  return (
    <View style={inputStyles.container}>
      {label ? <Text style={inputStyles.label}>{label}</Text> : null}
      {hint ? <Text style={inputStyles.hint}>{hint}</Text> : null}
      <TextInput
        ref={ref}
        style={[inputStyles.input, error ? inputStyles.inputError : null, style]}
        placeholderTextColor="#9ca3af"
        underlineColorAndroid="transparent"
        {...props}
      />
      {error ? <Text style={inputStyles.error}>{error}</Text> : null}
    </View>
  );
});

Input.displayName = 'Input';
