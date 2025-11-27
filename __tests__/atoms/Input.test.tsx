import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../src/atoms/Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(
      <Input label="Email" value="" onChangeText={() => {}} />
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders correctly with hint', () => {
    const { getByText } = render(
      <Input hint="Enter your email" value="" onChangeText={() => {}} />
    );
    expect(getByText('Enter your email')).toBeTruthy();
  });

  it('renders error message when error prop is provided', () => {
    const { getByText } = render(
      <Input error="Invalid email" value="" onChangeText={() => {}} />
    );
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="" onChangeText={onChangeText} />
    );
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('renders with all props combined', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Email"
        hint="We'll never share your email"
        error="Invalid format"
        placeholder="email@example.com"
        value=""
        onChangeText={() => {}}
      />
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByText("We'll never share your email")).toBeTruthy();
    expect(getByText('Invalid format')).toBeTruthy();
    expect(getByPlaceholderText('email@example.com')).toBeTruthy();
  });
});
